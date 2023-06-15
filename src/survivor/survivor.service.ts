import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { UpdateSurvivorDto } from './dto/update-survivor.dto';
import { PaginatedSurvivor } from './entities/paginated-survivor';
import {
  createSurvivor,
  deleteSurvivalItem,
  findManySurvivors,
  findSurvivorByEmail,
  findSurvivorById,
  infectedSurvivorsReport,
  itemsPerSurvivorsReport,
  lockSurvivorItems,
  tradeSurvivorItems,
  updateSurvivor,
  upsertSurvivorItems,
} from './survivor.generated-queries';
import { PaginatedSurvivorDto } from './dto/list-survivors.dto';
import { DbClient } from '../shared/db.service';
import { TradeSuvivorItemDto } from './dto/trade-suvivor-item.dto';
import { PoolClient } from 'pg';
import { UpdateSuvivorItemDto } from './dto/update-suvivor-item.dto';
import { CryptoService } from '../auth/crypto.service';
import { JwtService } from '../auth/jwt.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class SurvivorService {
  constructor(private dbClient: DbClient, private cryptoService: CryptoService, private jwtService: JwtService) {}

  async create(input: CreateSurvivorDto) {
    const [sameEmailUser] = await findSurvivorByEmail.run({ email: input.email }, this.dbClient);

    if (sameEmailUser) {
      throw new ConflictException('Email already in use');
    }

    const passwordSalt = this.cryptoService.createSalt();
    const hashedPassword = this.cryptoService.hashSaltPassword(input.password, passwordSalt);

    const [survivor] = await createSurvivor.run(
      {
        ...input,
        hashedPassword,
        passwordSalt,
        lastLocation: input.lastLocation && `(${input.lastLocation.lat}, ${input.lastLocation.lng})`,
      },
      this.dbClient,
    );
    return { acessToken: this.jwtService.sign({ survivorId: survivor.id }) };
  }

  async login(input: LoginDto) {
    const [survivor] = await findSurvivorByEmail.run({ email: input.email }, this.dbClient);

    if (
      !survivor ||
      this.cryptoService.hashSaltPassword(input.password, survivor.passwordSalt) !== survivor.hashedPassword
    ) {
      throw new BadRequestException('Invalid credentials');
    }

    return { acessToken: this.jwtService.sign({ survivorId: survivor.id }) };
  }

  async findOneById(survivorId: number) {
    const [survivor] = await findSurvivorById.run({ survivorId }, this.dbClient);
    if (!survivor) {
      throw new Error('Survivor not found');
    }
    return survivor;
  }

  async infectedSurvivorsReport() {
    return infectedSurvivorsReport.run(undefined, this.dbClient);
  }

  async itemsPerSurvivorsReport() {
    return itemsPerSurvivorsReport.run(undefined, this.dbClient);
  }

  async updateItems(toSurvivorId: number, input: UpdateSuvivorItemDto) {
    await this.dbClient.transaction((client) => this._updateItems(client, toSurvivorId, input));
  }

  private async _updateItems(transaction: PoolClient, survivorId: number, input: UpdateSuvivorItemDto) {
    const [current] = await lockSurvivorItems.run({ itemId: input.itemId, survivorIds: [survivorId] }, transaction);

    if (current.quantity === -input.quantity) {
      return deleteSurvivalItem.run({ itemId: input.itemId, survivorId: input.quantity }, transaction);
    }

    return upsertSurvivorItems.run(
      {
        survivorId,
        itemId: input.itemId,
        quantity: input.quantity,
      },
      transaction,
    );
  }

  async trade(toSurvivorId: number, input: TradeSuvivorItemDto) {
    await this.dbClient.transaction((client) => this._trade(client, toSurvivorId, input));
  }

  private async _trade(transaction: PoolClient, toSurvivorId: number, input: TradeSuvivorItemDto) {
    const items = await lockSurvivorItems.run(
      { itemId: input.itemId, survivorIds: [toSurvivorId, input.fromSurvivorId] },
      transaction,
    );

    const source = items.find((it) => it.survivorId === input.fromSurvivorId);
    if (!source || source.quantity < input.quantity) {
      throw new BadRequestException(`Not enough items, current quantity: ${source?.quantity ?? 0}`);
    }

    if (source.quantity === input.quantity) {
      await deleteSurvivalItem.run({ itemId: input.itemId, survivorId: input.fromSurvivorId }, transaction);
    } else {
      await upsertSurvivorItems.run(
        {
          survivorId: input.fromSurvivorId,
          itemId: input.itemId,
          quantity: -input.quantity,
        },
        transaction,
      );
    }

    await upsertSurvivorItems.run(
      {
        survivorId: toSurvivorId,
        itemId: input.itemId,
        quantity: input.quantity,
      },
      transaction,
    );

    await tradeSurvivorItems.run(
      { itemId: input.itemId, fromSurvivorId: input.fromSurvivorId, quantity: input.quantity, toSurvivorId },
      transaction,
    );
  }

  async list({ cursorId, limit }: PaginatedSurvivorDto): Promise<PaginatedSurvivor> {
    const survivors = await findManySurvivors.run({ cursorId, limit }, this.dbClient);
    return {
      total: survivors[0]?.total ?? 0,
      survivors: survivors.map((it) => ({
        ...it,
        lastLocation: it.lastLocation && { lat: it.lastLocation.x, lng: it.lastLocation.y },
      })),
    };
  }

  async update(survivorId: number, input: UpdateSurvivorDto) {
    const somethingToUpdate = Object.values(input).some((value) => value);

    if (!somethingToUpdate) {
      return;
    }

    await updateSurvivor.run(
      {
        ...input,
        survivorId,
        lastLocation: input.lastLocation && `(${input.lastLocation.lat}, ${input.lastLocation.lng})`,
      },
      this.dbClient,
    );
  }
}

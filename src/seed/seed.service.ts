import { Injectable } from '@nestjs/common';
import { DbClient } from '../shared/db.service';
import {
  createSurvivors,
  giveItems,
  truncateAllTables,
  resetItemsSeq,
  resetSurvivorsSeq,
  IGiveItemsParams,
} from './seed.generated-queries';
import { faker } from '@faker-js/faker';
import { CryptoService } from '../auth/crypto.service';
import { Gender } from '../survivor/entities/gender.enum';
import { createItem } from '../suvivor-item/survivor-item.generated-queries';
import type { Writeable } from 'zod';

@Injectable()
export class SeedService {
  constructor(private dbClient: DbClient, private cryptoService: CryptoService) {}

  async reset() {
    await truncateAllTables.run(undefined, this.dbClient);
    //would be good to reset all sequences in one query
    await resetItemsSeq.run(undefined, this.dbClient);
    await resetSurvivorsSeq.run(undefined, this.dbClient);
  }

  private readonly survivorsCount = 200;

  async seed() {
    await this.reset();
    const passwordSalt = this.cryptoService.createSalt();
    const hashedPassword = this.cryptoService.hashSaltPassword('A1234b$d1Sx', passwordSalt);

    await createSurvivors.run(
      {
        newSurvivors: Array.from({ length: this.survivorsCount })
          .fill(0)
          .map(() => ({
            birthday: faker.date.birthdate(),
            email: faker.internet.email(),
            infected: faker.datatype.boolean(),
            gender: faker.helpers.enumValue(Gender),
            lastLocation: `(${faker.location.latitude()}, ${faker.location.longitude()})`,
            name: faker.person.fullName(),
            hashedPassword,
            passwordSalt,
          })),
      },
      this.dbClient,
    );

    await Promise.all([
      createItem.run({ description: 'Description 1', name: 'Water' }, this.dbClient),
      createItem.run({ description: 'Description 2', name: 'Food' }, this.dbClient),
      createItem.run({ description: 'Description 3', name: 'Medication' }, this.dbClient),
      createItem.run({ description: 'Description 4', name: 'C-Virus Vaccine' }, this.dbClient),
    ]);

    const itemSurvivorPair: Writeable<IGiveItemsParams['itemSurvivorPair']> = [];

    for (let survivorId = 1; survivorId < this.survivorsCount; survivorId++) {
      for (let itemId = 1; itemId < 4; itemId++) {
        if (faker.datatype.boolean(0.4)) {
          continue;
        }
        itemSurvivorPair.push({
          survivorId,
          itemId,
          quantity: faker.number.int({ min: 1, max: 20 }),
        });
      }
    }

    await giveItems.run({ itemSurvivorPair }, this.dbClient);
  }
}

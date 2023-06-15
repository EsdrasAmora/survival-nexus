import { Injectable } from '@nestjs/common';
import { DbClient } from '../shared/db.service';
import { createSurvivors, giveItems, resetAllSequences, truncateAllTables } from './seed.generated-queries';
import { faker } from '@faker-js/faker';
import { JwtService } from '../auth/jwt.service';
import { CryptoService } from '../auth/crypto.service';
import { Gender } from '../survivor/entities/gender.enum';
import { createItem } from '../suvivor-item/survivor-item.generated-queries';

@Injectable()
export class SeedService {
  constructor(private dbClient: DbClient, private jwtService: JwtService, private cryptoService: CryptoService) {}

  async reset() {
    await truncateAllTables.run(undefined, this.dbClient);
    await resetAllSequences.run(undefined as never, this.dbClient);
  }

  async seed() {
    await this.reset();
    const passwordSalt = this.cryptoService.createSalt();
    const hashedPassword = this.cryptoService.hashSaltPassword('A1234b$d1Sx', passwordSalt);

    await createSurvivors.run(
      {
        newSurvivors: Array.from({ length: 200 })
          .fill(0)
          .map(() => ({
            birthday: faker.date.birthdate(),
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

    await giveItems.run(
      {
        itemSurvivorPair: Array.from({ length: 200 })
          .fill(0)
          .map(() => ({
            itemId: faker.number.int({ min: 1, max: 4 }),
            survivorId: faker.number.int({ min: 1, max: 200 }),
            quantity: faker.number.int({ min: 1, max: 4 }),
          })),
      },
      this.dbClient,
    );
  }
}

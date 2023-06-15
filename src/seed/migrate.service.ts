import { Injectable } from '@nestjs/common';
import { DbClient } from '../shared/db.service';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MigrationService {
  constructor(private dbClient: DbClient) {}

  async migrate() {
    const sqlMigration = readFileSync(join(__dirname, 'migration-setup.sql')).toString();
    await this.dbClient.query(sqlMigration);
  }
}

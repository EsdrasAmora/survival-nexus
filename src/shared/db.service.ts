import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { IDatabaseConnection } from '@pgtyped/runtime/lib/tag';
import { Pool, PoolClient } from 'pg';
import { AppConfigService } from './env.service';

@Injectable()
export class DbClient implements IDatabaseConnection, OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private config: AppConfigService) {}

  async onModuleInit() {
    this.pool = new Pool({
      connectionString: this.config.get('DATABASE_URL'),
      min: 5,
      max: 20,
      idleTimeoutMillis: 30000,
      query_timeout: 10000,
    });

    //TODO: remove this logging
    const oldPoolQuery = this.pool.query;
    this.pool.query = (...args: any) => {
      console.log('QUERY:', args);
      return oldPoolQuery.apply(this.pool, args);
    };

    try {
      console.log('Test connection:', (await this.pool.query('SELECT NOW()')).rows[0].now);
    } catch (err) {
      console.error(err);
      throw new Error('Error connecting to database');
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  query(query: string, params?: any[]) {
    return this.pool.query(query, params);
  }

  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    let res: T;

    try {
      await client.query('BEGIN');
      res = await callback(client);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }

    return res;
  }
}

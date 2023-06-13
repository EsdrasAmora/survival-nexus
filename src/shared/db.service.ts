import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { IDatabaseConnection } from '@pgtyped/runtime/lib/tag';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class DbClient implements IDatabaseConnection, OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  async onModuleInit() {
    // types.setTypeParser(types.builtins.POLYGON, (val: string) => val);
    //TODO: get env variables from config

    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      min: 5,
      max: 20,
      idleTimeoutMillis: 30000,
      query_timeout: 10000,
    });

    const oldPoolQuery = this.pool.query;
    this.pool.query = (...args: any) => {
      console.log('QUERY:', args);
      return oldPoolQuery.apply(this.pool, args);
    };

    // this.pool.on('connect', (client) => {
    //   client.on('drain', (msg) => {
    //     console.log('aqui');
    //     console.log('Query:', msg);
    //   });
    // });

    console.log('Test connection:', (await this.pool.query('SELECT NOW()')).rows[0].now);
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

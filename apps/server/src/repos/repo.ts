import type { Knex } from 'knex';
import type { DBContext } from '../types';

export abstract class Repo {
  protected readonly tablename: string;
  constructor(tablename: string) {
    this.tablename = tablename;
  }

  load(q: any, ctx: DBContext) {
    return ctx(this.tablename).where(q);
  }

  create(payload: any, ctx: DBContext) {
    return ctx(this.tablename).insert(payload);
  }

  findById(id: string, ctx: DBContext) {
    return ctx(this.tablename).where({ id });
  }
}

import type { Knex } from 'knex';

declare type DBContext = Knex | Knex.Transaction;

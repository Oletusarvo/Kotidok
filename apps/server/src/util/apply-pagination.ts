import { Knex } from 'knex';

export function applyPagination(query: Knex.QueryBuilder, page?: string, limit?: string) {
  if (typeof page !== 'string' || typeof limit !== 'string') {
    return;
  }
  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);
  query.offset(pageInt * limitInt).limit(limitInt);
}

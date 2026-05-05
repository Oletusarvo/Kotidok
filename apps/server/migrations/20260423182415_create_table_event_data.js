/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'event_data';

exports.up = function (knex) {
  return knex.schema.createTable(tablename, tbl => {
    tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    tbl.text('title').notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('closed_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tablename);
};

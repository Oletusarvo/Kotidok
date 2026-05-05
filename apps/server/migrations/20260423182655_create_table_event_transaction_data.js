/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'event_transaction_data';

exports.up = function (knex) {
  return knex.schema.createTable(tablename, tbl => {
    tbl
      .uuid('event_id')
      .references('id')
      .inTable('event_data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .uuid('component_id')
      .notNullable()
      .references('id')
      .inTable('component_data')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('transaction_type_id')
      .notNullable()
      .references('id')
      .inTable('event_transaction_type')
      .onUpdate('CASCADE');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('effective_at');
    tbl.primary(['event_id', 'component_id', 'transaction_type_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tablename);
};

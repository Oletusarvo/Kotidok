/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tablename = 'user_data';

exports.up = function (knex) {
  return knex.schema.createTable(tablename, tbl => {
    tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    tbl
      .integer('user_status_id')
      .notNullable()
      .references('id')
      .inTable('user_status_type')
      .onUpdate('CASCADE');
    tbl.string('email').notNullable().unique();
    tbl.string('password').notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('terms_accepted_at').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tablename);
};

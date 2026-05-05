/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'component_data';

exports.up = function (knex) {
  return knex.schema.createTable(tablename, tbl => {
    tbl.uuid('id').primary().defaultTo(knex.fn.uuid());

    tbl
      .uuid('parent_id')
      .references('id')
      .inTable(tablename)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('component_type_id')
      .notNullable()
      .references('id')
      .inTable('component_type')
      .onUpdate('CASCADE');
    tbl.text('name').notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.jsonb('metadata');
    tbl.unique(['parent_id', 'name']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tablename);
};

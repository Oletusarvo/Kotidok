const tablename = 'allowed_component_child_types';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tablename, tbl => {
    tbl
      .integer('parent_component_type_id')
      .references('id')
      .inTable('component_type')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('child_component_type_id')
      .references('id')
      .inTable('component_type')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.primary(['parent_component_type_id', 'child_component_type_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tablename);
};

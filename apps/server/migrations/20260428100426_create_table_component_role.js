const tablename = 'component_user_role';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tablename, tbl => {
    tbl
      .uuid('component_id')
      .references('id')
      .inTable('component_data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .uuid('user_id')
      .references('id')
      .inTable('user_data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('component_role_id')
      .notNullable()
      .references('id')
      .inTable('component_role_type')
      .onUpdate('CASCADE');
    tbl.primary(['component_id', 'user_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tablename);
};

const loadSql = require('../migration-utils/load-sql');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    await knex.raw(await loadSql('trigger-enforce-component-child-types.sql'));
    resolve();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw('DROP TRIGGER IF EXISTS enforce_component_child_types ON component_data');
};

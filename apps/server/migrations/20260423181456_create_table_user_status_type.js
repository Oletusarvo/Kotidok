/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const createLookupTable = require('../migration-utils/create-lookup-table');

const tablename = 'user_status_type';

exports.up = function (knex) {
  return knex.schema.createTable(tablename, createLookupTable);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tablename);
};

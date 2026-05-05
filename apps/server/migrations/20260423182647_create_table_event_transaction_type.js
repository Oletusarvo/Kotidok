/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const createLookupTable = require('../migration-utils/create-lookup-table');

const tablename = 'event_transaction_type';

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

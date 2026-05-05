const viewName = 'component';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createView(viewName, view => {
    view.as(
      knex
        .from('component_data as cd')
        .join('component_type as ct', 'ct.id', 'cd.component_type_id')
        .select(
          'cd.id',
          'cd.parent_id',
          'cd.name',
          'cd.created_at',
          'cd.metadata',
          'ct.label as component_type',
          knex.raw(`
            (
              WITH RECURSIVE child_tree AS (
                SELECT * FROM component_data WHERE parent_id = cd.id 
                UNION ALL
                SELECT c.* FROM component_data c 
                JOIN child_tree ct ON ct.id = c.parent_id
              )
              SELECT COUNT(*) FROM child_tree
            ) AS child_count
            `),
          knex.raw(
            `
                (
                  WITH RECURSIVE child_tree AS (
                    SELECT * FROM component_data WHERE id = cd.id 
                    UNION ALL 
                    SELECT c.* FROM component_data c
                    JOIN child_tree ct ON ct.id = c.parent_id
                  )

                  SELECT COUNT(DISTINCT etd.event_id) 
                  FROM event_transaction_data etd 
                  WHERE component_id IN (
                    SELECT id FROM child_tree
                  )
                ) AS event_count
              `,
          ),
          knex.raw(
            `NOT EXISTS (
              SELECT * 
              FROM event_transaction_data 
              WHERE component_id = cd.id 
              AND transaction_type_id = (
                SELECT id FROM event_transaction_type WHERE label = 'removal'
              )) AS is_active`,
          ),
        ),
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropViewIfExists(viewName);
};

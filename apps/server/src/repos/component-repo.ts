import type { DBContext } from '../types';
import { Repo } from './repo';
import z from 'zod';
import { componentSchema, componentRoleSchema } from '@kotidok/schemas';
import { db } from '../db-config';
import { tablenames, views } from '../tablenames';

export class ComponentRepo extends Repo {
  constructor() {
    super(views.component);
  }

  load(q: any, ctx: DBContext) {
    return super
      .load(q, ctx)
      .select('ct.label as component_type', 'component.id', 'component.metadata');
  }

  /**Creates a new component. */
  create(payload: z.infer<typeof componentSchema>, ctx: DBContext) {
    const { name, parent_id, type, metadata } = payload;

    return ctx(tablenames.component_data).insert({
      name,
      parent_id,
      component_type_id: db.select('id').from('component_type').where({ label: type }),
      metadata,
    });
  }

  /**Creates a new role for a component. */
  createRole(payload: z.infer<typeof componentRoleSchema>, ctx: DBContext) {
    const { user_id, component_id, role } = payload;
    return ctx(tablenames.role_data).insert({
      user_id,
      component_id,
      component_role_id: db.select('id').from(tablenames.role_type).where({ label: role }).limit(1),
    });
  }

  /**Finds a component by id. */
  findById(id: string, ctx: DBContext) {
    return ctx
      .withRecursive('child_tree', cte => {
        cte
          .select('*', db.raw('0 AS depth'))
          .from(this.tablename)
          .where({ parent_id: id })
          .unionAll(cte => {
            cte
              .select('c.*', db.raw('depth + 1'))
              .from({ c: this.tablename })
              .join('child_tree', 'child_tree.id', 'c.parent_id');
          });
      })
      .where({ 'c.id': id })
      .select('c.*', db.raw('(SELECT CAST(COUNT(*) AS INT) AS child_count FROM child_tree)'))
      .from({ c: this.tablename })
      .first();
  }

  /**Finds a component by name. */
  findByName(name: string, ctx: DBContext) {
    return ctx({ c: this.tablename }).where({ name });
  }

  /**Returns all roles associated with a component by its id. */
  findRolesById(componentId: string, ctx: DBContext) {
    return ctx({ role: tablenames.role_data })
      .join(
        db.raw('?? AS role_type ON role_type.id = role.component_role_id', [tablenames.role_type]),
      )
      .where({ component_id: componentId })
      .select(
        db.raw(
          `
          (SELECT JSON_BUILD_OBJECT('id', u.id, 'email', u.email) AS user FROM ?? AS u WHERE id = role.user_id LIMIT 1)
          `,
          [tablenames.user_data],
        ),
        'role.component_id',
        'role_type.label as role_type',
      );
  }

  /**Returns all children of a component by id. */
  findChildrenById(parentId: string, ctx: DBContext) {
    const q = ctx
      .withRecursive('child_tree', cet => {
        cet
          .select('*')
          .from(this.tablename)
          .where({ parent_id: parentId })
          .unionAll(u => {
            u.select('c.*')
              .from({ c: this.tablename })
              .join('child_tree', 'child_tree.id', 'c.parent_id');
          });
      })
      .select('*')
      .from('child_tree');

    return q;
  }

  /**Returns all events including their transactions associated with a component and its children.*/
  findEventsById(componentId: string, ctx: DBContext) {
    return ctx
      .withRecursive('component_tree', cte => {
        cte
          .select('*')
          .from({ c: tablenames.component_data })
          .where({ id: componentId })
          .unionAll(cte => {
            cte
              .select('c.*')
              .from({ c: tablenames.component_data })
              .join('component_tree', 'component_tree.id', 'c.parent_id');
          });
      })
      .select(
        'ed.*',
        db.raw(
          `(
            SELECT JSON_AGG(JSON_BUILD_OBJECT(
              'transaction_type', ett.label,
              'component', JSON_BUILD_OBJECT(
                'id', cmp.id,
                'parent_id', cmp.parent_id,
                'name', cmp.name,
                'component_type', cmp.component_type,
                'is_active', cmp.is_active
              )
            )) AS transactions 
           FROM event_transaction_data trx 
           JOIN event_transaction_type ett ON ett.id = trx.transaction_type_id
           JOIN component cmp ON cmp.id = trx.component_id
           WHERE trx.event_id = ed.id)`,
        ),
      )
      .from('component_tree')
      .join(
        db.raw('?? AS etd ON etd.component_id = component_tree.id', [
          tablenames.event_transaction_data,
        ]),
      )
      .join(db.raw('?? AS ed ON ed.id = etd.event_id', [tablenames.event_data]))
      .groupBy('ed.id');
  }

  /**Returns all transactions performed on a component by id. */
  getTransactionsById(componentId: string, ctx: DBContext) {
    return ctx
      .withRecursive('child_tree', cte => {
        cte
          .select('*')
          .from(views.component)
          .where({ id: componentId })
          .unionAll(u => {
            u.select('c.*')
              .from({ c: views.component })
              .join('child_tree AS ct', 'ct.id', 'c.parent_id');
          });
      })
      .from({ t: tablenames.event_transaction_data })
      .join('child_tree AS ct', 'ct.id', 't.component_id')
      .join(db.raw('?? AS tt ON tt.id = t.transaction_type_id', [tablenames.transaction_type]))
      .select(
        'tt.label as transaction_type',
        't.created_at',
        't.effective_at',
        db.raw(
          `(SELECT JSON_BUILD_OBJECT('id', e.id, 'title', e.title) FROM ?? e WHERE e.id = t.event_id) AS event`,
          [tablenames.event_data],
        ),
        db.raw(
          `JSON_BUILD_OBJECT('id', ct.id, 'name', ct.name, 'type', ct.component_type) AS "component"`,
        ),
      );
  }
}

export const componentRepo = new ComponentRepo();

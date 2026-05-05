import type { Knex } from 'knex';
import { HeatingDistributorRepo } from './heating-distributor-repo';
import type { DBContext } from '../types';
import { RadiatorComponent } from '@kotidok/types';

export class RadiatorComponentRepo extends HeatingDistributorRepo {
  load(q: any, ctx: DBContext) {
    return super
      .load(q, ctx)
      .leftJoin('radiator_component as rc', 'rc.component_id', 'component.id');
  }

  /**Transforms the result of a given knex-query to a RadiatorComponent-instance. */
  static async asInstance(query: Knex.QueryBuilder) {
    const data = await query.first();
    return new RadiatorComponent({
      id: data.id,
    });
  }
}

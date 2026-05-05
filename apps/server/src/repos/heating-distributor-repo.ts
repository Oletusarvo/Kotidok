import type { Knex } from 'knex';
import type { DBContext } from '../types';
import { ComponentRepo } from './component-repo';

export abstract class HeatingDistributorRepo extends ComponentRepo {
  load(q: any, ctx: DBContext) {
    return super
      .load(q, ctx)
      .leftJoin('heating_distributor_type as hdt', 'hdt.id', 'hdc.heating_distributor_type_id')
      .leftJoin('heating_distributor_component as hdc', 'hdc.component_id', 'component.id')
      .select('hdt.label as heating_distributor_type');
  }
}

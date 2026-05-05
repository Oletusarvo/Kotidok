const createTableName = <ST extends string, TT extends string>(
  schema: ST,
  table: TT,
): `${ST}.${TT}` => {
  return `${schema}.${table}`;
};

export const tablenames = {
  component_data: createTableName('public', 'component_data'),
  component_type: createTableName('public', 'component_type'),
  event_data: createTableName('public', 'event_data'),
  event_transaction_data: createTableName('public', 'event_transaction_data'),
  role_data: createTableName('public', 'component_user_role'),
  role_type: createTableName('public', 'component_role_type'),
  user_data: createTableName('public', 'user_data'),
  user_status: createTableName('public', 'user_status_type'),
};

export const views = {
  component: createTableName('public', 'component'),
  user: createTableName('public', 'user'),
};

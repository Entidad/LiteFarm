export const up = async function (knex) {
  await knex.schema.alterTable('irrigation_task', (table) => {
    table.boolean('default_location_flow_rate').defaultTo(false).notNullable();
    table.boolean('default_location_application_depth').defaultTo(false).notNullable();
    table.boolean('default_irrigation_task_type_location').defaultTo(false).notNullable();
    table.boolean('default_irrigation_task_type_measurement').defaultTo(false).notNullable();
  });
  const irrigation_task_type = await knex('irrigation_type').select(
    'irrigation_type_id',
    'irrigation_type_name',
  );
  await knex.schema.alterTable('irrigation_type', (table) => {
    table.string('irrigation_type_translation_key');
  });

  for (const row of irrigation_task_type) {
    const irrigation_type_translation_key = row.irrigation_type_name
      .toUpperCase()
      .split(' ')
      .join('_');
    await knex('irrigation_type')
      .update({ irrigation_type_translation_key })
      .where({ irrigation_type_id: row.irrigation_type_id });
  }

  await knex.schema.alterTable('location_defaults', (table) => {
    table
      .integer('irrigation_type_id')
      .references('irrigation_type_id')
      .inTable('irrigation_type')
      .nullable();
    table.dropColumn('irrigation_task_type');
  });
};

export const down = async function (knex) {
  await knex.schema.alterTable('irrigation_task', (table) => {
    table.dropColumn('default_location_flow_rate');
    table.dropColumn('default_location_application_depth');
    table.dropColumn('default_irrigation_task_type_location');
    table.dropColumn('default_irrigation_task_type_measurement');
  });

  await knex.schema.alterTable('irrigation_type', (table) => {
    table.dropColumn('irrigation_type_translation_key');
  });

  await knex.schema.alterTable('location_defaults', (table) => {
    table.string('irrigation_task_type');
  });

  const location_defaults = await knex('location_defaults').select('irrigation_type_id');
  for (const row of location_defaults) {
    const irrigation_type = await knex('irrigation_type')
      .select('*')
      .where({ irrigation_type_id: row.irrigation_type_id });
    await knex('location_defaults')
      .update({ irrigation_task_type: irrigation_type.irrigation_type_name })
      .where({ irrigation_type_id: row.irrigation_type_id });
  }

  await knex.schema.alterTable('location_defaults', (table) => {
    table.dropColumn('irrigation_type_id');
  });
};

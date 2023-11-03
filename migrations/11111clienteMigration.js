exports.up = function(knex) {
    return knex.schema.createTable('cliente_frecuente', function(table) {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.integer('puntos').defaultTo(0);
      // Agrega otros campos relacionados con el cliente frecuente si es necesario
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('cliente_frecuente');
  };
  
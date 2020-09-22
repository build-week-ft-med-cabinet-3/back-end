
exports.up = function(knex) {

    return knex.schema
        .createTable('ailments', tbl => {
            tbl.increments()
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.boolean('cramps').defaultTo(false)
            tbl.boolean('depression').defaultTo(false)
            tbl.boolean('eye-pressure').defaultTo(false)
            tbl.boolean('fatigue').defaultTo(false)
            tbl.boolean('headache').defaultTo(false)
            tbl.boolean('headaches').defaultTo(false)
            tbl.boolean('inflammation').defaultTo(false)
            tbl.boolean('insomnia').defaultTo(false)
            tbl.boolean('lack-of-appetite').defaultTo(false)
            tbl.boolean('muscle-spasms').defaultTo(false)
            tbl.boolean('nausea').defaultTo(false)
            tbl.boolean('pain').defaultTo(false)
            tbl.boolean('seizures').defaultTo(false)
            tbl.boolean('spasticity').defaultTo(false)
            tbl.boolean('stress').defaultTo(false)
        })
  
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('ailments')
  
};

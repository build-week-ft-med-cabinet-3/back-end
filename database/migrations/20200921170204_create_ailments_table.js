
exports.up = function(knex) {

    return knex.schema
        .createTable('ailments', tbl => {
            tbl.increments()
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('users')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            tbl.boolean('cramps')
            tbl.boolean('depression')
            tbl.boolean('eye-pressure')
            tbl.boolean('fatigue')
            tbl.boolean('headache')
            tbl.boolean('headaches')
            tbl.boolean('inflammation')
            tbl.boolean('insomnia')
            tbl.boolean('lack-of-appetite')
            tbl.boolean('muscle-spasms')
            tbl.boolean('nausea')
            tbl.boolean('pain')
            tbl.boolean('seizures')
            tbl.boolean('spasticity')
            tbl.boolean('stress')
        })
  
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('ailments')
  
};

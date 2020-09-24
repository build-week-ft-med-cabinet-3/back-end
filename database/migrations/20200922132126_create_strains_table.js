
exports.up = function(knex) {

    return knex.schema
        .createTable('saved_strains', tbl => {

            tbl.increments()
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.string('Name', 50000)
            tbl.string('Rating')
            tbl.text('Description')
            tbl.string('Type', 50000)
            tbl.string('Flavors', 50000)
            tbl.string('Positive_Effects', 50000)
            tbl.string('Negative_Effects', 50000)
            tbl.string('Effects', 50000)
            tbl.string('Ailments', 50000)

        })
  
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('saved_strains')
  
};

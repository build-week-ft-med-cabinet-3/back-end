
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
            tbl.string('Name')
            tbl.string('Rating')
            tbl.string('Description')
            tbl.string('Type')
            tbl.string('Flavors')
            tbl.string('Positive_Effects')
            tbl.string('Negative_Effects')
            tbl.string('Effects')
            tbl.string('Ailments')

        })
  
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('saved_strains')
  
};

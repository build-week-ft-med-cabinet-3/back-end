
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
            tbl.string('name')
            tbl.string('description')
            tbl.string('type')
            tbl.string('flavors')
            tbl.string('postive_effects')
            tbl.string('negative_effects')
            tbl.string('ailment')
            tbl.string('search')

        })
  
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('saved_strains')
  
};

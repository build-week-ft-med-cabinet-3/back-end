
exports.seed = function(knex) {

  return knex('users').truncate()
    .then(function () {

      return knex('users').insert([
        {id: 1, email: 'email@email.com', password: 'pass'},
        {id: 2, email: 'me@me.com', password: 'pass'},
        {id: 3, email: 'john@doe.com', password: 'pass'}
      ]);
    });
};

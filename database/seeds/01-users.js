
exports.seed = function(knex) {

  return knex('users').truncate()
    .then(function () {

      return knex('users').insert([
        {id: 1, username: 'testuser1', password: 'pass'},
        {id: 2, username: 'testuser2', password: 'pass'},
        {id: 3, username: 'testuser3', password: 'pass'}
      ]);
    });
};


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ailments').del()
    .then(function () {
      // Inserts seed entries
      return knex('ailments').insert([
        { id: 1, 
          user_id: 1,  
          'cramps': true,
          'depression': false,
          'eye-pressure': false,
          'fatigue': false,
          'headache': false,
          'headaches': false,
          'inflammation': false,
          'insomnia': false,
          'lack-of-appetite': false,
          'muscle-spasms': false,
          'nausea': false,
          'pain': false,
          'seizures': false,
          'spasticity': false,
          'stress': false
        }
      ]);
    });
};

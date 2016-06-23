
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('account').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('account').insert({username: 'Pawel', password: 'password1'}),
        knex('account').insert({username: 'Bennett', password: 'password2'}),
        knex('account').insert({username: 'Laney', password: 'password3'})
      ]);
    });
};

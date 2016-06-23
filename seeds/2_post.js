
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      return knex('account').select('id');
    })
    .then(function(accounts) {
      return Promise.all([
        // Inserts seed entries
        knex('post').insert({title: 'Poland', image: 'http://www.flightnetwork.com/blog/wp-content/uploads/2015/03/istock_000011247102_large.jpg', content: 'The most beautiful country in the world', account_id: accounts[0].id }),
        knex('post').insert({title: 'Spelling', image: 'http://images.clipartpanda.com/spelling-clipart-spelling-bee-abc-chalkboard-4758374.jpg', content: 'My spelling troubles created this beautiful app.', account_id: accounts[1].id }),
        knex('post').insert({title: 'Zaney', image: 'http://www.untamedscience.com/science/wp-content/uploads/2013/10/Frogs.jpg', content: 'I like to collect frogs', account_id: accounts[2].id })
      ]);
    });
};

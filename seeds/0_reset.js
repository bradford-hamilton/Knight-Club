
exports.seed = function(knex, Promise) {
      return knex('post').del()
    .then(function() {
      return knex('account').del();
    });
};

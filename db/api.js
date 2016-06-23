var knex = require('./knex');

module.exports = {

  findUserByUsername: function(username) {
    return knex('account').select().where({ username: username }).first();
  },

  findUserById: function(id) {
    return knex('account').select().where({ id: id }).first();
  },

  addUser: function(body) {
    return knex('account').insert(body, 'id');
  }

};

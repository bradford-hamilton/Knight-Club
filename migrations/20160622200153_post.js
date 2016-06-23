exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', function(table) {
    table.increments();
    table.string('title');
    table.string('image');
    table.text('content');
    table.integer('account_id').references('account.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post');
};

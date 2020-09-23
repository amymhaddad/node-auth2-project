exports.up = function(knex) {
	return knex.schema.createTable('users', function(table) {
		table.increments('id'),
			table.string('username', 100).notNullable(),
			table.string('password', 100).notNullable(),
			table.string('department', 200).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};

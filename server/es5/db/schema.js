'use strict';

var _common = require('../common');

_common.knex.schema.createTableIfNotExists('users', function (table) {
  table.increments('ID').primary();
  table.string('username');
  table.string('firstname');
  table.string('lastname');
  table.string('email');
  table.string('password');
}).then(function (result) {
  console.log('User schema created.');
}); // the database configuration is inside of server/common.js
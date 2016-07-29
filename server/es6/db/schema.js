// the database configuration is inside of server/common.js

import { knex } from "../common";

knex.schema.createTableIfNotExists('users', table => {
  table.increments('ID').primary();
  table.string('username');
  table.string('firstname');
  table.string('lastname');
  table.string('email');
  table.string('password');
}).then((result) => {
  console.log('User schema created.');
});

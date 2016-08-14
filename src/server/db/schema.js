// the database configuration is inside of server/common.js

import { db } from "../common";

db.schema.createTableIfNotExists("users", table => {
  table.increments("Id").primary();
  table.string("username");
  table.string("firstname");
  table.string("lastname");
  table.string("password");
  table.string("accessToken");
  table.string("facebookId");
}).then(() => {
  console.log("User schema created.");
});

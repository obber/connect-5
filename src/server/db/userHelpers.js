import { db } from "../common";

const exists = (table, options) => (
  db(table).where(options)
    .then(resp => !!resp.length)
);

const insert = (table, options) => (
  db(table).insert(options)
    .then(resp => {
      console.log("resp = ", resp);
    })
);

const verifyToken = (token) => (
  db("users").where({ accessToken: token })
    .then(resp => resp)
);

export { exists, insert, verifyToken };

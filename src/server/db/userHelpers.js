import { db } from "../common";

const exists = (table, options) => (
  db(table)
    .where(options)
    .then(resp => !!resp.length)
);

const insert = (table, options) => (
  db(table)
    .insert(options)
    .then(resp => !!resp.length)
);

const update = (table, who, what) => (
  db(table)
    .where(who)
    .update(what)
    .then(resp => !!resp)
);

const verifyToken = (accessToken, facebookId) => (
  db("users")
    .where({ accessToken, facebookId })
    .then(resp => !!resp.length)
);

export { exists, insert, update, verifyToken };

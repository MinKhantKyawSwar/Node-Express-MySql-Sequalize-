// mysql2 database
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "blog",
//   password: "mkks.mkks",
// });
// module.exports = pool.promise();

const Sequalize = require("sequelize");

const sequalize = new Sequalize("blog", "root", "mkks.mkks", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequalize;

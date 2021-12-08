const mysql = require("mysql");
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = {
  getConnection() {
    return new Promise(function(res, rej){
      pool.getConnection(function(err, conn){
        if (err){
          return rej(err);
        }else {
          res(conn);
        }
      });
   });
 }
};


/*
getConnection() {
  return new Promise(function(res, rej){
    pool.getConnection().then(function(conn){
      res(conn);
    }).catch(function(error){
      rej(error);
    });
  });
}
*/

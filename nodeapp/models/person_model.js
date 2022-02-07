const pool = require("../utils/db.js");
const auth = require("../utils/auth.js");

module.exports = {

  //get info about one user
  async getUser(username){
    return new Promise(async function(res, rej){
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM People WHERE username = ?";
      await conn.query(sql, [username], function(err, results, fields){
        if (err){
          console.err(err.message);
        }else {
          if(results.length == 1){
            res(results[0]);
          }else {
            res(null);
          }
        }
      });
     conn.release();
    }catch (err){
      rej(err);
    }
   });
  },

  //list all users
  async listUsers(){
    return new Promise(async function(res, rej){
      try{
        conn = await pool.getConnection();
        sql = "SELECT person_id,username,email,role FROM People";
        await conn.query(sql, [], function(err, results, fields){
          res(results);
        });
      }catch (err){
        rej(err);
      }
    });
  },

  // matches password of user with password argument
  async areValidCredentials(username, password){
    return new Promise(async function(res, rej){
    try {
      conn = await pool.getConnection();
      sql = "SELECT person_password FROM People WHERE username = ?";
      await conn.query(sql, [username], function(err, results, fields){
        if (err){
          console.error(err.message);
        }else {
          if (results.length == 1 && results[0].person_password === password){
            res(true);
          }else {
            res(false);
          }
        }
      });
      conn.release();
    } catch (err){
      return rej(err);
    }
   });
  },

  //create user
  async createPerson(person_name, email, person_role, username, password){
    try {
      conn = await pool.getConnection();
      let date = new Date().toISOString().slice(0, 10).replace('T', ' ');
      sql = "INSERT INTO People (person_name, email, person_role, username, person_password, created_on, created_by, modified_on, modified_by)";
      sql += " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await conn.query(sql, [person_name, email, person_role, username, password, date, person_name, date, person_name]);
      conn.release();
      console.log("User created: " + username);
    }catch (err) {
      throw err;
    }
  },

  //assign project to user
  async assignIssue(username, issue_id){
    try {
      conn = await pool.getConnection();
      sql = "UPDATE People SET assigned_issue = ? WHERE username = ?";
      await conn.query(sql, [issue_id, username]);
      conn.release();
      if (issue_id === 0){
        console.log("User: " + username + "now is unassigned.");
      }else {
        console.log("User: " + username + " now assigned to project: " + issue_id);
      }
    }catch (err){
      throw err;
    }
  }
};

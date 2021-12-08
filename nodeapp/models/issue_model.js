const pool = require("../utils/db.js");
const person_model = require("./person_model");

module.exports = {

  //create new issue
  //username passed as argument, or maybe query it here
  async createIssue(username, summary, person_id, id_date, project_id, status){
    try {
      conn = await pool.getConnection();
      let date = new Date().toISOString().slice(0, 10).replace("T", " ");
      sql = "INSERT INTO Issues (issue_summary, identified_by_person_id, identified_date, related_project, issue_status, created_on, created_by, modified_on, modified_by)";
      sql += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await conn.query(sql, [summary, person_id, id_date, project_id, status, date, username, date, username]);
      conn.release();
      console.log("Issue created by: " + username);
    }catch (err) {
      throw err;
    }
  },

  //retrieve info about issue for issue detail
  async getIssue(issue_id){
    return new Promise(async function(res, rej){
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM Issues WHERE issue_id = ?";
      await conn.query(sql, [issue_id], function(err, results, fields){
        if (results[0]){
          res(results[0]);
        }else {
          console.log("Issue not found");
          res(null);
        }
      });
      conn.release();
    }catch (err){
      rej(err);
    }
   });
  },

  //Call when issue is finished, set it to closed and unassign user
  async closeIssue(issue_id){
    try {
      conn = await pool.getConnection();
      sql = "UPDATE Issues SET issue_status = 'Closed' WHERE issue_id = ?";
      await conn.query(sql, [issue_id], function(err, result, fields){
        if (err){
          console.log("Issue not closed properly");
        }
      });
      const issue = getIssue(issue_id);
      sql = "SELECT username FROM People WHERE person_id = ?";
      await conn.query(sql, [issue.assigned_to], async function(err, results, fields){
        if (results.length == 1){
          await person_model.assignIssue(results[0].username, 0); //person should be assigned to nothing
        }else {
          console.log("Error unassigning person from issue");
        }
      });
      conn.release();
    }catch (err){
      throw err;
    }
  },

  //edit an issue that is already created
  // need variable args?
  async editIssue(){

  },

  //get all issues to show from a project
  async showAllIssues(project_id){
    return new Promise(async function(res, rej){
      try {
        conn = await pool.getConnection();
        sql = "SELECT * FROM Issues WHERE related_project = ?";
        await conn.query(sql, [project_id], function(err, results, fields){
          res(results);
        });
        conn.release();
      }catch (err) {
        rej(err);
      }
   });
  },

  //get all opened issues from project
  async showOpenIssues(project_id){
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM Issues WHERE related_project = ? AND issue_status = 'open'";
      let rows = await conn.query(sql, [project_id]);
      conn.release();
      return rows;
    }catch (err){
      throw err;
    }
  },

  // get overdue issues by project
  async showOverdueIssues(project_id){
    try {
      conn = await pool.getConnection();
      let date = new Date().toISOString().slice(0, 10).replace("T", " ");
      sql = "SELECT * FROM Issues WHERE related_project = ? AND target_date < ?";
      let rows = await conn.query(sql, [project_id, date]);
      conn.release();
      return rows;
    }catch (err){
      throw err;
    }
  },

  //Show some recent issues from different projects when user
  //clicks on issue tab from navbar
  async showRecentIssues(){
    return new Promise(async function(res, rej){
      try{
        conn = await pool.getConnection();
        sql = "SELECT * FROM Issues ORDER BY created_on DESC LIMIT 6";
        await conn.query(sql, function(err, results, fields){
          res(results);
        });
        conn.release();
      }catch (err){
        rej(err);
      }
    });
  }
};

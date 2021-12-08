const pool = require("../utils/db.js");
const auth = require("../utils/auth.js");
const issue_model = require("./issue_model.js");

module.exports = {

  //create project
  async createProject(project_name, target_end_date, username){
    try {
      isAvailable = await auth.checkNewProject(project_name);
      if (isAvailable){
        conn = await pool.getConnection();
        let date = new Date().toISOString().slice(0, 10).replace("T", " ");
        sql = "INSERT INTO Projects (project_name, start_date, target_end_date, created_on, created_by, modified_on, modified_by)";
        sql += "VALUES (?, ?, ?, ?, ?, ?, ?)";
        await conn.query(sql, [project_name, date, target_end_date, date, username, date, username]);
        conn.release();
        console.log("Project created: " + project_name);
      }else {
        console.log("Project already exists");
      }
    }catch (err){
      throw err;
    }
  },

  //retrieve project for project detail
  async getProjectByName(project_name){
    return new Promise(async function(res, rej){
      try {
        conn = await pool.getConnection();
        sql = "SELECT * FROM Projects WHERE project_name = ?";
        await conn.query(sql, [project_name], function(err, results, fields){
          if (results.length == 1){
            res(results[0]);
          }else {
            console.log("Didn't find project");
          }
        });
        conn.release();
      }catch (err){
        rej(err);
      }
    });
  },

  async getProjectById(project_id){
    return new Promise(async function(res, rej){
      try {
        conn = await pool.getConnection();
        sql = "SELECT * FROM Projects WHERE project_id = ?";
        await conn.query(sql, [project_id], function(err, results, fields){
          if (results.length == 1){
            res(results[0]);
          }else {
            console.log("Didn't find project");
          }
        });
        conn.release();
      }catch (err){
        rej(err);
      }
    });
  },

  //show a number of projects that were created recently
  async showRecentProjects(){
    return new Promise(async function(res, rej){
      try {
        conn = await pool.getConnection();
        sql = "SELECT * FROM Projects ORDER BY created_on DESC LIMIT 6";
        await conn.query(sql, function(err, results, fields){
          res(results);
        });
      }catch (err){
        rej(err);
      }
    });
  },

  //show all or a lot of projects for projects.ejs page
  async showAllProjects(){
    return new Promise(async function(res, rej){
      try {
        conn = await pool.getConnection();
        sql = "SELECT * FROM Projects ORDER BY created_on";
        await conn.query(sql, function(err, results, fields){
          res(results);
        });
      }catch (err){
        rej(err);
      }
    });
  },

  //call when a project is finished, will give it actual end date
  async finishProject(project_id){
    try{
      conn = await pool.getConnection();
      const date = new Date().toISOString().slice(0, 10).replace("T", "");
      sql = "UPDATE Projects SET actual_end_date = ? WHERE project_id = ?";
      await conn.query(sql, [date, project_id], function(err, results, fields){
        if (err){
          console.log("Problem finishing project");
        }
      });
      //close all issues associated with project
      sql = "SELECT issue_id FROM Issues WHERE related_project = ?";
      await conn.query(sql, [project_id], async function(err, results, fields){
        for (let i = 0; i < results.length; i++){
          await issue_model.closeIssue(results[i].issue_id);
        }
      });
      conn.release();
    }catch (err){
      throw(err);
    }
  }

};

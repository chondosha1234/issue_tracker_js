const issue_model = require("../../models/issue_model");
const person_model = require("../../models/person_model");
const project_model = require("../../models/project_model");
const pool = require("../../utils/db.js");


function getVal(input){
  return document.getElementById(input).value;
}

async function searchIssue(){
  try{
    let username = document.getElementById("username").value;
    let project_name = document.getElementById("project_name").value;
    let issue_id = document.getElementById("issue_id").value;
    
    conn = await pool.getConnection();
    sql = "SELECT * FROM People WHERE username = ?";
    await conn.query(sql, [username], function(err, results, fields){
      if (!results[0]){
        console.log("error with username");
      }
    });

    sql = "SELECT * FROM Projects WHERE project_name = ?";
    await conn.query(sql, [project_name], function(err, results, fields){
      if (!results[0]){
        console.log("error with project name");
      }
    });

    sql = "SELECT * FROM Issues WHERE issue_d = ?";
    await conn.query(sql, [issue_id], function(err, results, fields){
      if (!results[0]){
        console.log("error with issue id");
      }else{
        let issue = results[0];
        document.getElementById("description").style.display = "block";
        document.getElementById("description-label").style.display = "block";
        document.getElementById("progress").style.display = "block";
        document.getElementById("progress-label").style.display = "block";
        document.getElementById("change-priority-label").style.display = "block";
        document.getElementById("priority-yes").style.display = "block";
        document.getElementById("priority-yes-label").style.display = "block";
        document.getElementById("priority-no").style.display = "block";
        document.getElementById("priority-no-label").style.display = "block";

        document.getElementById("description").value = issue.description;
        document.getElementById("progress").value = issue.progress;
      }
    });
  }catch (err){
    throw(err);
  }
}

function priorityClick(button){
  if (button.value === "YES"){
    document.getElementById("low").style.display = "block"; //hide or show
    document.getElementById("medium").style.display = "block";
    document.getElementById("high").style.display = "block";
    document.getElementById("low-label").style.display = "block"; //hide or show
    document.getElementById("medium-label").style.display = "block";
    document.getElementById("high-label").style.display = "block";
  }
  if (button.value === "NO"){
    document.getElementById("low").style.display = "none"; //hide or show
    document.getElementById("medium").style.display = "none";
    document.getElementById("high").style.display = "none";
    document.getElementById("low-label").style.display = "none"; //hide or show
    document.getElementById("medium-label").style.display = "none";
    document.getElementById("high-label").style.display = "none";
  }
}

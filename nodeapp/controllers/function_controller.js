const person_model = require("../models/person_model");
const issue_model = require("../models/issue_model");
const project_model = require("../models/project_model");
const auth = require("../utils/auth.js");

module.exports = {

  //action of logging in
  loginFunction:async function(req, res){
    areValid = await person_model.areValidCredentials(req.body.username, req.body.password);
    if (areValid){
      user = await person_model.getUser(req.body.username);
      issues = await issue_model.showRecentIssues();
      req.session.username = req.body.username;
      res.render("main", {
        user: user,
        issues: issues
      });
      console.log("login successful");
    }else {
      res.render("login", {
        errors: [{msg: "Invalid Credentials Provided"}]
      });
      console.log("failed login");
    }
  },

//functions for users

  createPerson:async function(req, res){
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const person_role = "Admin";
    isAvailable = await auth.checkNewAccount(username);
    if (isAvailable){
      person_model.createPerson(name, email, person_role, username, password);
    }else {
      console.log("Username already exists");
    }
    res.render("login");
  },

  getUser:async function(req, res){
    const user = await person_model.getUser(req.body.username);  //not sure about this
    res.send("user_info", {
      user: user,
    });
  },

//section for functions related to projects

  createProject:async function(req, res){
    const project_name = req.body.project_name;
    const target_end_date = req.body.target_end_date;
    const username = req.body.username;
    project_model.createProject(project_name, target_end_date, username);
    const projects = await project_model.showRecentProjects();
    res.render("projects", {
      projects: projects
    });
  },

  finishProject:async function(req,res){
    const project = await project_model.getProjectByName(req.body.project_name);
    await project_model.finishProject(project.project_id);
    res.render("main");
  },

  getProject:async function(req,res){
    const project = await project_model.getProject(req.body.project_id); // not sure
    res.send("project_detail", {
      project: project,
    });
  },


// section for functions related to issues

  createIssue:async function(req, res){
    const username = req.body.username;
    const summary = req.body.summary;
    const id_date = req.body.id_date;
    const project_name = req.body.project_name;
    const project = await project_model.getProjectByName(project_name);  //check these 2 lines
    const project_id = project.project_id;
    const user = await person_model.getUser(username);
    const person_id = user.person_id;
    const status = "Open";
    issue_model.createIssue(username, summary, person_id, id_date, project_id, status);

    const issues = await issue_model.showAllIssues(project_id);
    const projects = await project_model.showRecentProjects();
    res.render("issues", {
      project: project,
      projects: projects,
      issues: issues
    });
  },

  assignIssue:async function(req,res){
    const issue = await issue_model.getIssue(req.body.issue_id);
    const user = await person_model.getUser(req.body.person_id);
    person_model.assignIssue(user.username, issue.issue_id);
    const issues = await issue_model.showRecentIssues();
    res.render("main", {
      user: user,
      issues: issues
    })
  },

  updateIssue:async function(req,res){
    const issue_id = req.body.issue_id;
    const project = req.body.project_name;
    const description = req.body.description;
    const progress = req.body.progress;
    const priority = req.body.priority; // 3 radio button and maybe change button
    const issues = await issue_model.showRecentIssues();
    await issue_model.updateIssue(issue.issue_id, project, description, progress, priority);
    const issue = await issue_model.getIssue(req.body.issue_id);
    res.render("issue_detail", {
      issue: issue,
      issues: issues
    });
  },

  closeIssue:async function(req,res){
    const issue = await issue_model.getIssue(req.body.issue_id);
    await issue_model.closeIssue(req.body.issue_id, req.body.resolution_summary);
    const project = await project_model.getProjectById(issue.related_project);
    const issues = await issue_model.showAllIssues(project.project_id);
    res.render("issues", {
      issues: issues,
      project: project
    })
  },

  showAllIssues:async function(req,res){
    const issues = await issue_model.showAllIssues(req.body.project_id);
    res.render("issues", {
      issues: issues
    });
  },

  showOpenIssues:async function(req,res){
    const issues = await issue_model.showOpenIssues(req.body.project_id);
    res.render("issues", {
      issues: issues
    });
  },

  showOverdueIssues:async function(req,res){
    const issues = await issue_model.showOverdueIssues(req.body.project_id);
    res.render("issues", {
      issues: issues
    });
  }
};

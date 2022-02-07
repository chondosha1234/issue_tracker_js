const person_model = require("../models/person_model");
const project_model = require("../models/project_model");
const issue_model = require("../models/issue_model");
const auth = require("../utils/auth");

module.exports = {

  home:async function(req,res){
    user_data = await person_model.getUser(req.session.username);
    issues = await issue_model.showRecentIssues();
    res.render("main", {
      username: user_data.username,
      email: user_data.email,
      person_role: user_data.person_role,
      assigned_issue: user_data.assign_issue,
      created_on: user_data.created_on.toISOString().slice(0, 10).replace('T', ' '),
      modified_on: user_data.modified_on.toISOString().slice(0, 10).replace('T', ' '),
      issues: issues
    });
  },

  projects:async function(req,res){
    const projects = await project_model.showRecentProjects();
    const issues = await issue_model.showRecentIssues();
    res.render("projects", {
      projects: projects,
      issues: issues
    });
  },

  create_project:function(req,res){
    res.render("create_project", {
      username: req.body.username
    });
  },

  project_detail:async function(req,res){
    const project = await project_model.getProjectById(req.params.id);
    res.render("project_detail", {
      project: project
    });
  },

  users:async function(req,res){
    const users = await person_model.listUsers();
    const issues = await issue_model.showRecentIssues();
    res.render("users", {
      users: users,
      issues: issues
    });
  },

  user_info:async function(req,res){
    const user = await person_model.getUser(req.params.username);
    res.render("user_info", {
      user: user
    });
  },

  issues:async function(req,res){
    const issues = await issue_model.showRecentIssues();
    const projects = await project_model.showRecentProjects();
    res.render("issues", {
      project: null,
      projects: projects,
      issues: issues
    });
  },

  create_issue:function(req,res){
    res.render("create_issue");
  },

  assign_issue:function(req,res){
    res.render("assign_issue");
  },

  issue_detail:function(req,res){
    res.render("issue_detail");
  },

  reports:function(req,res){
    res.render("reports");
  },

  dashboard:function(req,res){
    res.render("dashboard");
  },

  // just renders login page
  login:function(req, res){
    res.render("login");
  },

  register:function(req,res){
    res.render("register");
  },

  logout:function(req, res){
    //res.logOut();
    res.render("login");
  }
};

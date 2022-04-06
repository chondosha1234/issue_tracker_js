const person_model = require("../models/person_model");
const project_model = require("../models/project_model");
const issue_model = require("../models/issue_model");
const auth = require("../utils/auth");

module.exports = {

  home:async function(req,res){
    user = await person_model.getUser(req.session.username);
    issues = await issue_model.showRecentIssues();
    res.render("main", {
      user: user,
      issues: issues
    });
  },

  login:function(req, res){
    res.render("login");
  },

  register:function(req,res){
    res.render("register");
  },

  logout:function(req, res){
    //res.logOut();
    res.render("login");
  },

//projects pages

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
    const issues = await issue_model.showRecentIssues();
    const proj_issues = await issue_model.getIssuesByProject(req.params.id);
    res.render("project_detail", {
      project: project,
      proj_issues: proj_issues,
      issues: issues
    });
  },

  show_all_issues_by_proj:async function(req, res){
    const proj_issues = await issue_model.showAllIssues(req.params.id);
    const project = await project_model.getProjectById(req.params.id);
    const issues = await issue_model.showRecentIssues();
    res.render("project_detail", {
      project: project,
      proj_issues: proj_issues,
      issues: issues
    });
  },

  show_open_issues_by_proj:async function(req, res){
    const proj_issues = await issue_model.showOpenIssues(req.params.id);
    const project = await project_model.getProjectById(req.params.id);
    const issues = await issue_model.showRecentIssues();
    res.render("project_detail", {
      project: project,
      proj_issues: proj_issues,
      issues: issues
    });
  },

  show_closed_issues_by_proj:async function(req, res){
    const proj_issues = await issue_model.showClosedIssues(req.params.id);
    const project = await project_model.getProjectById(req.params.id);
    const issues = await issue_model.showRecentIssues();
    res.render("project_detail", {
      project: project,
      proj_issues: proj_issues,
      issues: issues
    });
  },

  show_overdue_issues_by_proj:async function(req, res){
    const proj_issues = await issue_model.showOverdueIssues(req.params.id);
    const project = await project_model.getProjectById(req.params.id);
    const issues = await issue_model.showRecentIssues();
    res.render("project_detail", {
      project: project,
      proj_issues: proj_issues,
      issues: issues
    });
  },


  finish_project: async function(req,res){
    res.render("finish_project");
  },

//users pages

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
    const issues = await issue_model.showRecentIssues();
    res.render("user_info", {
      user: user,
      issues: issues
    });
  },


//issues pages

  issues:async function(req,res){
    const issues = await issue_model.showRecentIssues();
    const projects = await project_model.showRecentProjects();
    res.render("issues", {
      project: null, //because its using projects css template
      projects: projects,
      issues: issues
    });
  },

  issue_detail:async function(req,res){
    const issue = await issue_model.getIssue(req.params.id);
    const issues = await issue_model.showRecentIssues();
    res.render("issue_detail", {
      issue: issue,
      issues: issues
    });
  },

  create_issue:function(req,res){
    res.render("create_issue");
  },

  close_issue: async function(req,res){
    res.render("close_issue");
  },

  update_issue: async function(req,res){
    res.render("update_issue");
  },

  search_issue: function(req,res){
    res.render("search_issue");
  },

  assign_issue:function(req,res){
    res.render("assign_issue");
  },

//reports

  reports:function(req,res){
    res.render("reports");
  },

  dashboard:function(req,res){
    res.render("dashboard");
  },

};

const express = require("express");
const page_controller = require("../controllers/page_controller");
const function_controller = require("../controllers/function_controller");
const router = express.Router();

router.get('/', page_controller.login);
router.get('/home', page_controller.home);
router.get('/login', page_controller.login);
router.post('/home', function_controller.loginFunction);

router.get('/home/projects', page_controller.projects);
router.get('/home/projects/create_project', page_controller.create_project);
router.post('/home/projects', function_controller.createProject);
router.get('/home/projects/project_detail/:id', page_controller.project_detail);

router.get('/home/users', page_controller.users);
router.get('/home/users/user_info', page_controller.user_info);

router.get('/home/issues', page_controller.issues);
router.get('/home/issues/create_issue', page_controller.create_issue);
router.post('/home/issues', function_controller.createIssue);
router.get('/home/issues/assign_issue', page_controller.assign_issue);
router.post('/home/issues/assign_issue', function_controller.assignIssue);    //check to see if works
router.get('/home/issues/issue_detail', page_controller.issue_detail);

router.get('/home/reports', page_controller.reports);
router.get('/home/dashboard', page_controller.dashboard);

router.get('/register', page_controller.register);
router.post('/register', function_controller.createPerson);

module.exports = router;

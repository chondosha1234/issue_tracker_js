const express = require("express");
const page_controller = require("../controllers/page_controller");
const function_controller = require("../controllers/function_controller");
const router = express.Router();

router.get('/home/issues', page_controller.issues);
router.get('/home/issues/create_issue', page_controller.create_issue);
router.post('/home/issues', function_controller.createIssue);
router.get('/home/issues/assign_issue', page_controller.assign_issue);
router.post('/home', function_controller.assignIssue);    //check to see if works
router.get('/home/issues/issue_detail', page_controller.issue_detail);

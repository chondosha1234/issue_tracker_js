const express = require("express");
const page_controller = require("../controllers/page_controller");
const function_controller = require("../controllers/function_controller");
const router = express.Router();

router.get('/home/projects', page_controller.projects);
router.get('/home/projects/create_project', page_controller.create_project);
router.post('/home/projects', function_controller.createProject);
router.get('/home/projects/project_detail/:id', page_controller.project_detail);

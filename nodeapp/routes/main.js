const express = require("express");
const page_controller = require("../controllers/page_controller");
const function_controller = require("../controllers/function_controller");
const router = express.Router();

router.get('/', page_controller.login);
router.get('/home', page_controller.home);
router.get('/login', page_controller.login);
router.post('/home', function_controller.loginFunction);

router.get('/register', page_controller.register);
router.post('/register', function_controller.createPerson);

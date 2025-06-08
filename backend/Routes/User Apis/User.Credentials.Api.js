const express = require("express");
const router = express.Router();

const {registerHandler,loginHandler,changePassword}  = require('../../Controller/User/Credentials.Controller.js')
const {mailer} = require('../../Middlewares/Email.js');

router.post("/register",registerHandler);
router.post("/login",loginHandler);
router.post("/changePassword",changePassword);
router.post("/email",mailer);

module.exports = router;

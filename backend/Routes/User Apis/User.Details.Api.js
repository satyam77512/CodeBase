const express = require("express");
const router = express.Router();

const {filterUser,viewProfile,Update,ToggleStatus,changeProfile,activeUsers,deleteProfile}  = require('../../Controller/User/Details.Controllers')

router.post("/filter",filterUser);
router.post("/viewProfile",viewProfile);
router.put("/update",Update);
router.put("/status",ToggleStatus);
router.put("/changeProfile",changeProfile)
router.post("/activeUsers",activeUsers);
router.post("/deleteProfile",deleteProfile);

module.exports = router;

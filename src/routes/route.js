const express=require("express");
const router=express.Router();

const userController=require("../Controller/user");
const evntController=require("../Controller/event");
const {authorization}=require("../middleware/middleware");

// User`s Api`s
router.post("/registerUser",userController.user);
router.post("/login",userController.loginUser);

// Event`s Api`s
router.post("/createEvent",authorization,evntController.event);
router.post("/eventInvite/:id",authorization,evntController.invite);
router.get("/eventDetail/:id",authorization,evntController.details);

module.exports=router;
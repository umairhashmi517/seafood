const express = require("express")
const router = express.Router();
const user = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const passport = require('passport')
const allowOnly = require('../middleware/guard') 

const apiAuth = passport.authenticate('jwt', { session: false });

const login = passport.authenticate('local',{session:false})

router.get("/display",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),user.display)

router.post("/register",apiAuth,allowOnly(["admin"]),user.register)

//login and authenticate user auth.ensureAuthenticated,
router.post("/login",login,user.login)

//for updating user data 
router.put("/",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),user.update)

//for deleting user
router.delete("/",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),user.delete)

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const supplier = require('../controllers/supplier.controller');
const allowOnly = require('../middleware/guard')
const passport = require('passport')

const apiAuth = passport.authenticate('jwt', { session: false });

router.post("/",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),supplier.create);

router.get("/list",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),supplier.list);

router.delete("/:id",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),supplier.delete);

router.put("/",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),supplier.update);

module.exports = router;
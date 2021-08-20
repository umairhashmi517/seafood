const express = require("express")
const router = express.Router();
const product = require('../controllers/product.controller');
const allowOnly = require('../middleware/guard')
const passport = require('passport')
const auth = require('../middleware/auth')

const apiAuth = passport.authenticate('jwt', { session: false });

router.post("/",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),product.create);

router.delete("/",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),product.delete);

router.get("/list",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),product.list);

router.post("/add-stock",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),product.addStock);

router.post("/checkout",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),product.checkout);

router.put("/",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),product.update);

router.get("/filter",apiAuth,auth.ensureAuthenticated,allowOnly(["admin"]),product.filter);

module.exports = router;
const express = require('express');
const router = express.Router();

router.use("/user", require('./user.routes'));
router.use("/product", require('./product.routes'));
router.use("/supplier", require('./supplier.routes'));

module.exports = router;
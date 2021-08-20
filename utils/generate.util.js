const jwt = require('jsonwebtoken');
module.exports.token = (user) => ({
	token: 'Bearer ' + jwt.sign({ ...JSON.parse(JSON.stringify(user)) }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
});
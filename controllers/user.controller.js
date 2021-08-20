const User = require('../model/User');
const generate = require('../utils/generate.util');
const validator = require('validator')

module.exports.register = async (req,res) => {
	let errors = [];
	let user = {};
	user.fullName = req.body.fullName ? req.body.fullName : "" 
	user.email = req.body.email ? req.body.email : ""
	user.password = req.body.password ? req.body.password : ""
	user.role = req.body.role ? req.body.role : ""
  
	if(validator.isEmpty(user.name) || validator.isEmpty(user.email) ||validator.isEmpty(user.role) ||validator.isEmpty(user.password)){
		errors.push("Name,email,role and password is required")
	}
	if (!validator.isEmail(user.email)) {
		errors.push("Correct format of email required")
	}
	if(errors.length){
		return res.status(401).json({ 
			status:401,
			data:errors
		})
	}
	const data = await User.findOne({email:user.email})
	console.log(data);
	console.log("chal raha hai");
	if(!data)
	{
		try{
		 const userCollection = new User(user);
     await userCollection.save();
	   res.json({	
		  status:200
		});
		}
	  catch(e){
			console.log("error in saving user collection is ",e);
		}
	}
	else { 
		res.status(401).json({ 
			status:401,
			data:"Already registered" 
		}) 
	}  
}
module.exports.display = async (req,res) =>{
	let dat =await User.find()
	res.json({
		message:dat
	})
}
module.exports.login = (req, res) => {
	console.log(req.user);
  res.status(200).json({ status: 200, data: generate.token(req.user) });
};
module.exports.update = async (req,res) => {
	let errors = [];
	let user = {};
	user.fullName = req.body.fullName ? req.body.fullName : "" 
	user.email = req.body.email ? req.body.email : ""
	user.password = req.body.password ? req.body.password : ""
	user.role = req.body.role ? req.body.role : ""
  const userId = req.body.id ? req.body.id : ""

	if(validator.isEmpty(user.fullName) || validator.isEmpty(user.email) ||validator.isEmpty(user.role) ||validator.isEmpty(user.password)){
		errors.push("Name,email,role and password is required")
	}
	if (!validator.isEmail(user.email)) {
		errors.push("Correct format of email required")
	}
	if(errors.length){
		return res.status(400).json({ 
			status:400,
			data:errors
		})
	}
	try{
    await User.findByIdAndUpdate(userId,user) 
	} 
	catch(e){
    console.log(e);
	} 
}
module.exports.delete = async (req,res) => {
	const userId = req.params.id;
	try{
		await User.findByIdAndDelete(supplierId)
	  res.json({
		 status:200
	  })
	}  
	catch(e){
		console.log(e);
	}
}
const Supplier = require('../model/Supplier');
const validator = require('validator');

module.exports.create = async (req,res) =>{
	let errors = [];
  let supplier = {};

	supplier.fullName = req.body.fullName ? req.body.fullName : "";
  supplier.address = req.body.address ? req.body.address : "";
  supplier.phone = req.body.phone ? req.body.phone : "";

  if(validator.isEmpty(supplier.fullName) || validator.isEmpty(supplier.address) ||validator.isEmpty(supplier.phone)){
		errors.push("fullName,address and phone is required")
	}
  if(errors.length){
		return res.status(400).json({ 
			status:400,
			data:errors
		})
	}
	const data = await Supplier.findOne({phone:supplier.phone})
	console.log(data);
	if(!data)
	{
		try{
	 const supplierCollection = new Supplier(supplier);
   await supplierCollection.save();
	 res.json({	
		status:200,	
	 });
	 }
	  catch(error){
		 console.log("error in saving supplier collection is ",error);
	  }
	}
	else { 
		res.status(400).json({ 
			status:400,
			data:"Already entered" 
		}) 
	}
}
module.exports.list = async (req,res) => {

 const suppliers = await Supplier.find() 

 res.json({
   status:200,
   data:suppliers
 })
}
module.exports.delete = async (req,res) => {
	const supplierId = req.params.id;
	try{
		await Supplier.findByIdAndDelete(supplierId)
	}  
	catch(e){
		console.log(e);
	}
	res.json({
		status:200
	})
}
module.exports.update = async (req,res) => {
	let supplier = {};
	const supplierId = req.body.supplierId ? req.body.supplierId : "";
  supplier.fullName = req.body.fullName ? req.body.fullName : "";
  supplier.address = req.body.address ? req.body.address : "";
  supplier.phone = req.body.phone ? req.body.phone : "";

  if(validator.isEmpty(fullName) || validator.isEmpty(address) ||validator.isEmpty(phone)){
		return res.status(400).json({ 
			status:400,
			data:"fullName,address and phone is required"
		})
	}
	try{
		await Supplier.findByIdAndUpdate(supplierId,supplier)
	}  
	catch(e){
		console.log(e); 
	}
	res.json({
		status:200
	})
}
const Product = require('../model/Product');
const validator = require('validator');
module.exports.create = async (req,res) => {
  
	let product = {};
  product.type = req.body.type ? req.body.type : "" 
  product.count = req.body.count ? req.body.count : ""
  product.specie = req.body.specie ? req.body.specie : ""
  product.dateOfProduction = req.body.dateOfProduction ? req.body.dateOfProduction : ""
  product.dateOfExpiry = req.body.dateOfExpiry ? req.body.dateOfExpiry : ""
  product.packing = req.body.packing ? req.body.packing : ""
  product.supplierId = req.body.supplierId ? req.body.supplierId : ""

  if(validator.isEmpty(product.type) || validator.isEmpty(product.count) ||validator.isEmpty(product.specie) ||validator.isEmpty(product.dateOfProduction) ||validator.isEmpty(product.dateOfExpiry) ||validator.isEmpty(product.packing)){
		 return res.status(400).json({ 
		 status:400,
		 data:"product type,count,specie,date of production,date of expiry and packing is required"
		})
	}
	const data  =  await Product.findOne(product)
	if(data){
		return res.status(400).json({ 
			status:400,
			data:"Already saved in a database"
		 })
	}
	try{
	 const productCollection = new Product(product);
   await productCollection.save();
	 res.json({	
		status:200
	 });
	}
	 catch(e){
		console.log("Error in saving product data is ",e)
	 }
}
//listing of products 
module.exports.list = async (req,res) => {
   let products = [];
	 try{
		 products = await Product.find().populate('supplierId');	
		 
		 res.json({	
			status:200,	
			data:products 
		});
	}
	 catch(e){
		 console.log(e);
	 }
  
}
module.exports.delete = async (req,res) => {
	const productId = req.params.id;
	try{
		await Product.findByIdAndDelete(productId)
	}
	catch(e){
		console.log(e);
	}
	res.json({
		status:200
	})
}
module.exports.addStock = async (req,res) => {
  const productId = req.body.id;
	const stockCount = req.body.stockCount ? req.body.stockCount : 0;
   
  if(!stockCount){
		return res.status(401).json({ 
			status:401,
			data:"stock Count is must for adding stock "
	  })
	}
	try{
		await Product.findByIdAndUpdate(
		 productId,
		 { $inc:{stock:stockCount} }
		);

		res.json({	
		 status:200
		});
	 }
	 catch(e){
			console.log(e)
	 }
}
module.exports.checkout = async (req,res) => {
 
  const productId = req.body.id;
	const stockCount = req.body.stockCount ? req.body.stockCount : 0;

  if(!stockCount){
		return res.status(401).json({ 
			status:401, 
			data:"stock Count is must for adding stock "
	  })
	}
	try{
		await Product.findByIdAndUpdate(
		 productId,
		 {$inc:{stock:-stockCount}}
		); 
		res.json({	
		 status:200
		});
	 }
	 catch(e){
			console.log(e)
	 }
}
module.exports.update = async (req,res) => {

	const productId = req.body.productId ? req.body.productId : ""
	console.log(productId);
	let product = {}
	product.type = req.body.type ? req.body.type : "" 
  product.count = req.body.count ? req.body.count : "" 
  product.specie = req.body.specie ? req.body.specie : ""
  product.dateOfProduction = req.body.dateOfProduction ? req.body.dateOfProduction : ""
  product.dateOfExpiry = req.body.dateOfExpiry ? req.body.dateOfExpiry : ""
  product.packing = req.body.packing ? req.body.packing : ""
  product.supplierId = req.body.supplierId ? req.body.supplierId : ""

  if(validator.isEmpty(productId) || validator.isEmpty(product.type) || validator.isEmpty(product.count) ||validator.isEmpty(product.specie) ||validator.isEmpty(product.dateOfProduction) ||validator.isEmpty(product.dateOfExpiry) ||validator.isEmpty(product.packing)){
		return res.status(401).json({ 
			status:401,
			data:"productId,product type,count,specie,date of production,date of expiry and packing is required"
		})
	}
	try{
	 await Product.findByIdAndUpdate(productId,product);
	 res.json({	
		status:200
	 });
	} 
	 catch(e){
		 console.log(e)
	 }
}
module.exports.filter = async (req,res) => {
	let products = [];
	const filterData = req.body.filter ? req.body.filter : "" 
	try{
		products = await Product.find({ $text: { $search: filterData}})	
		res.json({	
		 status:200,	
		 data:products    
	 });
 }
	catch(e){
		console.log(e);
	}
}
const mongoose = require('mongoose');
// Create Product Schema
const productSchema = new mongoose.Schema(
  {
    type: String,
    count: String,
    specie: {
      type:String
    },
    dateOfProduction: String,
    dateOfExpiry: String,
    packing: String,
    stock: Number,
    supplierId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "supplier"
    }
  },
  { timestamps: true }
);
productSchema.index({type:"text",count:"text",specie:"text",packing:"text",stock:"text"})
 
module.exports = mongoose.model('product', productSchema);
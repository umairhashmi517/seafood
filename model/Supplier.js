const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Create Supplier Schema
const supplierSchema = new mongoose.Schema(
  {
    fullName: String,
    address: {
      type:String,
      unique:true
    },
    phone: {
      type:String,
      unique:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('supplier', supplierSchema);
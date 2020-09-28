const mongoose = require('mongoose');
// const Double = require('@mongoosejs/double');
// const Float = require('mongoose-float').loadType(mongoose,2);

const grocerySchema = new mongoose.Schema({
	Date: String,
    Website: String,
	City: String,
	Category: String,
	Item: String,
	Quantity: String,
	Price: Number
});

module.exports = mongoose.model('Grocery', grocerySchema);
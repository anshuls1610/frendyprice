const express   = require('express');
const router	= express.Router();
const Grocery		= require('../models/grocery');
const bodyParser  	 = require("body-parser");

router.get('/', (req, res) =>{
	Grocery.find((err, allItems) => {
		if(err){
			console.log(err);
		} else {
		res.json(allItems);
		}
	});
});

router.post('/', (req,res) =>{
	const Date = req.body.Date;
	const Website = req.body.Website;
	const City = req.body.City;
	const Category = req.body.Category;
	const Item = req.body.Item;
	const Quantity = req.body.Quantity;
	const Price = req.body.Price;
	
	const newItem = {Date: Date, Website: Website, City: City, Category: Category, Item: Item, Quantity: Quantity, Price: Price}
	console.log(newItem)
	
	Grocery.create(req.body)
	.then((newGrocery) =>{
		console.log(newGrocery)
		res.status(201).json(newGrocery);
	})
	.catch((err) =>{
		res.send(err);
	})
});

module.exports = router;
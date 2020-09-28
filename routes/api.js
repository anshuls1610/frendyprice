const express   = require('express');
const router	= express.Router();
const Grocery		= require('../models/grocery');

router.get('/', (req, res) =>{
	Grocery.find((err, allItems) => {
		if(err){
			console.log(err);
		} else {
		res.json(allItems);
		}
	});
});
module.exports = router;
const express = require('express');
const router  = express.Router();
const Grocery = require('../models/grocery');
const MiniSearch = require('minisearch');

router.get('/', (req, res) =>{
	var noMatch = null;
	if(req.query.search || req.query.date) {
        const regex = new RegExp(escapeRegex((req.query.search)), 'gi');
		const regexx = new RegExp(escapeRegex((req.query.date)), 'gi');
    	Grocery.find({$and: [{Item: regex}, {Date: regexx}]}, (err, allItems) => {
			if(err){
				console.log(err);
			} else{
				if(allItems == 0){
					 noMatch = "No search found, please try again.";
				}
				const miniSearch = new MiniSearch({
  				fields: ['Item', 'Date'], // fields to index for full-text search
  				storeFields: ['Date','Website','Item','Quantity','Price'], // fields to return with search results
				})
				miniSearch.addAll(allItems)
				const resultFre = miniSearch.search(req.query.search || req.query.date, {
					filter: (resultFre) => resultFre.Website === 'Frendy'
				})
				const resultOth = miniSearch.search(req.query.search || req.query.date,{
					filter: (resultFre) => resultFre.Website !== 'Frendy'
				})
				res.render('items/index', {itemsFre: resultFre, itemsOth: resultOth, noMatch: noMatch});
			}
		});
		
		} else {
		Grocery.find({}, (err, allItems) => {
			if(err){
				console.log(err);
			} else{
				res.render('items/indexall', {items: allItems, noMatch: noMatch});
			}
		});
	}
});

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
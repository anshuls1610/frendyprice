const express = require('express');
const router  = express.Router();
const Grocery = require('../models/grocery');
const MiniSearch = require('minisearch');

router.get('/', (req, res) =>{
	if(req.query.search || req.query.date) {
        const regex = new RegExp(escapeRegex((req.query.search)), 'gi');
		const regexx = new RegExp(escapeRegex((req.query.date)), 'gi');
    	Grocery.find({$and: [{Item: regex}, {Date: regexx}]}, (err, allItems) => {
			if(err){
				console.log(err);
			} else{
				const miniSearch = new MiniSearch({
  				fields: ['Item'], // fields to index for full-text search
  				storeFields: ['Date','Website','Item','Quantity','Price'], // fields to return with search results
				})
				miniSearch.addAll(allItems)
				const resultFre = miniSearch.search(req.query.search, {
					filter: (resultFre) => resultFre.Website === 'Frendy'
				})
				const resultOth = miniSearch.search(req.query.search,{
					filter: (resultFre) => resultFre.Website !== 'Frendy'
				})
				res.render('items/test', {itemsFre: resultFre, itemsOth: resultOth});
			}
		});
		
		} else {
		Grocery.find({}, (err, allItems) => {
			if(err){
				console.log(err);
			} else{
				res.render('items/indexall', {items: allItems});
			}
		});
	}
});

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
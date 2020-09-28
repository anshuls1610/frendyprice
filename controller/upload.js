var csv = require('fast-csv');
var mongoose = require('mongoose');
var Grocery = require('../models/grocery');
 
exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
    var groceryFile = req.files.file;
 
    var groceries = [];
         
    csv.parseString(groceryFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
          
         groceries.push(data);
     })
     .on("end", function(){
         Grocery.create(groceries, function(err, documents) {
            if (err) throw err;
         });
          
         res.send(groceries.length + ' items have been successfully uploaded.');
     });
};
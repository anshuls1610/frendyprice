const express     	 = require("express"),
      app         	 = express(),
      bodyParser  	 = require("body-parser"),
      mongoose    	 = require("mongoose"),
  	  methodOverride = require("method-override"),
 	  Grocery 		 = require("./models/grocery"),
	  fileUpload 	 = require('express-fileupload');

const groceryRoutes    = require("./routes/grocery");
const indexRoutes      = require("./routes/index");
const apiRoutes 	   = require("./routes/api");
const testRoutes 	   = require("./routes/test");

const url = process.env.DATABASEURL || "mongodb://localhost:27017/warehouse";
mongoose.connect(url,{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("Error: cd ", err.message);
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(fileUpload());

// const template = require('./template.js');
// app.get('/template', template.get);

app.use("/", indexRoutes);
app.use("/grocery", groceryRoutes);
app.use("/api", apiRoutes);
app.use("/test", testRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("The server has Started!");
})
const express = require('express');
const router  = express.Router();
const Grocery    = require('../models/grocery');
const upload = require('../controller/upload.js');

//root route
router.get('/', (req, res) =>{
    res.render('show');
});

router.get('/form', (req, res) => {
   res.render('form'); 
});

router.get('/upload', (req, res) => {
   res.render('upload'); 
});

router.post('/upload', upload.post);

module.exports = router;
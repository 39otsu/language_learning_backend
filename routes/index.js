var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const util = require('util');
const dbvar = require('../mysql-config');

router.get('/', async function(req, res, next) {
    res.send('hi');
})

module.exports = router;
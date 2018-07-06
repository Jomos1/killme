const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.route('/')
    .get((req, res) => {
        res.render('../views/new-order.js')
    })
router.route('/')
    .post((req, res) => {
        res.render('../views/new-order.js')
    })

module.exports = router; 

function newOrderStatus() {
	
}
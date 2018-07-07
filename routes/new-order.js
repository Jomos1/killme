const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const AWS = require('aws-sdk');
const path = require('path');
const router = express.Router();
AWS.config.loadFromPath('./config.json');
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var sns = new AWS.SNS({apiVersion: '2010-03-31'});

function sendOrderStatus() {
	var params = {
  	Message: 'Konnichiwa mother fucker', /* required */
  	Subject: 'Fuck you',
  	TopicArn: 'arn:aws:sns:us-west-2:427376657397:orders'
	};
	sns.publish(params, function(err, data) {
  		if (err) console.log(err, err.stack); // an error occurred
  		else     console.log(data);           // successful response
	});
};

router.route('/')
    .get((req, res) => {
        res.render('../views/new-order')
    })
router.route('/')
    .post((req, res) => {
        var params = {
		MessageBody: 'Fuck you asshole', /* required */
  		QueueUrl: 'https://sqs.us-west-2.amazonaws.com/427376657397/Thad_Queue', /* required */
	};

	sqs.sendMessage(params, function(err, data) {
		if (err) console.log('Error:', err, err.stack); // an error occurred
  		else     console.log('Success!:', data.MessageId, sendOrderStatus());           // successful response
}); 


});

module.exports = router; 


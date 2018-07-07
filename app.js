const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const AWS = require('aws-sdk');
const path = require('path');
const newOrder = require('./routes/new-order');
const home = require('./routes/home')
const queueUrl = process.env.QUEUE_URL;



let createQueue = () => {
    AWS.config.loadFromPath(__dirname + '/config.json');
    AWS.config.update({region: 'us-west-2'});
  
    let sqs = new AWS.SQS({apiVersion: '2018-06-14'})

    let params = {
        QueueName: 'Thad_Queue',
        Attributes: {
            'DelaySeconds': '60',
            'MessageRetentionPeriod': '86400'
        }
    };

    sqs.createQueue(params, (err, data) => {
        if (err) {
            console.log('Error', err);
        } else {
            console.log('Success, a new SQS has been created with url', data.QueueUrl);
        }
    })     
}

app.use(bodyParser.urlencoded({extended:true}))
app.use("/public", express.static(path.join(__dirname, 'public')));
app.set('view engine', '.hbs');

app.engine('.hbs', exphbs({
  extname:'.hbs',
  defaultLayout:'main',
}))


app.use('/', home);
app.use('/new-order', newOrder)

app.listen(PORT, () => {
    console.log(`Server started, listening on ${PORT}`);
})
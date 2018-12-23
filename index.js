const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());


//Set static path
app.use(express.static(path.join(__dirname,'client')));

const publicVapidKey = 'BKyOpiF6Fr4UPQsbO5xTosfXsPMqV3jgGijheMcUrA707-dwDJQqtkey4zP4sI2juaF9oE0U0rP996vXKJih-iE';
const privateVapidKey = 'SZKxwO0iOMMUJ81SEcrTOV8G0qO3v47fLlhKGpU4X6c';


webpush.setVapidDetails('mailto:faizanqureshi@gmail.com',publicVapidKey,privateVapidKey);


//Subscribe Route
app.post('/subscribe',(req,res)=>{

	console.info('In subscribe');

	const subscription = req.body;

	//resourse has created 
	res.status(201).json({});

	const payload = JSON.stringify({'title':'Hellow World'});

	webpush.sendNotification(subscription,payload).catch(err=>console.error(err));
});


const port = 5000;

app.listen(port,()=>{console.log(`Server is started on ${port}`)});

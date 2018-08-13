//requires
const express = require( 'express' );
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./routes/tasks.router.js');
//uses
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use( express.static('server/public'));
app.use('/tasks', taskRouter);

//port
const port = process.env.PORT || 5000;


//connect to Mongo via Mongoose
const mongoose = require('mongoose');

//Where in the world is Mongo San Diego?
const mongoURI = 'mongodb://localhost:27017/tasks';

//attempt to connect
mongoose.connect(mongoURI, {useNewUrlParser: true});

//log out success or failure
mongoose.connection.on('open', ()=>{
    console.log('connected to mongo successfully!');   
});
mongoose.connection.on('error', (error)=>{
    console.log('error connecting to mongo', error);
});

//spin up server
app.listen(port, ()=>{
    console.log('server up on:', port);
})
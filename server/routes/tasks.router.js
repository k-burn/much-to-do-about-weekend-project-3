//CONSTANTS and Stedmans
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

//define the structure
const TaskSchema = new Schema({
    task: {type: String},
    priortiy: {type: String},
    complete: {type: Boolean},
});

// release the cobras, get a mongoose model, Tasks will be collection name
const Task = mongoose.model('Tasks', TaskSchema);



// Everything you own in a box to the... right???( move tasks to the database)
router.post('/', (req, res) =>{
    console.log('in the tasks router POST');
    console.log(req.body);
    let taskFromClient= req.body;
    const taskToAdd= new Task(taskFromClient);
    taskToAdd.save().then(() =>{
        console.log('Task added: ', taskToAdd);
        res.sendStatus( 201);
    }).catch((error)=>{
        console.log('TROLLS IN THE POST DUNGEON', error);
        res.sendStatus(500);
    });  
});

//Get your things from the box
router.get('/', (req, res) => {
    console.log('in the task router GET');
    Task.find({}).then((foundTasks)=>{
        res.send(foundTasks);
    }).catch((error) =>{
        res.sendStatus(500);
    });
    
})


// send signs of life
module.exports = router;
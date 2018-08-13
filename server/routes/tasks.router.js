//CONSTANTS and Stedmans
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

//define the structure
const TaskSchema = new Schema({
    task: {type: String},
    priority: {type: String},
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
        taskIn.val("");
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
    
});

router.put('/taskComplete/:id', (req, res) => {
    console.log('Update', req.params.id);
    Task.findOne({_id: req.params.id}).then((foundTask)=>{
       console.log('foundTask');
       foundTask.complete= true;
       foundTask.save().then((response)=>{
           res.sendStatus(200);
       }).catch((error)=> {
           res.sendStatus(500);
       })  
    }).catch((error) => {
        console.log('error in taskComplete', error);
        res.sendStatus(500)
    })  
});

router.delete('/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id).then( (response) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });
})


// send signs of life
module.exports = router;
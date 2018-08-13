let myToDo = angular.module('myToDo', []);

myToDo.controller('TaskController', function($http){
    let vm= this;
    vm.tasks= [];

    //add from Inputs and send to database
    vm.addTask= function(){
        console.log('in addTask', vm.taskIn, vm.priorityIn,);
        let newTask={
            task: vm.taskIn,
            priority: vm.priorityIn,
            complete: false
        }//end newTask
        //$http call POST
        $http({
            method: 'POST',
            url: '/tasks',
            data: newTask
        }).then(function(response){
            console.log('returned from POST with', response.data);
            vm.getTasks();
        }).catch( function(error){
            console.log('error in the POST addTask', error);   
        })//end $http
        console.log('tasks thus-far: ', vm.tasks);  
    }//end addTask

    vm.getTasks = function(){
        console.log('in getTasks');
        $http({
            method: 'GET',
            url: '/tasks'
        }).then(function(response){
            console.log('back from the server with: ', response);
            vm.tasks=response.data;   
        }).catch(function(error){
            console.log('mayday in getTasks', error);
        })// end $http
    }//end getTasks

    vm.deleteTask = function(taskId){
        $http({
            method: 'DELETE',
            url: '/tasks/' + taskId
        }).then(function(response){
            getTasks();
        }).catch(function(error){
            alert('error in deleteRepair')
        })
    }//end deleteTask


    //do this on init
    vm.getTasks();
}); //end controller



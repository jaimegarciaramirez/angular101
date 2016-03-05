// XXX.module.js
var todo = angular.module('todo', ['ui.router']);

todo.config(["$stateProvider", 
    function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'home.html' 
    })
    .state('tasks', {
        url: '/tasks',
        templateUrl: 'tasks.html',
        // defines what parameters are acceptable
        params: {
            id: null
        }
    });
}]);

todo.run(function() {
    console.log("running the app");
})

// XXX.controller.js
angular.module('todo').controller('HomeController', 
    ['$state', 'TodoService', HomeController]);

function HomeController($state, TodoService) {
    var that = this;    
    that.login = function() {
        TodoService.login(that.username)
            .then(function(userId) {
                $state.go('tasks', {
                    id: userId
                });
            }, function() {
                that.message = "You are not registered";
            });
    }
    
    that.register = function() {
        TodoService.register(that.email)
            .then(function(userId) {
            $state.go('tasks', {
                id: userId
            })
        })
    }
}

angular.module('todo').controller('TaskController',
    ['$stateParams', 'TodoService', TaskController]);

function TaskController($stateParams, TodoService) {
    var that = this;
    console.log('Loading tasks with these parameters', $stateParams);
    
    that.userId = $stateParams.id;
    
    that.tasks = []
    
    that.loadTasks = function() {
        TodoService.getUserTasks(that.userId).then(function(tasks) {
                that.tasks = tasks;
            });
    }
    
    that.addTask = function(task) {
        TodoService.createTask(that.userId, task).then(function(newTask) {
            that.tasks.push(newTask);
        }, function(error) {
            console.log('error creating a task', error);
        })
    }
    
    that.loadTasks();
}
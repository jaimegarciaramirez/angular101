angular.module('todo').factory('TodoService', 
    ['$http', TodoService]);
    
function TodoService($http) {
    // private functions
    var API_HOST = "/api";
    
    // public functions
    return {
        login: function(username) {
            return $http.get(API_HOST + '/user/' + username)
            .then(function(response) {
                return response.data.id;
            });
        },
        register: function(email) {
            return $http.post(API_HOST + '/user', {
                email: email
            }).then(function(response) {
                return response.data;
            });
        },
        getUserTasks: function(userId) {
            return $http.get(API_HOST + '/user/' + userId + '/tasks')
                .then(function(response) {
                    var tasks = response.data;
                    tasks.sort(function(task1, task2) {
                        if (task1.active && !task2.active) {
                            return -1;
                        } else if (!task1.active && task2.active) {
                            return 1;
                        } else if (task1.id < task2.id) {
                            return -1;
                        } else if (task1.id > task2.id) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    return tasks;
                });
        },
        createTask: function(userId, taskDescription) {
            return $http.post(API_HOST + '/user/' + userId + '/tasks', {
                description: taskDescription
            }).then(function(response) {
                return response.data;
            })
        },
        updateTask: function(newTask) {
            return $http.put(API_HOST + '/tasks/' + newTask.id, newTask)
                .then(function(response) {
                    return response.data;
                });
        },
        deleteTask: function(taskToDelete) {
            return $http.delete(API_HOST + '/tasks/' + taskToDelete.id, taskToDelete)
                .then(function(response) {
                    return response.data;
                });
        }
    }
}
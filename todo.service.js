angular.module('todo').factory('TodoService', 
    ['$http', TodoService]);
    
function TodoService($http) {
    // private functions
    var API_HOST = "http://localhost:8080";
    
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
                    return response.data;
                });
        },
        createTask: function(userId, taskDescription) {
            return $http.post(API_HOST + '/user/' + userId + '/tasks', {
                description: task
            }).then(function(response) {
                return response.data;
            })
        }
    }
}
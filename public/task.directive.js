angular.module('todo').directive('task', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            task: '='
        },
        replace: true,
        templateUrl: 'task.directive.html',
        controller: ['$scope', function($scope) {
            $scope.updating = false;
            
            $scope.update = function() {
                $scope.updating = true;
                $scope.originalDescription = $scope.task.description;
            }
            
            $scope.save = function() {
                $scope.updating = false;
                $scope.$emit('task-updated', $scope.task);
            }
            
            $scope.cancel = function() {
                $scope.updating = false;
                $scope.task.description = $scope.originalDescription;
            }
            $timeout(function() {
                jQuery('#alert-task' + $scope.task.id).on('closed.bs.alert', function () {
                    $scope.$emit('task-deleted', $scope.task);
                })
            }, 0);
        }]
    }    
}]);

angular.module('todo').directive('tasks', function() {
    return {
        restrict: 'E', // this directive is an ELEMENT/TAG
        scope: {
            tasks: '='  // double bind the value in the attribute 'tasks' to this object
        },
        replace: true, // replace the markup in the HTML with the template of this directive
        template: 
            '<div> ' + 
            '    <task data-ng-repeat="task in tasks" data-task="task"></task> ' + 
            '</div>'
    }
})
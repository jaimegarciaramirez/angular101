angular.module('todo').directive('task', function() {
    return {
        restrict: 'E',
        scope: {
            task: '='
        },
        replace: true,
        template: '<span class="cool-task">Cool task: {{task.description}}</span>'
    }    
});

angular.module('todo').directive('tasks', function() {
    return {
        restrict: 'E', // this directive is an ELEMENT/TAG
        scope: {
            tasks: '='  // double bind the value in the attribute 'tasks' to this object
        },
        replace: true, // replace the markup in the HTML with the template of this directive
        template: 
            '<ul> ' + 
            '  <li data-ng-repeat="task in tasks"> ' +
            '    <task data-task="task"></task> ' + 
            '  </li> ' + 
            '</ul>'
    }
})
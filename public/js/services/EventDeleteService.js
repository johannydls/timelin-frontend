angular.module('timelin')

.factory('EventDeleteService', function($resource, env) {
    return $resource(env.BASE_API + '/events/:id');
});
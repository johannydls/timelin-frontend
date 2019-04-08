angular.module('timelin')

.factory('EventPostService', function($resource, env) {
    return $resource(env.BASE_API + '/events');
});
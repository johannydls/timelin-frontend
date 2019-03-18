angular.module('timelin')

.factory('HomeService', function($resource, env) {
    return $resource(env.BASE_API + '/users');
});
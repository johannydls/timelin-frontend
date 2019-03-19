angular.module('timelin')

.factory('UserService', function($resource, env) {
    return $resource(env.BASE_API + '/users');
});
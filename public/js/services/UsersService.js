angular.module('timelin')

.factory('UsersService', function($resource, env) {
    return $resource(env.BASE_API_LOCAL + '/users');
});
angular.module('timelin')

.factory('LoginService', function($resource, env) {
    return $resource(env.BASE_API + '/login');
});
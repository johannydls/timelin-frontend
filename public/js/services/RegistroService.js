angular.module('timelin')

.factory('RegistroService', function($resource, env) {
    return $resource(env.BASE_API + '/users');
});
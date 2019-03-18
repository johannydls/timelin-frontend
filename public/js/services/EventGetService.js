angular.module('timelin')

.factory('EventGetService', function($resource, env) {
    return $resource(env.BASE_API + '/events/:idUser');
});
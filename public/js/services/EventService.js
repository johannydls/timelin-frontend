angular.module('timelin')

.factory('EventService', function($resource, env) {
    return $resource(env.BASE_API + '/events/:idUser');
});
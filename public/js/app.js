const app = angular.module('timelin', 
    [
     'ngMaterial',
     'ngRoute',
     'ngResource',
     'ngMessages',
     'ngStorage',
     'ngAnimate',
     'ngSanitize'
 
    ]
);

app.constant('env', {
    BASE_API_LOCAL: 'http://localhost:3005',
    BASE_API_REMOTE: 'https://timelin-backend.herokuapp.com'
});

app.config(($routeProvider) => {
    $routeProvider
        .when('/login', {
            templateUrl: 'public/js/views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/registro', {
            templateUrl: 'public/js/views/registro.html',
            controller: 'RegistroCtrl'
        })
        .when('/users', {
            templateUrl: 'public/js/views/users.html',
            controller: 'UsersCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        })
})
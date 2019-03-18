
const app = angular.module('timelin', 
    [
     'ngMaterial',
     'ngRoute',
     'ngResource',
     'ngMessages',
     'ngStorage',
     'ngAnimate',
     'ngSanitize',
     'material.components.expansionPanels',
     'colorpicker',
     '720kb.datepicker'
    ]
);

app.constant('env', {
    //BASE_API: 'http://localhost:3005',
    BASE_API: 'https://timelin-backend.herokuapp.com'
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
        .when('/home', {
            templateUrl: 'public/js/views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/sobre', {
            templateUrl: 'public/js/views/sobre.html'
        })
        .otherwise({
            redirectTo: '/login'
        })
});

app.run(function($rootScope, $route, $localStorage, $location) {

    $rootScope.userLogin = $localStorage.userLogin || null;

    const rotasBloqueadasNaoLogado = ['/home'];
    const rotasBloqueadasLogado = ['/login', '/registro'];

    $rootScope.$on('$locationChangeStart', function() {

        //Bloqueio para usuário não logado
        if ($rootScope.userLogin == null &&
            rotasBloqueadasNaoLogado.indexOf($location.path()) != -1) {
                $location.path('/login');
        }

        //Bloqueio para usuário logado
        if ($rootScope.userLogin != null &&
            rotasBloqueadasLogado.indexOf($location.path()) != -1) {
                $location.path('/home');
        }
    })
})

app.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
      return date ? moment(date).format('L') : '';
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'L', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };
})

app.controller("DateCtrl", function($log) {
    this.myDate = new Date();

    this.onDateChanged = function() {
      $log.log('Updated Date: ', this.myDate);
    };
  });
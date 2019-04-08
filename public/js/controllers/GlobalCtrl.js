angular.module('timelin')

.controller('GlobalCtrl', function ($rootScope, $localStorage, $location) {

    $rootScope.logout = function() {
        $rootScope.userLogin = null;
        $localStorage.userLogin = null;
        delete $rootScope.userLogin;
        delete $localStorage.userLogin;
        $location.path('/login');
    }

});
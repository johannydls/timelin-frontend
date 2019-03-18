angular.module('timelin')

.controller('LoginCtrl', function ($scope, $rootScope, LoginService, $localStorage, $location) {
    $scope.loginService = new LoginService();

    $scope.login = function() {

        $scope.loginService.$save()
            .then((res) => {
                if ($scope.frm.$valid) {
                    console.log("Logado com sucesso");
                    $location.path('/home');
                    $localStorage.userLogin = res.data.user[0];
                    $localStorage.userLogin.token = res.data.token;

                    $rootScope.userLogin = res.data.user[0];
                    $rootScope.userLogin.token = res.data.token;
                }
            })
            .catch((error) => {
                alert("Não foi possível fazer o login");
                console.log(error);
            })
    };

    $rootScope.logout = function() {
        delete $localStorage.userLogin;
        delete $rootScope.userLogin;
        $location.path('/login');
        console.log("LocalStorage limpo. Logout")
    }
});
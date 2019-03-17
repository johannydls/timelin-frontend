angular.module('timelin')

.controller('UsersCtrl', function ($scope, UsersService) {
    $scope.teste = 'teste';

    $scope.users = [];

    const listUsers = () => {
        UsersService.query((users) => {
            $scope.users = users;
        }, 
        (erro) => {
            console.log("Não foi possível obter a lista de usuários");
            console.log(erro);
        });
    };

    listUsers();
});
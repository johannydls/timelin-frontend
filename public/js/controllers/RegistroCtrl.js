angular.module('timelin')

.controller('RegistroCtrl', function ($scope, RegistroService, $location ) {
    
    $scope.registro = new RegistroService();

    $scope.cadastrar = () => {

        $scope.registro.$save() 
        .then(() => {
            
            if ($scope.frm.$valid) {
                console.log("Usuário cadastrado com sucesso!");
                $location.path('/login');
            }
        })
        .catch((erro) => {
            console.log("Não foi possível cadastrar!");
            console.log(erro);
        })
    }

});
angular.module('timelin')

.controller('ContaCtrl', function ($scope, $localStorage, EventGetService) {

    $scope.user = $localStorage.userLogin;

    $scope.eventSize = 0;

    EventGetService.query({idUser: $scope.user.id}, (events) => {
        $scope.eventSize = events.length;
    },
    (erro) => {
        console.log("Não foi possível obter a lista de eventos.");
        console.log(erro);
    });

});
angular.module('timelin')

.controller('HomeCtrl', function ($scope, EventService, $localStorage, $mdDialog, $log) {

    $scope.userLogin = $localStorage.userLogin;

    $scope.eventService = new EventService();

    $scope.cores = ["#C62828","#1565C0","#388E3C","#558B2F","#FFFF00","#FF4081","#7B1FA2","#7C4DFF","#795548","#EF6C00"];

    $scope.eventos = [];
    const listarEventos = () => {
        EventService.query({idUser: $scope.userLogin.id}, (events) => {
            $scope.eventos = events;
        },
        (erro) => {
            console.log("Não foi possível obter a lista de eventos.");
            console.log(erro);
        });
    };

    listarEventos();

    $scope.addAcontecimento = () => {
        $scope.eventService.idUser = $scope.userLogin.id;
        $scope.eventService.date = new Date($scope.myDate);

        $scope.eventService.$save()
        .then(() => {
            if ($scope.frmEvent.$valid) {
                listarEventos();
                console.log("Evento criado!");
                $('#addEvento').modal('hide');
            }
            delete $scope.eventService.title;
            delete $scope.eventService.description;
            delete $scope.myDate;
            delete $scope.eventService.color;

        })
        .catch((erro) => {
            console.log("Não foi possível criar um acontecimento.");
            console.log(erro);
        });
        listarEventos();
    };

    $scope.showDialogAddEvent = (ev) => {
        $mdDialog.show({
            controller: 'HomeCtrl',
            templateUrl: '/public/js/views/evento.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            onComplete: listarEventos()
            
        });
    }

    $scope.hide = function() {
        $mdDialog.hide();
        listarEventos();
    };
  
    $scope.cancel = function() {
        $mdDialog.cancel();
        listarEventos();
    };
});
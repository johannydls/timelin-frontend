angular.module('timelin')

.controller('HomeCtrl', function ($scope, EventGetService, $localStorage, $mdDialog, EventDeleteService, EventPostService) {

    $scope.userLogin = $localStorage.userLogin;

    $scope.eventGetService = new EventGetService();
    $scope.eventPostService = new EventPostService();
    $scope.eventDeleteService = new EventDeleteService();

    $scope.eventos = [];
    const listarEventos = () => {
        EventGetService.query({idUser: $scope.userLogin.id}, (events) => {
            $scope.eventos = events;
        },
        (erro) => {
            console.log("Não foi possível obter a lista de eventos.");
            console.log(erro);
        });
    };

    listarEventos();

    $scope.addAcontecimento = () => {

        $scope.eventPostService.idUser = $scope.userLogin.id;
        $scope.eventPostService.color = $scope.color;
        $scope.eventPostService.date = $scope.myDate;
        
        $scope.eventPostService.$save()
        .then((event) => {
            if ($scope.frmEvent.$valid) {
                listarEventos();

                
                console.log("Evento criado!");
                console.log(event)
                $('#addEvento').modal('hide');
                $scope.eventPostService = new EventPostService();
                delete $scope.myDate;
            }

            
            
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
    };
  
    $scope.cancel = function() {
        $mdDialog.cancel();
    }; 
});
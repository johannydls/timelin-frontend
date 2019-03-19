angular.module('timelin')

.controller('HomeCtrl', function ($scope, EventGetService, $localStorage, $mdDialog, EventDeleteService, EventPostService) {

    $scope.userLogin = $localStorage.userLogin;

    $scope.eventGetService = new EventGetService();
    $scope.eventPostService = new EventPostService();
    $scope.eventDeleteService = new EventDeleteService();

    $scope.eventoSelecionado = null;

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

            else {
                console.log("Preencha todos os campos!");
            }

            
            
        })
        .catch((erro) => {
            console.log("Não foi possível criar um acontecimento.");
            console.log(erro);
        });
        
        listarEventos();
    };

    $scope.removeAcontecimento = (idEvent) => {
        EventDeleteService.delete({id: idEvent}, () => {
            listarEventos();
            $mdDialog.cancel();
            console.log("Evento removido!");
        }, (erro) => {
            console.log("Não foi possível remover o evento");
            console.log(erro);
        });
    };

    $scope.selecionaEvento = (evento) => {
        $scope.eventoSelecionado = evento;
    };

    $scope.showDialogEditEvent = (ev) => {
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

    $scope.showConfirmRemove = function(ev, evt) {
        $scope.eventoSelecionado = evt;

        var confirm = $mdDialog.confirm()
              .title('Você deseja remover o evento')
              .htmlContent(`
              <br><h3>${$scope.eventoSelecionado.title}</h3><br>`)
              .ariaLabel('Remover evento')
              .targetEvent(ev)
              .ok('Sim, desejo remover')
              .cancel('Cancelar');
    
        $mdDialog.show(confirm).then(function() {
          $scope.removeAcontecimento($scope.eventoSelecionado.id);
        }, function() {
          console.log("Evento removido!");
        });
      };
});
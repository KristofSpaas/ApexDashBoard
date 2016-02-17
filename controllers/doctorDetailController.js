// doctorDetailController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('doctorDetailController', doctorDetailController);

    // 2. Factory injecteren
    doctorDetailController.$inject = ['apexFactory', '$location', '$cookies', '$routeParams', '$window'];
    function doctorDetailController(apexFactory, $location, $cookies, $routeParams, $window) {
        var vm = this,
            id = $routeParams.id;

        vm.getDoctor = function () {
            apexFactory.getDoctor(id)
                .success(function (returnJson) {
                    vm.Doctor = returnJson;
                })
                .error(function () {
                });
        };

        vm.setTeVerwijderenDoctor = function (index) {
            vm.index = index;
        };

        vm.deleteDoctor = function () {
            apexFactory.deleteDoctor(vm.Doctor.DoctorId)
                .success(function () {
                    $location.url('/dokters');
                    $window.location.reload();
                })
                .error(function () {

                });
        };

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(true);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getDoctor();
    }
})();

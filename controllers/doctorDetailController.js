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

        // Gets doctor by DoctorId
        vm.getDoctor = function () {
            apexFactory.getDoctor(id)
                .success(function (returnJson) {
                    vm.Doctor = returnJson;
                })
                .error(function () {
                });
        };

        // Sets the doctor that will be deleted
        vm.setTeVerwijderenDoctor = function (index) {
            vm.index = index;
        };

        // Deletes a doctor
        vm.deleteDoctor = function () {
            apexFactory.deleteDoctor(vm.Doctor.DoctorId)
                .success(function () {
                    $location.url('/dokters');
                    $window.location.reload();
                })
                .error(function () {

                });
        };

        // Method for logging out
        vm.logOut = function () {
            apexFactory.logOut();
        };

        // Check if user is logged in, if not redirect to login page
        apexFactory.checkIfLoggedIn(true);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getDoctor();
    }
})();

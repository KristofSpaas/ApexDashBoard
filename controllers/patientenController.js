// patientenController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('patientenController', patientenController);

    // 2. Factory injecteren
    patientenController.$inject = ['apexFactory', '$location', '$cookies'];
    function patientenController(apexFactory, $location, $cookies) {
        var vm = this;

        vm.getPatienten = function () {
            apexFactory.getPatientenByDoctorId()
                .success(function (returnJson) {
                    vm.Patienten = returnJson;
                })
                .error(function () {

                });
        };

        vm.setTeVerwijderenPatient = function (patient) {
            vm.teVerwijderenPatient = patient;
        };

        vm.deletePatient = function () {
            apexFactory.deletePatient(vm.teVerwijderenPatient.PatientId)
                .success(function () {
                    vm.Patienten.splice(vm.Patienten.indexOf(vm.teVerwijderenPatient), 1);
                })
                .error(function () {
                });
        };

        vm.goToAddPatientView = function () {
            $location.url('/addPatient');
        };

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getPatienten();
    }
})();

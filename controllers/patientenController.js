// patientenController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('patientenController', patientenController);

    // 2. Inject dependencies
    patientenController.$inject = ['apexFactory', '$location'];
    function patientenController(apexFactory, $location) {
        var vm = this;

        // Gets patients by DoctorId
        vm.getPatienten = function () {
            apexFactory.getPatientenByDoctorId()
                .success(function (returnJson) {
                    vm.Patienten = returnJson;
                })
                .error(function () {

                });
        };

        // Sets the patient that will be deleted
        vm.setTeVerwijderenPatient = function (patient) {
            vm.teVerwijderenPatient = patient;
        };

        // Deletes a patient
        vm.deletePatient = function () {
            apexFactory.deletePatient(vm.teVerwijderenPatient.PatientId)
                .success(function () {
                    vm.Patienten.splice(vm.Patienten.indexOf(vm.teVerwijderenPatient), 1);
                })
                .error(function () {
                });
        };

        // Method to go to the addPatientView
        vm.goToAddPatientView = function () {
            $location.url('/addPatient');
        };

        // Method for logging out
        vm.logOut = function () {
            apexFactory.logOut();
        };

        // Check if user is logged in, if not redirect to login page
        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getPatienten();
    }
})();

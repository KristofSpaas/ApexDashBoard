// doctorsController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('doctorsController', doctorsController);

    // 2. Inject dependencies
    doctorsController.$inject = ['apexFactory', '$location'];
    function doctorsController(apexFactory, $location) {
        var vm = this;

        // Gets all doctors
        vm.getDoctors = function () {
            apexFactory.getDoctors()
                .success(function (returnJson) {
                    vm.Doctors = returnJson;
                })
                .error(function () {
                });
        };

        // Sets the doctor that will be deleted
        vm.setTeVerwijderenDoctor = function (doctor) {
            vm.teVerwijderenDoctor = doctor;
        };

        // Deletes a doctor
        vm.deleteDoctor = function () {
            apexFactory.deleteDoctor(vm.teVerwijderenDoctor.DoctorId)
                .success(function () {
                    vm.Doctors.splice(vm.Doctors.indexOf(vm.teVerwijderenDoctor), 1);
                })
                .error(function () {

                });
        };

        // Method to go to the addDoctorView
        vm.goToAddDoctorView = function () {
            $location.url('/addDoctor');
        };

        // Method to go to the doctorDetailView
        vm.goToDoctorDetailView = function () {
            $location.url('/doctorDetail');
        };

        // Method for logging out
        vm.logOut = function () {
            apexFactory.logOut();
        };

        // Check if user is logged in, if not redirect to login page
        apexFactory.checkIfLoggedIn(true);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getDoctors();
    }
})();

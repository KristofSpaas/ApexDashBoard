// doctorsController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('doctorsController', doctorsController);

    // 2. Factory injecteren
    doctorsController.$inject = ['apexFactory', '$location', '$cookies'];
    function doctorsController(apexFactory, $location, $cookies) {
        var vm = this;

        vm.getDoctors = function () {
            apexFactory.getDoctors()
                .success(function (returnJson) {
                    vm.Doctors = returnJson;
                })
                .error(function () {
                });
        };

        vm.setTeVerwijderenDoctor = function (doctor, index) {
            vm.teVerwijderenDoctor = doctor;
            vm.index = index;
        };

        vm.deleteDoctor = function () {
            apexFactory.deleteDoctor(vm.teVerwijderenDoctor.DoctorId)
                .success(function () {
                    vm.Doctors.splice(vm.index, 1);
                })
                .error(function () {

                });
        };

        vm.goToAddDoctorView = function () {
            $location.url('/addDoctor');
        };

        vm.goToDoctorDetailView = function () {
            $location.url('/doctorDetail');
        };

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(true);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getDoctors();
    }
})();

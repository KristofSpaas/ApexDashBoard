// doctorsController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('doctorsController', doctorsController);

    // 2. Factory injecteren
    doctorsController.$inject = ['apexFactory', '$location'];
    function doctorsController(apexFactory, $location) {
        var vm = this;

        vm.getDoctors = function () {
            apexFactory.getDoctors()
                .success(function (returnJson) {
                    vm.Doctors = returnJson;
                })
                .error(function () {
                });
        };

        vm.setTeVerwijderenDoctor = function (doctor) {
            vm.teVerwijderenDoctor = doctor;
        };

        vm.deleteDoctor = function () {
            apexFactory.deleteDoctor(vm.teVerwijderenDoctor.DoctorId)
                .success(function () {
                    vm.Doctors.splice(vm.Doctors.indexOf(vm.teVerwijderenDoctor), 1);
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

// editDoctorController.js
(function () {
    angular.module('myApp')
        .controller('editDoctorController', editDoctorController);

    editDoctorController.$inject = ['apexFactory', '$location', '$cookies', '$routeParams'];
    function editDoctorController(apexFactory, $location, $cookies, $routeParams) {
        var vm = this,
            id = $routeParams.id;

        vm.showAlert = false;

        // Get doctor by id
        vm.getDoctor = function () {
            apexFactory.getDoctor(id)
                .success(function (returnJson) {
                    vm.Doctor = returnJson;
                })
                .error(function () {
                });
        };

        vm.editDoctor = function (isValid) {
            // check to make sure the form is completely valid
            if (isValid) {
                var newDoctor = 'doctorid=' + id + '&email=' + vm.editableDoctor.email + '&firstname='
                    + vm.editableDoctor.firstname + '&lastname=' + vm.editableDoctor.lastname;

                apexFactory.editDoctor(id, newDoctor)
                    .success(function () {
                        $location.url('/doctorDetail/' + id);
                    })
                    .error(function () {
                        vm.showAlert = true;
                    });
            }
        };

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(true);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getDoctor();
    }
})();

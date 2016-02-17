// profielController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('profielController', profielController);

    // 2. Factory injecteren
    profielController.$inject = ['apexFactory', '$location', '$cookies'];
    function profielController(apexFactory, $location, $cookies) {
        var vm = this;

        vm.getDoctor = function () {
            var id = $cookies.get('doctorId');
            apexFactory.getDoctor(id)
                .success(function (returnJson) {
                    vm.Doctor = returnJson;
                })
                .error(function () {

                });
        };

        vm.getAdminEmail = function () {
            apexFactory.getAdminEmail()
                .success(function (returnJson) {
                    vm.adminEmail = returnJson;
                })
                .error(function () {

                });
        };

        vm.logOut = function () {
            apexFactory.logOut()
        };


        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getDoctor();

        vm.getAdminEmail();
    }
})();

// profielController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('profielController', profielController);

    // 2. Inject dependencies
    profielController.$inject = ['apexFactory', '$location', '$cookies'];
    function profielController(apexFactory, $location, $cookies) {
        var vm = this;

        // Gets the current logged in doctor
        vm.getDoctor = function () {
            var id = $cookies.get('doctorId');
            apexFactory.getDoctor(id)
                .success(function (returnJson) {
                    vm.Doctor = returnJson;
                })
                .error(function () {

                });
        };

        // Gets the email of the admin account
        vm.getAdminEmail = function () {
            apexFactory.getAdminEmail()
                .success(function (returnJson) {
                    vm.adminEmail = returnJson;
                })
                .error(function () {

                });
        };

        // Method for logging out
        vm.logOut = function () {
            apexFactory.logOut();
        };

        // Check if user is logged in, if not redirect to login page
        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getDoctor();

        vm.getAdminEmail();
    }
})();

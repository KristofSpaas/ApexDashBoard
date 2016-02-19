// adviezenController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('adviezenController', adviezenController);

    // 2. Factory injecteren
    adviezenController.$inject = ['apexFactory'];
    function adviezenController(apexFactory) {
        var vm = this;

        // Gets Patients by DoctorId
        vm.getPatienten = function () {
            apexFactory.getPatientenByDoctorId()
                .success(function (returnJson) {
                    vm.Patienten = returnJson;
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

        vm.getPatienten();

        vm.isAdmin = apexFactory.checkIfAdmin();
    }
})();

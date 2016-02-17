// adviezenController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('adviezenController', adviezenController);

    // 2. Factory injecteren
    adviezenController.$inject = ['apexFactory', '$location', '$cookies'];
    function adviezenController(apexFactory, $location, $cookies) {
        var vm = this;

        vm.getPatienten = function () {
            apexFactory.getPatientenByDoctorId()
                .success(function (returnJson) {
                    vm.Patienten = returnJson;
                })
                .error(function () {
                });
        };

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(false);

        vm.getPatienten();

        vm.isAdmin = apexFactory.checkIfAdmin();
    }
})();

// showAdviezenController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('showAdviezenController', showAdviezenController);

    // 2. Inject dependencies
    showAdviezenController.$inject = ['apexFactory', '$location', '$cookies', '$routeParams'];
    function showAdviezenController(apexFactory, $location, $cookies, $routeParams) {
        var vm = this,
            id = $routeParams.id;

        // Gets a patient by patientId
        vm.getPatient = function () {
            apexFactory.getPatient(id)
                .success(function (returnJson) {
                    vm.Patient = returnJson;
                })
                .error(function () {

                });
        };

        // Gets advices of a patient
        vm.getAdvices = function () {
            apexFactory.getAdvices(id)
                .success(function (returnJson) {
                    vm.Advices = returnJson;
                })
                .error(function () {

                });
        };

        // Sets the advice that will be deleted
        vm.setTeVerwijderenAdvies = function (advice, index) {
            vm.teVerwijderenAdvies = advice;
            vm.index = index;
        };

        // Deletes an advice
        vm.deleteAdvice = function () {
            apexFactory.deleteAdvice(vm.teVerwijderenAdvies.AdviceId)
                .success(function () {
                    vm.Advices.splice(vm.index, 1);
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

        vm.getPatient();

        vm.getAdvices();
    }
})();

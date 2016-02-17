// showAdviezenController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('showAdviezenController', showAdviezenController);

    // 2. Factory injecteren
    showAdviezenController.$inject = ['apexFactory', '$location', '$cookies', '$routeParams'];
    function showAdviezenController(apexFactory, $location, $cookies, $routeParams) {
        var vm = this,
            id = $routeParams.id;

        vm.getPatient = function () {
            apexFactory.getPatient(id)
                .success(function (returnJson) {
                    vm.Patient = returnJson;
                })
                .error(function () {

                });
        };

        vm.getAdvices = function () {
            apexFactory.getAdvices(id)
                .success(function (returnJson) {
                    vm.Advices = returnJson;
                })
                .error(function () {

                });
        };

        vm.setTeVerwijderenAdvies = function (advice, index) {
            vm.teVerwijderenAdvies = advice;
            vm.index = index;
        };

        vm.deleteAdvice = function () {
            apexFactory.deleteAdvice(vm.teVerwijderenAdvies.AdviceId)
                .success(function () {
                    vm.Advices.splice(vm.index, 1);
                })
                .error(function () {

                });
        };

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getPatient();

        vm.getAdvices();
    }
})();

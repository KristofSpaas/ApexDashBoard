// addAdviesController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('addAdviesController', addAdviesController);

    // 2. Inject dependencies
    addAdviesController.$inject = ['apexFactory', '$location', '$cookies', '$routeParams'];
    function addAdviesController(apexFactory, $location, $cookies, $routeParams) {
        var vm = this,
            id = $routeParams.id;
        vm.showAlert = false;
        vm.err = "";

        // Get patient by ID
        vm.getPatient = function () {
            apexFactory.getPatient(id)
                .success(function (returnJson) {
                    vm.Patient = returnJson;
                })
                .error(function (err) {
                    vm.err  = JSON.stringify(err.message);
                    vm.showAlert = true;
                });
        };

        // Adds an advice
        vm.addAdvice = function (isValid) {
            if (isValid) {
                var advies = 'advicetitle=' + vm.advice.title + '&advicecontent=' + vm.advice.content +
                    '&advicecategory=' + vm.advice.category + '&patientId=' + id;

                apexFactory.addAdvice(advies)
                    .success(function () {
                        $location.url('/adviezen/' + id);
                    })
                    .error(function () {

                    });
            }
        };

        // Method for logging out
        vm.logOut = function () {
            apexFactory.logOut();
        };

        // Check if user is logged in, if not redirect to login page
        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getPatient();
    }
})();

// forgotPasswordController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('forgotPasswordController', forgotPasswordController);

    // 2. Inject dependencies
    forgotPasswordController.$inject = ['apexFactory', '$location'];

    function forgotPasswordController(apexFactory, $location) {
        var vm = this;

        // Sends an email to the backend containing a request to change password
        vm.sendEmailToBackend = function (isValid) {
            if (isValid) {
                apexFactory.forgotPassword(vm.email)
                    .success(function () {
                        $location.url('/passwordSent');
                    })
                    .error(function () {
                    });
            }
        };
    }
})();

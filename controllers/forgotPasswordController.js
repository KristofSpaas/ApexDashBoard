// forgotPasswordController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('forgotPasswordController', forgotPasswordController);

    // 2. Factory injecteren
    forgotPasswordController.$inject = ['apexFactory', '$location'];

    function forgotPasswordController(apexFactory, $location) {
        var vm = this;

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

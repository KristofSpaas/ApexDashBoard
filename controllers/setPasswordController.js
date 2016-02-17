// setPasswordController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('setPasswordController', setPasswordController);

    // 2. Factory injecteren
    setPasswordController.$inject = ['apexFactory', '$location'];

    function setPasswordController(apexFactory, $location) {
        var vm = this;

        vm.setPassword = function (isValid) {
            if (isValid) {
                var data = 'email=' + vm.email + '&token=' + vm.token + '&newpassword=' + vm.newPassword + '&confirmpassword='
                    + vm.confirmPassword;

                apexFactory.setPassword(data, vm.token)
                    .success(function () {
                        $location.url('/passwordIsSet');
                    })
                    .error(function () {
                    });
            }
        };
    }
})();

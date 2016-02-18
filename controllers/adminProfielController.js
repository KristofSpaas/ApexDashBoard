// adminProfielController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('adminProfielController', adminProfielController);

    // 2. Factory injecteren
    adminProfielController.$inject = ['apexFactory', '$location'];
    function adminProfielController(apexFactory, $location) {
        var vm = this;

        vm.showAlert = false;
        vm.showSucces = false;

        vm.editAdminEmail = function (isValid) {
            // check to make sure the form is completely valid
            if (isValid) {
                var data = 'email=' + vm.newAdminEmail;

                apexFactory.editAdminEmail(data)
                    .success(function () {
                        vm.showSucces = true;
                    })
                    .error(function () {
                        vm.showAlert = true;
                    });
            }
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

        apexFactory.checkIfLoggedIn(true);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getAdminEmail();
    }
})();

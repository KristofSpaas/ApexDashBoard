// adminProfielController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('adminProfielController', adminProfielController);

    // 2. Factory injecteren
    adminProfielController.$inject = ['apexFactory'];
    function adminProfielController(apexFactory) {
        var vm = this;

        vm.showAlert = false;
        vm.showSucces = false;

        // Edits the email of the admin account
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
        apexFactory.checkIfLoggedIn(true);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getAdminEmail();
    }
})();

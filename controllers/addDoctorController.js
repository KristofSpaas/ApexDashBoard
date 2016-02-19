// addDoctorController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('addDoctorController', addDoctorController);

    // 2. Inject dependencies
    addDoctorController.$inject = ['apexFactory', '$location'];
    function addDoctorController(apexFactory, $location) {
        var vm = this;
        vm.showAlert = false;

        // Adds a doctor
        vm.addDoctor = function (isValid) {
            if (isValid) {
                var newDoctor = 'email=' + vm.doctor.email + '&firstname='
                    + vm.doctor.firstname + '&lastname=' + vm.doctor.lastname
                    + '&password=' + vm.doctor.password +
                    '&confirmpassword=' + vm.doctor.confirmPassword;

                apexFactory.addDoctor(newDoctor)
                    .success(function () {
                        $location.url('/dokters');
                    })
                    .error(function (err) {
                        var string = JSON.stringify(err);

                        if (string.indexOf("Confirm") > -1) {
                            vm.alert = "Het wachtwoord en het bevestig wachtwoord komen niet overeen.";
                        } else if (string.indexOf("Password") > -1) {
                            vm.alert = "Het wachtwoord moet minstens 6 karakters lang zijn en een hoofdletter en een cijfer bevatten.";
                        } else {
                            vm.alert = "Dit e-mailadres is al in gebruik.";
                        }

                        vm.showAlert = true;
                    });
            }
        };

        // Method for logging out
        vm.logOut = function () {
            apexFactory.logOut();
        };

        // Check if user is logged in, if not redirect to login page
        apexFactory.checkIfLoggedIn(true);

        vm.isAdmin = apexFactory.checkIfAdmin();
    }
})();

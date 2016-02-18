// addDoctorController.js
(function () {
    angular.module('myApp')
        .controller('addDoctorController', addDoctorController);

    addDoctorController.$inject = ['apexFactory', '$location'];
    function addDoctorController(apexFactory, $location) {
        var vm = this;
        vm.showAlert = false;

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

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(true);

        vm.isAdmin = apexFactory.checkIfAdmin();
    }
})();

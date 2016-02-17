// addPatientController.js
(function () {
    angular.module('myApp')
        .controller('addPatientController', addPatientController);

    addPatientController.$inject = ['apexFactory', '$location', '$cookies'];
    function addPatientController(apexFactory, $location, $cookies) {
        var vm = this;

        vm.showAlert = false;

        vm.addPatient = function (isValid) {
            if (isValid) {
                var newPatient = 'patientusername=' + vm.patient.username + '&password=' + vm.patient.password +
                    '&confirmpassword=' + vm.patient.confirmPassword + '&doctorid=' + $cookies.get('doctorId');

                apexFactory.addPatient(newPatient)
                    .success(function () {
                        $location.url('/patienten');
                    })
                    .error(function (err) {
                        var string = JSON.stringify(err);

                        if (string.indexOf("Confirm") > -1) {
                            vm.alert = "Het wachtwoord en het bevestig wachtwoord komen niet overeen."
                        } else if (string.indexOf("Password") > -1) {
                            vm.alert = "Het wachtwoord moet minstens 6 karakters lang zijn en een hoofdletter en een cijfer bevatten.";
                        } else {
                            vm.alert = "Deze gebruikersnaam is al in gebruik."
                        }

                        vm.showAlert = true;
                    });
            }
        };

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();
    }
})();

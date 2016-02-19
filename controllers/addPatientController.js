// addPatientController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('addPatientController', addPatientController);

    // 2. Inject dependencies
    addPatientController.$inject = ['apexFactory', '$location', '$cookies'];
    function addPatientController(apexFactory, $location, $cookies) {
        var vm = this;

        vm.showAlert = false;

        // Adds a patient
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
                            vm.alert = "Het wachtwoord en het bevestig wachtwoord komen niet overeen.";
                        } else if (string.indexOf("Password") > -1) {
                            vm.alert = "Het wachtwoord moet minstens 6 karakters lang zijn en een hoofdletter en een cijfer bevatten.";
                        } else {
                            vm.alert = "Deze gebruikersnaam is al in gebruik.";
                        }

                        vm.showAlert = true;
                    });
            }
        };

        // Check if user is logged in, if not redirect to login page
        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        // Method for logging out
        vm.logOut = function () {
            apexFactory.logOut();
        };
    }
})();

// setPasswordController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('setPasswordController', setPasswordController);

    // 2. Factory injecteren
    setPasswordController.$inject = ['apexFactory', '$location'];

    function setPasswordController(apexFactory, $location) {
        var vm = this;

        vm.showAlert = false;

        vm.setPassword = function (isValid) {
            if (isValid) {
                var data = 'email=' + vm.email + '&token=' + vm.token + '&newpassword=' + vm.newPassword + '&confirmpassword='
                    + vm.confirmPassword;

                apexFactory.setPassword(data, vm.token)
                    .success(function () {
                        $location.url('/passwordIsSet');
                    })
                    .error(function (err) {
                        var string = JSON.stringify(err);

                        if (string.indexOf("Confirm") > -1) {
                            vm.alert = "Het wachtwoord en het bevestig wachtwoord komen niet overeen."
                        } else if (string.indexOf("Password") > -1) {
                            vm.alert = "Het wachtwoord moet minstens 6 karakters lang zijn en een hoofdletter en een cijfer bevatten.";
                        } else if (string.indexOf("email") > -1) {
                            vm.alert = "Er is geen gebruiker met dit e-mailadres.";
                        } else {
                            vm.alert = "Token of wachtwoord is niet juist. Het wachtwoord moet minstens 6 karakters lang zijn en een hoofdletter en een cijfer bevatten."
                        }

                        alert(string);

                        vm.showAlert = true;
                    });
            }
        };
    }
})();

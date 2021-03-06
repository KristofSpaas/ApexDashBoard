// homeController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('homeController', homeController);

    // 2. Factory injecteren
    homeController.$inject = ['apexFactory'];
    function homeController(apexFactory) {
        var vm = this;

        vm.hasNewMessages = false;
        vm.countNewMessages = 0;

        // Gets patients by DoctorId
        vm.getPatienten = function () {
            apexFactory.getPatientenByDoctorId()
                .success(function (returnJson) {
                    vm.Patienten = returnJson;

                    for (var i = 0; i < vm.Patienten.length; i++) {
                        vm.getNewMessages(vm.Patienten[i].PatientId);
                    }
                })
                .error(function () {

                });
        };

        // Gets all new messages of the doctor
        vm.getNewMessages = function (id) {
            apexFactory.getNewMessages(id)
                .success(function (returnJson) {
                    if (returnJson.length !== 0) {
                        vm.countNewMessages++;
                        vm.hasNewMessages = true;
                    }
                })
                .error(function () {

                });
        };

        // Gets a patient by PatientId
        vm.getPatient = function () {
            apexFactory.getPatient(22)
                .success(function (returnJson) {
                    vm.Patient = returnJson;

                    var dateHeartRate = new Date();
                    dateHeartRate.setHours(0);
                    dateHeartRate.setMinutes(0);
                    dateHeartRate.setSeconds(0);

                    vm.getHeartRates(vm.Patient.PatientId, +new Date(dateHeartRate));
                })
                .error(function () {

                });
        };

        // Gets heart rates of patient
        vm.getHeartRates = function (id, dateMillis) {
            apexFactory.getHeartRates(id, dateMillis)
                .success(function (returnJson) {
                    var heartrates = [];

                    for (var i in returnJson) {
                        if (returnJson.hasOwnProperty(i)) {
                            var item = returnJson[i];

                            heartrates.push({
                                y: item.HeartRateInt,
                                a: item.DateMillis
                            });
                        }
                    }

                    vm.jsonStrHeartRates = JSON.stringify(heartrates);

                })
                .error(function () {

                });
        };

        // Method for logging out
        vm.logOut = function () {
            apexFactory.logOut();
        };

        // Check if user is logged in, if not redirect to login page
        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getPatienten();
        vm.getPatient();
    }
})();

// patientDetailController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('patientDetailController', patientDetailController);

    // 2. Factory injecteren
    patientDetailController.$inject = ['apexFactory', '$location', '$cookies', '$routeParams', '$window'];
    function patientDetailController(apexFactory, $location, $cookies, $routeParams, $window) {
        var vm = this,
            id = $routeParams.id;

        var months = ["Jan", "Feb", "Maart", "April", "Mei", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dec"];

        vm.getPatient = function () {
            apexFactory.getPatient(id)
                .success(function (returnJson) {
                    vm.Patient = returnJson;
                })
                .error(function () {

                });
        };

        vm.getHeartRates = function (dateMillis) {
            apexFactory.getHeartRates(id, dateMillis)
                .success(function (returnJson) {
                    vm.noHeartRateData = returnJson.length === 0;

                    var heartrates = [];

                    for (var i in returnJson) {
                        if (returnJson.hasOwnProperty(i)) {
                            var item = returnJson[i];
                            var heartRate = item.HeartRateInt;

                            heartrates.push({
                                y: heartRate,
                                a: item.DateMillis
                            });
                        }
                    }

                    vm.jsonStrHeartRates = JSON.stringify(heartrates);

                })
                .error(function () {

                });
        };

        vm.getTemperatures = function (dateMillis) {
            apexFactory.getTemperatures(id, dateMillis)
                .success(function (returnJson) {
                    vm.noTemperatureData = returnJson.length === 0;

                    var temperatures = [];

                    for (var i in returnJson) {
                        if (returnJson.hasOwnProperty(i)) {

                            var item = returnJson[i];

                            temperatures.push({
                                y: item.TemperatureFloat,
                                a: item.DateMillis
                            });
                        }
                    }

                    vm.jsonStrTemperatures = JSON.stringify(temperatures);
                })
                .error(function () {

                });
        };

        vm.getSteps = function (dateMillis) {
            apexFactory.getSteps(id, dateMillis)
                .success(function (returnJson) {
                    vm.noStepsData = returnJson.length === 0;

                    var steps = [];

                    for (var i in returnJson) {
                        if (returnJson.hasOwnProperty(i)) {
                            var item = returnJson[i];

                            var date = new Date(item.DateMillis);
                            var dateString = date.getDate() + ' ' + months[date.getMonth()];

                            steps.push({
                                y: item.StepsPerDayInt,
                                a: dateString
                            });
                        }
                    }
                    vm.jsonStrSteps = JSON.stringify(steps);
                })
                .error(function () {

                });
        };

        vm.getMoodRatings = function (dateMillis) {
            apexFactory.getMoodRatings(id, dateMillis)
                .success(function (returnJson) {
                    vm.noMoodData = returnJson.length === 0;

                    var moodRatings = [];

                    for (var i in returnJson) {
                        if (returnJson.hasOwnProperty(i)) {
                            var item = returnJson[i];

                            var date = new Date(item.DateMillis);
                            var dateString = date.getUTCDate() + ' ' + months[date.getMonth()];

                            moodRatings.push({
                                y: item.Rating,
                                a: dateString
                            });
                        }
                    }
                    vm.jsonStrRatings = JSON.stringify(moodRatings);
                })
                .error(function () {

                });
        };

        vm.dateHeartRateChanged = function () {
            var date = new Date(vm.dateHeartRate);
            vm.getHeartRates(+date);
            vm.dateStringHeartRate = date.getUTCDate() + 1 + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
        };

        vm.dateTemperatureChanged = function () {
            var date = new Date(vm.dateTemperature);
            vm.getTemperatures(+date);
            vm.dateStringTemperature = date.getUTCDate() + 1 + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
        };

        vm.dateStepsChanged = function () {
            vm.getSteps(+new Date(vm.dateSteps));
        };

        vm.dateMoodRatingsChanged = function () {
            vm.getMoodRatings(+new Date(vm.dateMoodRatings));
        };

        vm.setDefaultDates = function () {
            vm.dateHeartRate = new Date();
            vm.dateHeartRate.setHours(0);
            vm.dateHeartRate.setMinutes(0);
            vm.dateHeartRate.setSeconds(0);
            vm.dateHeartRateChanged();

            vm.dateTemperature = new Date();
            vm.dateTemperature.setHours(0);
            vm.dateTemperature.setMinutes(0);
            vm.dateTemperature.setSeconds(0);
            vm.dateTemperatureChanged();

            vm.dateSteps = new Date();
            vm.dateSteps.setMonth(vm.dateSteps.getMonth() - 1);
            vm.dateSteps.setUTCDate(vm.dateSteps.getUTCDate() + 1);
            vm.dateSteps.setHours(0);
            vm.dateSteps.setMinutes(0);
            vm.dateSteps.setSeconds(0);
            vm.dateStepsChanged();

            vm.dateMoodRatings = new Date();
            vm.dateMoodRatings.setMonth(vm.dateMoodRatings.getMonth() - 1);
            vm.dateMoodRatings.setUTCDate(vm.dateMoodRatings.getUTCDate() + 1);
            vm.dateMoodRatings.setHours(0);
            vm.dateMoodRatings.setMinutes(0);
            vm.dateMoodRatings.setSeconds(0);
            vm.dateMoodRatingsChanged();
        };

        vm.printIt = function (id) {
            var table = document.getElementById(id).innerHTML;
            var myWindow = $window.open('', '', 'width=800, height=600');
            myWindow.document.write(table);
            myWindow.print();
        };

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getPatient();

        vm.setDefaultDates();
    }
})();

// showBerichtenController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('showBerichtenController', showBerichtenController);

    // 2. Inject dependencies
    showBerichtenController.$inject = ['apexFactory', '$location', '$cookies', '$routeParams'];
    function showBerichtenController(apexFactory, $location, $cookies, $routeParams) {
        var vm = this,
            id = $routeParams.id;

        var months = ["Jan", "Feb", "Maart", "April", "Mei", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dec"];

        vm.verstuurDisabled = false;

        // Gets a patient by PatientId
        vm.getPatient = function () {
            apexFactory.getPatient(id)
                .success(function (returnJson) {
                    vm.Patient = returnJson;
                })
                .error(function () {
                });
        };

        // Gets messages of a patient
        vm.getMessages = function () {
            apexFactory.getMessages(id)
                .success(function (returnJson) {
                    vm.Messages = returnJson;

                    for (var i in vm.Messages) {
                        if (vm.Messages.hasOwnProperty(i)) {
                            var date = new Date(vm.Messages[i].DateMillis);
                            var minutes = date.getMinutes() + "";
                            var hours = date.getHours() + "";

                            if (minutes.length === 1) {
                                minutes = "0" + minutes;
                            }

                            if (hours.length === 1) {
                                hours = "0" + hours;
                            }

                            vm.Messages[i].DateMillis = date.getDate() + ' ' + months[date.getMonth()] + ' '
                                + date.getFullYear() + ' ' + hours + ':' + minutes;
                        }
                    }

                    vm.setMessagesSeen();
                })
                .error(function () {
                });
        };

        // Sends a message to a patient
        vm.sendMessage = function (isValid) {
            if (isValid) {
                vm.verstuurDisabled = true;

                var message = 'messageContent=' + vm.messageToSend + '&fromdoctor=true' +
                    '&datemillis=' + new Date().getTime() + '&patientId=' + id + '&doctorId=' + $cookies.get('doctorId')
                    + '&seen=false' + '&seenByDoctor=true';

                apexFactory.addMessage(message)
                    .success(function (returnJson) {
                        var newMessage = returnJson;
                        var date = new Date(newMessage.DateMillis);
                        var minutes = date.getMinutes() + "";
                        var hours = date.getHours() + "";

                        if (minutes.length === 1) {
                            minutes = "0" + minutes;
                        }

                        if (hours.length === 1) {
                            hours = "0" + hours;
                        }

                        newMessage.DateMillis = date.getDate() + ' ' + months[date.getMonth()] + ' '
                            + date.getFullYear() + ' ' + hours + ':' + minutes;

                        vm.Messages.push(newMessage);

                        vm.messageToSend = "";

                        vm.verstuurDisabled = false;
                    })
                    .error(function () {
                        vm.verstuurDisabled = false;
                    });
            }
        };

        // Sets the messages to seen
        vm.setMessagesSeen = function () {
            apexFactory.setMessagesSeen(id)
                .success(function () {
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

        vm.getPatient();

        vm.getMessages();
    }
})();

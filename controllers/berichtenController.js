// berichtenController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('berichtenController', berichtenController);

    // 2. Factory injecteren
    berichtenController.$inject = ['apexFactory', '$location', '$cookies'];
    function berichtenController(apexFactory, $location, $cookies) {
        var vm = this;

        var months = ["Jan", "Feb", "Maart", "April", "Mei", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dec"];

        vm.getPatienten = function () {
            apexFactory.getPatientenByDoctorId()
                .success(function (returnJson) {
                    vm.Patienten = returnJson;

                    for (var i = 0; i < vm.Patienten.length; i++) {
                        vm.getMessages(vm.Patienten[i].PatientId, i);
                        vm.getNewMessages(vm.Patienten[i].PatientId, i);
                    }
                })
                .error(function () {
                });
        };

        vm.getMessages = function (id, i) {
            apexFactory.getMessages(id)
                .success(function (returnJson) {
                    var messages = returnJson;

                    if (messages.length !== 0) {
                        var lastMessage = messages[messages.length - 1];

                        if (lastMessage.MessageContent.length > 100) {
                            lastMessage.MessageContent = lastMessage.MessageContent.substr(0, 100) + " ...";
                        }

                        var date = new Date(lastMessage.DateMillis);
                        var minutes = date.getMinutes() + "";
                        var hours = date.getHours() + "";

                        if (minutes.length === 1) {
                            minutes = "0" + minutes;
                        }

                        if (hours.length === 1) {
                            hours = "0" + hours;
                        }

                        lastMessage.DateMillis = date.getDate() + ' ' + months[date.getMonth()] + ' '
                            + date.getFullYear() + ' ' + hours + ':' + minutes;

                        vm.Patienten[i].LastMessage = lastMessage;
                    }
                })
                .error(function () {
                });
        };

        vm.getNewMessages = function (id, i) {
            apexFactory.getNewMessages(id)
                .success(function (returnJson) {
                    var newMessages = returnJson;

                    if (newMessages.length !== 0) {
                        vm.Patienten[i].hasNewMessage = true;
                        vm.Patienten[i].newMessageCount = newMessages.length;
                    }
                })
                .error(function () {

                });
        };

        vm.logOut = function () {
            apexFactory.logOut();
        };

        apexFactory.checkIfLoggedIn(false);

        vm.isAdmin = apexFactory.checkIfAdmin();

        vm.getPatienten();

    }
})();

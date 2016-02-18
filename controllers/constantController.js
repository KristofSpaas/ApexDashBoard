// constantController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('constantController', constantController);

    // 2. Globals injecteren
    constantController.$inject = ['GLOBALS'];
    function constantController(GLOBALS) {
        var vm = this;

        // Gegevens uit de constante ophalen en toekennen aan variabelen
        vm.appName = GLOBALS.appName;
        vm.appVersion = GLOBALS.appVersion;
    }
})();

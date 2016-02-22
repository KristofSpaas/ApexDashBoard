// appConstants.js
(function () {
    // Constanten in deze app
    angular.module('myApp')
        .constant('GLOBALS', {
            appName: 'Apex Web Dashboard',
            appVersion: '1.0.0',
            backendUrl: 'https://apexbackend.azurewebsites.net/'
        });
})();
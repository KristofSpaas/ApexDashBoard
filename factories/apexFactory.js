// apexFactory.js
(function () {
    // Definitie van de Factory
    angular.module('myApp')
        .factory('apexFactory', apexFactory);

    // Implementatie van Factory
    apexFactory.$inject = ['$http', 'GLOBALS', '$cookies', '$location', '$window'];
    function apexFactory($http, GLOBALS, $cookies, $location, $window) {
        var factory = {};

        factory.login = function (data) {
            return $http({
                method: 'POST',
                url: GLOBALS.backendUrl + 'token',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        factory.getPatientenByDoctorId = function () {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/patients/doctor/' + $cookies.get('doctorId'),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.getDoctors = function () {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/doctors/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.getPatient = function (id) {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/patients/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.getDoctor = function (id) {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/doctors/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.getHeartRates = function (id, dateMillis) {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/heartrates/patient/' + id + '/' + dateMillis,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.getTemperatures = function (id, dateMillis) {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/temperatures/patient/' + id + '/' + dateMillis,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.getSteps = function (id, dateMillis) {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/stepsperdays/patient/' + id + '/' + dateMillis,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.getMoodRatings = function (id, dateMillis) {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/moodratings/patient/' + id + '/' + dateMillis,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.addPatient = function (newPatient) {
            return $http({
                method: 'POST',
                url: GLOBALS.backendUrl + 'api/account/registerpatient',
                data: newPatient,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.addDoctor = function (newDoctor) {
            return $http({
                method: 'POST',
                url: GLOBALS.backendUrl + 'api/account/registerdoctor',
                data: newDoctor,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.deletePatient = function (id) {
            return $http({
                method: 'DELETE',
                url: GLOBALS.backendUrl + 'api/patients/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.deleteDoctor = function (id) {
            return $http({
                method: 'DELETE',
                url: GLOBALS.backendUrl + 'api/doctors/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.editDoctor = function (id, newDoctor) {
            return $http({
                method: 'PUT',
                url: GLOBALS.backendUrl + 'api/doctors/' + id,
                data: newDoctor,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.forgotPassword = function (email) {
            return $http({
                method: 'POST',
                url: GLOBALS.backendUrl + 'api/account/forgotpassword',
                data: 'email=' + email,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        factory.setPassword = function (data) {
            return $http({
                method: 'POST',
                url: GLOBALS.backendUrl + 'api/account/setpassword',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        factory.getAdvices = function (id) {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/advices/patient/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.addAdvice = function (advies) {
            return $http({
                method: 'POST',
                url: GLOBALS.backendUrl + 'api/advices',
                data: advies,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.deleteAdvice = function (id) {
            return $http({
                method: 'DELETE',
                url: GLOBALS.backendUrl + 'api/advices/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.getMessages = function (id) {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/messages/patient/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.addMessage = function (message) {
            return $http({
                method: 'POST',
                url: GLOBALS.backendUrl + 'api/messages',
                data: message,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.getNewMessages = function (id) {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/messages/patient/newfordoctor/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.setMessagesSeen = function (id) {
            return $http({
                method: 'POST',
                url: GLOBALS.backendUrl + 'api/messages/patient/seenByDoctor/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.checkIfAdmin = function () {
            if ($cookies.get('role') === 'Admin') {
                return true;
            }
        };

        factory.logOut = function () {
            $cookies.remove("access_token");
            $cookies.remove("userName");
            $cookies.remove("role");
            $cookies.remove("doctorId");

            $window.location.reload();
        };

        factory.checkIfLoggedIn = function (isAdminPage) {
            if ($cookies.get('access_token') === undefined) {
                $location.url('/login');
            } else if (factory.checkIfAdmin() && !isAdminPage) {
                $location.url('/dokters');
            } else if (!factory.checkIfAdmin() && isAdminPage) {
                $location.url('/');
            }
        };

        factory.getAdminEmail = function () {
            return $http({
                method: 'GET',
                url: GLOBALS.backendUrl + 'api/account/getAdminEmail',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        factory.editAdminEmail = function (data) {
            return $http({
                method: 'POST',
                url: GLOBALS.backendUrl + 'api/account/editAdminEmail',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('access_token')
                }
            });
        };

        return factory;
    }
})();

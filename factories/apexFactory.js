// apexFactory.js
(function () {
    // Definitie van de Factory
    angular.module('myApp')
        .factory('apexFactory', apexFactory);

    // Implementatie van Factory
    apexFactory.$inject = ['$http', 'GLOBALS', '$cookies', '$location', '$window'];
    function apexFactory($http, GLOBALS, $cookies, $location, $window) {
        var factory = {};

        // Logs the user in
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

        // Gets patients of a doctor
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

        // Gets all doctors
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

        // Gets a patient by PatientId
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

        // Gets a doctor by DoctorId
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

        // Gets heartRates of a patient for a certain day
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

        // Gets temperatures of a patient for a certain day
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

        // Gets steps of a patient for a certain month
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

        // Gets moodRatings of a patient for a certain month
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

        // Adds a patient
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

        // Adds a doctor
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

        // Deletes a patient
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

        // Deletes a doctor
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

        // Edits an existing doctor
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

        // Sends a mail containing a password reset request
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

        // Changes the password of a user
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

        // Gets all advices of a patient
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

        // Adds an advice
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

        // Deletes an advice
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

        // Gets all messages of a patient
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

        // adds a message
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

        // Gets all new messages for a doctor
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

        // Sets messages to seen by Doctor
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

        // Checks if the logged in user is an Admin
        factory.checkIfAdmin = function () {
            if ($cookies.get('role') === 'Admin') {
                return true;
            }
        };

        // Logs the user out
        factory.logOut = function () {
            $cookies.remove("access_token");
            $cookies.remove("userName");
            $cookies.remove("role");
            $cookies.remove("doctorId");

            $window.location.reload();
        };

        // Checks if user is logged in, if not redirect to login page
        factory.checkIfLoggedIn = function (isAdminPage) {
            if ($cookies.get('access_token') === undefined) {
                $location.url('/login');
            } else if (factory.checkIfAdmin() && !isAdminPage) {
                $location.url('/dokters');
            } else if (!factory.checkIfAdmin() && isAdminPage) {
                $location.url('/');
            }
        };

        // Gets the email of the admin account
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

        // Edits the email of the admin account
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

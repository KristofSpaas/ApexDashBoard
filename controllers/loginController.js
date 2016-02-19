// loginController.js
(function () {
    // 1. Controller toevoegen aan de module
    angular.module('myApp')
        .controller('loginController', loginController);

    // 2. Inject dependencies
    loginController.$inject = ['apexFactory', '$cookieStore', '$cookies', '$location'];

    function loginController(apexFactory, $cookieStore, $cookies, $location) {
        var vm = this;

        vm.showAlert = false;

        // Check if user is logged in, if logged in redirect to homeView
        vm.checkIfLoggedIn = function () {
            if ($cookies.get('access_token') !== undefined) {
                $location.url('/home');
            }
        };

        // Logs the user in and saves its values as cookies
        vm.login = function (isValid) {
            if (isValid) {
                var data = 'grant_type=password&username=' + vm.email + '&password=' + vm.password;

                apexFactory.login(data)
                    .success(function (returnJson) {
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 12);

                        $cookies.put('access_token', returnJson.access_token, {
                            expires: expireDate
                        });

                        $cookies.put('userName', returnJson.userName, {
                            expires: new Date(2017, 1, 1)
                        });

                        $cookies.put('role', returnJson.Role, {
                            expires: new Date(2017, 1, 1)
                        });

                        if (returnJson.Role === 'Doctor') {
                            $cookies.put('doctorId', returnJson.DoctorId, {
                                expires: new Date(2017, 1, 1)
                            });
                        } else {
                            $cookies.remove("doctorId");
                        }

                        if ($cookies.get('role') === 'Admin') {
                            $location.url('/dokters');
                        } else {
                            $location.url('/home');
                        }
                    })
                    .error(function () {
                        vm.showAlert = true;
                    });
            }
        };

        vm.checkIfLoggedIn();
    }
})();

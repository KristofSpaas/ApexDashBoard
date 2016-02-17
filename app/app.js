// app.js
(function () {

    // 1. Module definieren
    var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'angular.morris-chart', 'ngMaterial', 'luegg.directives'])
        .config(moduleConfig);

    // 2. Inject dependencies
    moduleConfig.$inject = ['$routeProvider'];

    // 3. Routes configureren
    function moduleConfig($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/forgotPassword', {
                templateUrl: 'views/forgotPassword.html',
                controller: 'forgotPasswordController',
                controllerAs: 'vm'
            })
            .when('/passwordSent', {
                templateUrl: 'views/passwordSent.html',
                controller: 'forgotPasswordController',
                controllerAs: 'vm'
            })
            .when('/setPassword', {
                templateUrl: 'views/setPassword.html',
                controller: 'setPasswordController',
                controllerAs: 'vm'
            })
            .when('/passwordIsSet', {
                templateUrl: 'views/passwordIsSet.html',
                controller: 'setPasswordController',
                controllerAs: 'vm'
            })
            .when('/patienten', {
                templateUrl: 'views/patienten.html',
                controller: 'patientenController',
                controllerAs: 'vm'
            })
            .when('/patientDetail/:id', {
                templateUrl: 'views/patientDetail.html',
                controller: 'patientDetailController',
                controllerAs: 'vm'
            })
            .when('/addPatient', {
                templateUrl: 'views/addPatient.html',
                controller: 'addPatientController',
                controllerAs: 'vm'
            })
            .when('/dokters', {
                templateUrl: 'views/dokters.html',
                controller: 'doctorsController',
                controllerAs: 'vm'
            })
            .when('/doctorDetail/:id', {
                templateUrl: 'views/doctorDetail.html',
                controller: 'doctorDetailController',
                controllerAs: 'vm'
            })
            .when('/addDoctor', {
                templateUrl: 'views/addDoctor.html',
                controller: 'addDoctorController',
                controllerAs: 'vm'
            })
            .when('/editDoctor/:id', {
                templateUrl: 'views/editDoctor.html',
                controller: 'editDoctorController',
                controllerAs: 'vm'
            })
            .when('/adviezen', {
                templateUrl: 'views/adviezen.html',
                controller: 'adviezenController',
                controllerAs: 'vm'
            })
            .when('/adviezen/:id', {
                templateUrl: 'views/showAdviezen.html',
                controller: 'showAdviezenController',
                controllerAs: 'vm'
            })
            .when('/addAdvies/:id', {
                templateUrl: 'views/addAdvies.html',
                controller: 'addAdviesController',
                controllerAs: 'vm'
            })
            .when('/berichten', {
                templateUrl: 'views/berichten.html',
                controller: 'berichtenController',
                controllerAs: 'vm'
            })
            .when('/berichten/:id', {
                templateUrl: 'views/showBerichten.html',
                controller: 'showBerichtenController',
                controllerAs: 'vm'
            })
            .when('/profiel', {
                templateUrl: 'views/profiel.html',
                controller: 'profielController',
                controllerAs: 'vm'
            })
            .when('/adminProfiel', {
                templateUrl: 'views/adminProfiel.html',
                controller: 'adminProfielController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
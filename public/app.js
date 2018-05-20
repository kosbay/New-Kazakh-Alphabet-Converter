angular.module('latyn', [
    'ui.router'
])
    .config(routeConfig);
routeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function routeConfig($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'vm'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerAs: 'vm'
        })

};
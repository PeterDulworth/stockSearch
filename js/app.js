var stockSearch = angular.module('stockSearch', ['ngRoute', 'ui.bootstrap']);

stockSearch.config(function ($routeProvider) {
    
    'use strict';
    
    $routeProvider
    
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'mainController'
        })
    
        .when('/query/:index', {
            templateUrl: 'views/query.html',
            controller: 'queryController'
        })
    
        .when('/query', {
            templateUrl: 'views/query.html',
            controller: 'queryController'
        })
    
        .when('/watchlist', {
            templateUrl: 'views/watchlist.html',
            controller: 'watchlistController'
        });
    
});

stockSearch.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = ($(window).height())/2;   // always scroll by 50 extra pixels
}]);
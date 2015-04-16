'use strict';

/**
 * @ngdoc service
 * @name d3AngularApp.FactoryChicago
 * @description
 * # FactoryChicago
 * Factory in the d3AngularApp.
 */
angular.module('d3AngularApp')
    .factory('FactoryChicago', function ($http) {
        var SERVER_ROUTE = 'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$limit=50000';
        // Public API here
        return {
            get: function () {
                return $http.get(SERVER_ROUTE);
            },
            getByYear: function (year, type) {
                return $http.get(SERVER_ROUTE + '&year=' + year + '&primary_type=' + type);
            }
        };
    });
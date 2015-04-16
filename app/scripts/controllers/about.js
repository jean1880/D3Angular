'use strict';

/**
 * @ngdoc function
 * @name d3AngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the d3AngularApp
 */
angular.module('d3AngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name d3AngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the d3AngularApp
 */
angular.module('d3AngularApp')
    .controller('MainCtrl', function ($scope, FactoryChicago, $timeout) {
        var years = ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2013", "2014"
            ];
        var margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .domain([years[0], years[years.length - 1]])
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);


        var jsonData = [];

        var maxLength = 0;

        var svg, xAxis, yAxis, line;

        var drawGraph = function () {

            var nestedData = d3.nest()
                .key(function (d) {
                    return d.year;
                }).sortKeys(d3.ascending)
                .entries(jsonData);
            // Scale the range of the data
            x.domain(d3.extent(years, function (d) {
                return d;
            }));

            y.domain([0, maxLength]);

            svg.append("path")
                .attr("class", "line")
                .attr("d", line(nestedData));


            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);
        };

        var init = function () {
            $scope.fetchData();
        }

        $scope.fetchData = function () {
            jsonData = []
            $('svg').remove();
            maxLength = 0;

            svg = d3.select("#view").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(years.length);

            yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            line = d3.svg.line()
                .x(function (d) {
                    return x(d.key);
                })
                .y(function (d) {
                    return y(d.values[0].totalCrimes);
                });

            var i;

            for (i = 0; i < years.length; i++) {
                FactoryChicago.getByYear(years[i], $scope.typeOfCrime).success(function (data) {
                    maxLength = maxLength < data.length ? data.length : maxLength;

                    // push in dataset
                    jsonData.push({
                        year: data[0].year,
                        totalCrimes: data.length
                    });
                    if (jsonData.length == years.length) {
                        drawGraph();
                    }
                });
            };
        };

        $scope.typeSelection = [
            'MOTOR VEHICLE THEFT',
            'CRIMINAL TRESPASS',
            'BATTERY',
            'CRIMINAL DAMAGE',
            'ROBBERY',
            'THEFT',
            'BURGLARY',
            'OFFENSE INVOLVING CHILDREN',
            'CRIMINAL DAMAGE',
            'NARCOTICS',
            'ASSAULT',
            'WEAPONS VIOLATION',
            'DECEPTIVE PRACTICE',
            'SEX OFFENSE',
            'ARSON',
            'PUBLIC PEACE VIOLATION',
            'OTHER OFFENSE'
        ];

        $scope.typeOfCrime = $scope.typeSelection[0];

        init();
    });
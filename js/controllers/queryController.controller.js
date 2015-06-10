angular.module('stockSearch').controller('queryController', ['$scope', '$http', '$filter', '$routeParams', '$timeout', '$compile', function ($scope, $http, $filter, $routeParams, $timeout, $compile) {
    
    'use strict';
    
    $scope.stock_query = '';
    $scope.passed_query = '';
    $scope.startDate = '';
    $scope.endDate = '';
    $scope.startYear = '';
    $scope.endYear = '';
    $scope.endMonth = '';
    $scope.endDay = '';
    $scope.loaded = false;
    $scope.dynamic = 0; // progress bar position
    $scope.max = 3; // max progress bar length
    $scope.loading = 0; // tracks loading for gif
    $scope.out = '';
    $scope.responseJSON_sum = 0;
    $scope.responseJSON_date = [];
    $scope.responseJSON_hist = [];
    $scope.year_range = [];
    $scope.zoomStart = '';
    $scope.zoomEnd = '';
    $scope.subChart = true;
    $scope.data = [];
    $scope.data[0] = ['date', 'Price'];

    $scope.formattedStockName = function () {
        return $filter('uppercase')($scope.stock_query);
    };
    
    $scope.getYear = function () {
        return $filter('date')(new Date(), 'yyyy');
    };
    
    $scope.getMonth = function () {
        return $filter('date')(new Date(), 'MM');
    };
    
    $scope.getDay = function () {
        return $filter('date')(new Date(), 'dd');
    };
    
    $scope.get_yql_query_date = function () {
        return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.stocks%20where%20symbol%3D%22' + $scope.stock_query + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    };
    
    $scope.get_yql_query_hist_start = function () {
        return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' + $scope.stock_query + '%22%20and%20startDate%20%3D%20%22' + $scope.startDate + '%22%20and%20endDate%20%3D%20%22' + $scope.startYear + '-12-31%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    };
    
    $scope.get_yql_query_hist_end = function () {
        return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' + $scope.stock_query + '%22%20and%20startDate%20%3D%20%22' + $scope.endYear + '-01-01%22%20and%20endDate%20%3D%20%22' + $scope.endYear + '-06-05%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    };
    
    $scope.checkRouteParams = function () {
        $scope.passed_query = $routeParams.index;
        console.log($scope.passed_query);
        if (typeof $scope.passed_query !== 'undefined') {
            $scope.stock_query = $scope.passed_query;
            $scope.refresh_data();
        }
    };
    
    $scope.formatDate = function (fresh_date) {
        var year, month, day;
        year = fresh_date.substr(0, 4);
        month = fresh_date.substr(5, 2);
        day = fresh_date.substr(8, 2);
        
        return year + ', ' + month + ', ' + day;
    };
    
    $scope.drawChart = function () {
        var n = 1;
        for (let j = 0; j < $scope.responseJSON_hist.length; j++) {
            $scope.data[n] = [];
            for (let k = 0; k < $scope.responseJSON_hist[j].length; k++) { 
                $scope.data[n] = [];
                $scope.data[n][0] = $scope.responseJSON_hist[j][k].Date;
                $scope.data[n][1] = $scope.responseJSON_hist[j][k].High;
                n++;
            }
        }
        
        console.log($scope.data);
        document.getElementById("chart").style.visibility = 'visible';
        $scope.chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'date',
                rows: $scope.data,
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y'
                    }
                },
                y: {
                    label: {
                        text: 'Price [USD]',
                        position: 'outer-middle'
                    }
                }
            },
            size: {
                width: 900,
                height: 500
            }, 
            interaction: {
                enabled: true
            },
            legend: {
                hide: true
            },
            point: {
                show: false
            },
            tooltip: {
                format: {
                    title: function (d) { 
                        var format_1 = d3.time.format('%b. %e, %Y'); //https://github.com/mbostock/d3/wiki/Time-Formatting
                        return format_1(d); 
                    },
                    value: function (value, ratio, id) {
                        var format = d3.format('$');
                        return format(value);
                        }
                    }
            },
            subchart: {
                show: $scope.subChart
            }
          //color: {
          //    pattern: ['#1f77b4', '#aec7e8']
          //}
        });
    };
    
    $scope.zoom = function () {
        $scope.chart.zoom.enable(true);
        $scope.chart.zoom([$scope.zoomStart, $scope.zoomEnd]);  
    };
    
    $scope.unzoom = function () {
        $scope.chart.unzoom();
        $scope.chart.zoom.enable(false);
    };
    
    $scope.repaint = function (canvas, brush) {
        document.getElementById(canvas).innerHTML = brush;
    };
    
    $scope.reset_data = function () {
        $scope.responseJSON_date = [];
        $scope.responseJSON_hist = [];
        $scope.out = '';
        $scope.dynamic = 0; // progress bar position
        $scope.max = 3; // max progress bar length
        $scope.data = [];
        $scope.data[0] = ['date', 'Price'];
        $scope.repaint('resultslist', $scope.out);
    };
    
    $scope.printResults = function () {
        var output;
        output = $compile($scope.out)($scope);
        angular.element(document.getElementById('resultslist')).append(output);
//        $scope.repaint('resultslist', $scope.out);
    };
    
    $scope.httpSuccess = function () {
        console.log($scope.responseJSON_hist);
        //$scope.printResults();
        $scope.drawChart();
//        $timeout(function () {$scope.drawChart();}, 50);

    };
    
    $scope.refresh_data = function () {
        
        $scope.reset_data();
        $scope.out = '<div class="row"><div class="col-xs-11 col-xs-offset-1"><h1 class="pink_header">' + $scope.formattedStockName() + '<div class="pull-right"><button type="submit" class="btn btn-success" ng-click="zoom()"><i class="fa fa-search-plus"></i></button>&nbsp;<button type="submit" class="btn btn-danger" ng-click="unzoom()"><i class="fa fa-search-minus"></i></button></div></h1></div></div>';
        $scope.loaded = true;
        $scope.printResults();
        $scope.loading = 3; 
        document.getElementById("chart").style.visibility = 'hidden';
        
        var get_string = '';
        var year;
        
        $http.get($scope.get_yql_query_date())
            .success(function (responseText) {
                $scope.responseJSON_date = responseText;
                $scope.startDate = $scope.responseJSON_date.query.results.stock.start;
                $scope.startYear = String($scope.startDate).substr(0, 4);
                $scope.endYear = $scope.getYear();
                $scope.endMonth = $scope.getMonth();
                $scope.endDay = $scope.getDay();
                $scope.endDate = $scope.endYear + "-" + $scope.endMonth + "-" + $scope.endDay;
                $scope.yearGap = parseInt($scope.endYear) - parseInt($scope.startYear);
                $scope.zoomStart = parseInt($scope.startYear) + parseInt((Math.round($scope.yearGap/2)));
                $scope.zoomEnd = parseInt($scope.zoomStart) + 1;
                console.log('Zoom start: ' + $scope.zoomStart + ', ' + $scope.zoomEnd);
                $scope.zoomStart = String($scope.zoomStart) + '-01-01';
                $scope.zoomEnd = String($scope.zoomEnd) + '-01-01';
                console.log('Zoom start: ' + $scope.zoomStart + ', ' + $scope.zoomEnd);
                console.log($scope.startYear);
                console.log($scope.endYear);
                console.log($scope.yearGap);
                $scope.loading += parseInt($scope.yearGap) - 1;
                console.log('loading: ' + $scope.loading);
                $scope.max += parseInt($scope.yearGap) - 1;
                console.log('Max: ' + $scope.max);
                $scope.dynamic++;
                $scope.loading--;
                
                $http.get($scope.get_yql_query_hist_start()) // parameters depend on the success of the first ajax request
                    .success(function (responseText_hist_start) {
                        $scope.responseJSON_hist[0] = responseText_hist_start.query.results.quote.reverse();
                        $scope.dynamic++;
                        $scope.loading--;
                       if($scope.loading === 0) {
                            $scope.httpSuccess();
                        }
                    })
                    .error(function (data, status) { 
                        console.log(data);
                        console.log(status);
                    }); 
                for (let i = 1; i < $scope.yearGap; i++) {
                    year = parseInt($scope.startYear) + i;
                    get_string = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' + $scope.stock_query + '%22%20and%20startDate%20%3D%20%22' + year + '-01-01%22%20and%20endDate%20%3D%20%22' + year + '-12-31%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
                    $http.get(get_string) 
                    .success(function (responseText_hist) {
                        $scope.responseJSON_hist[i] = responseText_hist.query.results.quote.reverse();
                        $scope.dynamic++;
                        $scope.loading--;
                        console.log('Loading: ' + $scope.loading);
                        if($scope.loading === 0) {
                            $scope.httpSuccess();
                        }
                    })
                    .error(function (data, status) {
                        console.log(data);
                        console.log(status);
                    }); 
                }
                $http.get($scope.get_yql_query_hist_end())
                .success(function (responseText_hist_end) {
                    $scope.responseJSON_hist[parseInt($scope.yearGap)] = responseText_hist_end.query.results.quote.reverse();
                    $scope.dynamic++;
                    $scope.loading--;
                    console.log('Loading: ' + $scope.loading);
                    if($scope.loading === 0) {
                        $scope.httpSuccess();
                    }
                })
                .error(function (data, status) {
                    console.log(data);
                    console.log(status);
                }); 
            
            })
            .error(function (data, status) {
                console.log(data);
                console.log(status);
            }); 

    };
    
}]);
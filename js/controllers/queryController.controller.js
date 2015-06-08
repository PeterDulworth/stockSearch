angular.module('stockSearch').controller('queryController', ['$scope', '$http', '$filter', '$routeParams', '$timeout', function ($scope, $http, $filter, $routeParams, $timeout) {
    
    'use strict';
    
    $scope.stock_query = '';
    $scope.passed_query = '';
    $scope.startDate = '';
    $scope.endDate = '';
    $scope.startYear = '';
    $scope.endYear = '';
    $scope.endMonth = '';
    $scope.endDay = '';
    $scope.dynamic = 0; // progress bar position
    $scope.max = 3; // max progress bar length
    $scope.loading = 0; // tracks loading for gif
    $scope.out = '';
    $scope.responseJSON_sum = 0;
    $scope.responseJSON_date = [];
    $scope.responseJSON_hist = [];
    $scope.year_range = [];

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
    
//    $scope.drawCurveTypes = function () {
//        document.getElementById("chart_div").style.visibility = 'visible';
//        $scope.data = new google.visualization.DataTable();
//        $scope.data.addColumn('date', 'X');
//        $scope.data.addColumn('number', '1');
//        $scope.data.addColumn('number', '2');
//
////        for (var j = 0; j < $scope.responseJSON_hist.length; j++) {
////            for (var k = 0; k < $scope.response[j].length; k++) {
////                $scope.data.addRow([new Date($scope.formatDate($scope.responseJSON_hist[j][k].Date)), $scope.responseJSON_hist[j][k].Adj_Close, $scope.responseJSON_hist[j][k].Low]);    
////            }
////        }
////        
////        $scope.data.addRows([
////            [new Date(2000, 1, 01), 10, 12],
////            [new Date(2000, 1, 03), 12, 14],
////            [new Date(2000, 1, 05), 14, 16]
////        ]);
//        
////        $scope.data.addRows([
////            [new Date(1977, 2, 28), 1, 1],
////            [new Date(1962, 7, 5), 1, 2],
////            [new Date(1983, 11, 17), 1, 3]
////        ]);
//
//        $scope.options = { 
////            title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
////            titleTextStyle: {
////                color: 'rgb(72,179,216)',
////                fontSize: 18,
////                bold: false
////            },
////            width: 900,
////            height: 500,
//            hAxis: {
//                format: 'MMM, \'yy',
//                gridlines: {count: 3}
//            },
////          vAxis: {
////              gridlines: {color: 'none'},
////              minValue: 0
////          },
//            legend: { position: 'bottom', alignment: 'center' },
////            series: {
////                0: {curveType: 'function'},
////                1: {curveType: 'function'}
////            },
//            colors: ['#c30d0d', 'rgb(72,179,216)']
////            trendlines: {
////                0: {
////                    type: 'linear',
////                    color: 'green',
////                    lineWidth: 3,
////                    opacity: 0.3,
////                    showR2: true,
////                    visibleInLegend: false
////                },
////                1: {
////                    type: 'linear',
////                    color: 'green',
////                    lineWidth: 3,
////                    opacity: 0.3,
////                    showR2: true,
////                    visibleInLegend: false
////                }
////            }
//        };
//
//        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
//        chart.draw($scope.data, google.charts.Line.convertOptions($scope.options));
//    };
    
    $scope.drawBasics = function () {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Dogs');

      data.addRows([
        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        [66, 70], [67, 72], [68, 75], [69, 80]
      ]);

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Popularity'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }
    
    $scope.repaint = function (canvas, brush) {
        document.getElementById(canvas).innerHTML = brush;
    };
    
    $scope.reset_data = function () {
        $scope.responseJSON_date = [];
        $scope.responseJSON_hist = [];
        $scope.out = '';
        $scope.dynamic = 0; // progress bar position
        $scope.max = 3; // max progress bar length
        $scope.repaint('resultslist', $scope.out);
    };
    
    $scope.printResults = function () {
        $scope.repaint('resultslist', $scope.out);
        $scope.drawBasics();
    };
    
    $scope.httpSuccess = function () {
        var length = 0, l = 0;
        console.log($scope.responseJSON_hist);
        console.log($scope.responseJSON_hist.length);
        length = $scope.responseJSON_hist.length;
//        for (l = 0; l < length; l++) {
//            $scope.responseJSON_sum += $scope.responseJSON_hist[l].length;
////            console.log($scope.responseJSON_sum);
//        }
        $scope.printResults();
        
    };
    
    $scope.refresh_data = function () {
        
        $scope.reset_data();
        $scope.out = '<div class="row"><div class="col-xs-11 col-xs-offset-1"><h1 class="pink_header">' + $scope.formattedStockName() + '</h1></div></div>';
        $scope.loading = 3; 
        document.getElementById("chart_div").style.visibility = 'hidden';
        
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
                console.log($scope.startYear);
                console.log($scope.endYear);
                console.log($scope.yearGap);
                $scope.dynamic++;
                $scope.loading--;
                $scope.loading += parseInt($scope.yearGap) - 1;
                $scope.max += parseInt($scope.yearGap) - 1;
                console.log('Max: ' + $scope.max);
                $http.get($scope.get_yql_query_hist_start()) // parameters depend on the success of the first ajax request
                    .success(function (responseText_hist_start) {
                        $scope.responseJSON_hist[0] = responseText_hist_start.query.results.quote.reverse();
                        $scope.dynamic++;
                        $scope.loading--;
                       if($scope.loading === 0) {
                        $scope.httpSuccess();
                        }
//                        else {
//                            $timeout(function () {
//                                $scope.httpSuccess();
//                            }, 15000)
//                        }
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
                        console.log($scope.loading);
                        if($scope.loading === 0) {
                        $scope.httpSuccess();
                        }
//                        else {
//                            $timeout(function () {
//                                $scope.httpSuccess();
//                            }, 15000)
//                        }
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
                    if($scope.loading === 0) {
                        $scope.httpSuccess();
                    }
//                    else {
//                        $timeout(function () {
//                            $scope.httpSuccess();
//                        }, 15000)
//                    }
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
(function () {
    'user strict';
    angular.module('app.Home', []).controller('HomeController', Home);
    function Home($scope, $http, $location, Myfactory, storage)
    {
        /*$http.get('http://localhost:50259/api/DoanhThu/getRevenueData', {
        params: {
            merchant_id: "MER_036",
            month: 8,
            year: 2016
        }
    }).success(function(data) {
        var ctx = document.getElementById("myChart");
        var labels = [];
        for (var x = 1; x <= 30; x++) {
            labels.push(x);
        }
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: data.merchant_number + " - " + data.month,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data.revenues,
                        spanGaps: false,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }).error(function() {
        $scope.msg = "Error when processing"
    });
    }*/
    }
})();
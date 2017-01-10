(function () {
    'user strict';
    angular.module('app.Revenue', ["ngJsonExportExcel"]).controller('RevenueController',RevenueAgent);
    function RevenueAgent($scope, $http, $location, Myfactory, storage)
    {
        $scope.body = [];
        var user = Myfactory.user;
        var report = {};
        $scope.check = 'date';
        $scope.checkClickbtn = true;
        $scope.role = user.role;
        $scope.mang = ['31','28','31','30','31','30','31','31','30','31','30','31'];
        $scope.oselected = [];
        $scope.Agents = {
            "count": 0,
            "data": []
        };
        $scope.Renve ={
            "data": []
        };
        $scope.rselected = [];
        $scope.Agent = {
            agent: '',
            merchant: '',
            typeMerchant: '',
            city: '',
            firstDate: '',
            MothYear: '',
            YearOfMonth: '',
            QuaterYear: '',
            YearOfSeason: '',
            Year: '',
            Role: user.role
        }
        $scope.deleteClass = function(){
            debugger;
            
            if($('#collapse12').css('display') == 'none'){
                $('#collapse12').show('slow');
            }
            else{
                $('#collapse12').hide('slow');
            }
            
        }
        //$scope.Agent.firstDate =  moment(new Date()).format('DD/MM/YYYY');
        $scope.limitOptions = [10, 10, 15];
        $scope.checkKT = function(){
            debugger;
            switch($scope.check){
                case 'date':
                    if($scope.Agent.firstDate == "" )
                        return true;
                     return false;
                case 'month':
                    if($scope.Agent.MothYear == "" || $scope.Agent.YearOfMonth == "")
                        return true;
                    return false;
                case "quater":
                    if($scope.Agent.QuaterYear == "" || $scope.Agent.YearOfSeason == "")
                        return true;
                    return false;
                case "year":
                    if($scope.Agent.Year == "" )
                        return true;
                    return false;
                    
            }
        }
        $scope.options = {
            rowSelection: false,
            multiSelect: false,
            autoSelect: false,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: false,
            pageSelect: true
        };

        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };

        $scope.loadStuff = function () {
            $scope.promise = $timeout(function () {
                // loading
            }, 2000);
        };

        $scope.logItem = function (item) {

            console.log(item, 'was selected');
        };

        $scope.logOrder = function (order) {
            console.log('order: ', order);
        };

        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        };
        
        $scope.newValue = function(value){
            $scope.checkClickbtn = true;
            switch(value)
            {
                case 'date':
                    $scope.Agent.MothYear = '';
                    $scope.Agent.YearOfMonth = '';
                    $scope.Agent.QuaterYear = '';
                    $scope.Agent.YearOfSeason = '';
                    $scope.Agent.Year = '';
                    break;
                case 'month':
                    $scope.Agent.firstDate = '';
                    $scope.Agent.QuaterYear = '';
                    $scope.Agent.YearOfSeason = '';
                    $scope.Agent.Year = '';
                    break;
                case 'quater':
                    $scope.Agent.MothYear = '';
                    $scope.Agent.firstDate = '';
                    $scope.Agent.YearOfMonth = '';
                    $scope.Agent.Year = '';
                    break;
                case 'year':
                    $scope.Agent.MothYear = '';
                    $scope.Agent.YearOfMonth = '';
                    $scope.AgentQuaterYear = '';
                    $scope.AgentYearOfSeason = '';
                    $scope.Agent.firstDate = '';
                    break;
                    
            }
        }
        function ConvertNull(data){

            if(data.agent == null)
                data.agent = "";
            if(data.merchant == null)
                data.merchant = "";
            if(data.typeMerchant == null)
                data.typeMerchant = "";
            if(data.city == null)
                data.city = "";
            if(data.firstDate == null)
                data.firstDate = "";
            if(data.MothYear == null)
                data.MothYear = "";
            if(data.YearOfMonth == null)
                data.YearOfMonth = "";
            if(data.QuaterYear == null)
                data.QuaterYear = "";
            if(data.YearOfSeason == null)
                data.YearOfSeason = "";
            if(data.Year == null)
                data.Year = "";
            if(data.Role == null)
                data.Role = user.role;
            if(user.role == '2')
                $scope.Agent.agent = user.username;
            if(user.role == '3')
                $scope.Agent.merchant = user.username;
            }
        
        function convert(body, data){

            //body = [];
            var headertable = new Array('Merchant number', 'Merchant name',  'REPORT DATE', 'SALES AMOUNT',  'RETURN AMOUNT');
            body.push(headertable);

            var i = 0;
            for(key in data)
            {
                
                if (data.hasOwnProperty(key))
                {
                    var peaje = data[key];
                    var fila = new Array();
                    fila.push( peaje.MERCHANT_NUMBER );
                    fila.push( peaje.MERCHANT_NAME  );
                    fila.push( moment(peaje.REPORT_DATE).format('DD/MM/YYYY'));
                    fila.push(  peaje.SALES_AMOUNT.toString());
                    fila.push( peaje.RETURN_AMOUNT.toString()  );
                    body.push(fila);
                }
            }
        }
        
        $scope.searchRevenueMerchant = function (){

            ConvertNull($scope.Agent);
            $http({
                method: "GET",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Revenue/getRevenue",
                params: {
                    
                    agent: $scope.Agent.agent,
                    merchant: $scope.Agent.merchant,
                    loaiMerchant: $scope.Agent.typeMerchant,
                    city: $scope.Agent.city,
                    ngay: $scope.Agent.firstDate,
                    thang:$scope.Agent.MothYear,
                    namthang: $scope.Agent.YearOfMonth,
                    quy: $scope.Agent.QuaterYear,
                    namquy: $scope.Agent.YearOfSeason,
                    nam: $scope.Agent.Year,
                    role: $scope.Agent.Role
                }
            }).then(function sucess(objet) {
                if (objet.data != null) {
                    $scope.Agents.data = objet.data;
                    $scope.Agents.count = objet.data.length;
                    $scope.body = [];
                    convert($scope.body, $scope.Agents.data);
                    $scope.checkClickbtn = false;
                     $scope.deleteClass();
                }
                else {
                    Myfactory.user = objet.data;
                    storage.set('User', Myfactory.user);
                    $location.url("/home");
                }

            }, function errorCallback(response) {
                var a = response;
            });
            ///////
            $http({
                method: "GET",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Revenue/getRevenueOption",
                params: {
                    
                    agent: $scope.Agent.agent,
                    merchant: $scope.Agent.merchant,
                    loaiMerchant: $scope.Agent.typeMerchant,
                    city: $scope.Agent.city,
                    ngay: $scope.Agent.firstDate,
                    thang:$scope.Agent.MothYear,
                    namthang: $scope.Agent.YearOfMonth,
                    quy: $scope.Agent.QuaterYear,
                    namquy: $scope.Agent.YearOfSeason,
                    nam: $scope.Agent.Year
                }
            }).then(function sucess(objet) {
                if (objet.data != null) {
                    $scope.Renve.data = objet.data;
                    $scope.body = [];
                    //convert($scope.body, $scope.Agents.data);
                    //$scope.checkClickbtn = false;
                     $scope.deleteClass();
                }
                

            }, function errorCallback(response) {
                var a = response;
            });
            ///////
            debugger;
        $http.get('http://localhost:50259/api/Chart/getRevenue', {
            headers: {
                        
                        Authorization: Myfactory.user.token
                    },
        params: {
            agent: $scope.Agent.agent,
            merchant: $scope.Agent.merchant,
            loaiMerchant: $scope.Agent.typeMerchant,
            city: $scope.Agent.city,
            ngay: $scope.Agent.firstDate,
            thang: $scope.Agent.MothYear,
            namthang: $scope.Agent.YearOfMonth,
            quy: $scope.Agent.QuaterYear,
            namquy: $scope.Agent.YearOfSeason,
            nam: $scope.Agent.Year,
            role: $scope.Agent.Role
        }
    }).success(data=> {
        $("#RevenueChart").remove();
        $("#revenueChartSection").append('<canvas id="RevenueChart" ></canvas>');
        var ctx = document.getElementById("RevenueChart");

        
        ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);
        var RevenueChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.list_lable_revenue,
                datasets: [
                    {                       
                        label: data.dataset_lable,
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
                        pointHitRadius: 1,
                        data: data.list_value_revenue,
                        spanGaps: false
                    },
                    {
                                            
                        label: data.dataset_lable + "_Last year",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(240,98,146 ,1)",
                        borderColor: "rgba(240,98,146 ,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(240,98,146 ,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(240,98,146 ,1)",
                        pointHoverBorderColor: "rgba(240,98,146 ,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data.list_old_value_revenue,
                        spanGaps: false
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
        $("#CardChart").remove();
        $("#cardChartSection").append('<canvas id="CardChart" ></canvas>');
        var ctn = document.getElementById("CardChart");
            ctn.getContext('2d').clearRect(0, 0, ctn.width, ctn.height);
        var CardChart = new Chart(ctn, {
            type: 'bar',
            data: {
                labels: data.list_lable_card,
                datasets: [
                    {
                        label: data.dataset_lable,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        data: data.list_value_card
                    },
                    {
                        label: data.dataset_lable + "_Last year",
                        backgroundColor: 'rgba(13,71,161 ,1)',
                        borderColor: 'rgba(13,71,161 ,1)',
                        borderWidth: 1,
                        data: data.list_old_value_card
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
    }).error(() => {
        $scope.msg = "Error when processing"
    });
            
            

            //chuan bi export///
                switch( $scope.check){
                    case 'date':
                        report.type = 'NGÀY'
                        report.datefrom = moment($scope.Agent.firstDate).format('DD/MM/YYYY');
                        report.dateto = moment($scope.Agent.firstDate).format('DD/MM/YYYY');
                        break;
                    case 'month':
                         report.type = 'THÁNG'
                        report.datefrom = '01/'+$scope.Agent.MothYear+'/'+$scope.Agent.YearOfMonth;
                        report.dateto = $scope.mang[parseInt($scope.Agent.MothYear)] + '/'+$scope.Agent.MothYear+'/'+$scope.Agent.YearOfMonth;
                        break;
                    case 'quater':
                         report.type = 'QUÝ'
                        if($scope.Agent.QuaterYear == '1')
                        {
                            report.datefrom = '01/01/'+$scope.Agent.YearOfSeason;
                            report.dateto = '31/03/'+$scope.Agent.YearOfSeason;
                        
                        }
                        else
                        {
                            if($scope.Agent.QuaterYear == '2')
                            {
                                report.datefrom = '01/04/'+$scope.Agent.YearOfSeason;
                                report.dateto = '30/06/'+$scope.Agent.YearOfSeason;
                        
                            }
                            else{
                                if($scope.Agent.QuaterYear == '3')
                                {
                                    report.datefrom = '01/07/'+$scope.Agent.YearOfSeason;
                                    report.dateto = '30/09/'+$scope.Agent.YearOfSeason;

                                }
                                else{
                                    report.datefrom = '01/10/'+$scope.Agent.YearOfSeason;
                                    report.dateto = '31/12/'+$scope.Agent.YearOfSeason;
                                }
                            }
                        }
                        break;
                    case 'year':
                         report.type = 'NĂM'
                        report.datefrom = '01/01/'+$scope.Agent.Year;
                        report.dateto = '31/12/'+$scope.Agent.Year;
                        break;
                }
                ////
        }
        
        $scope.PDF_click = function(){
            var canvat1 = $("#RevenueChart");
            var data1 = canvat1[0].toDataURL();
            var canvat2 = $("#CardChart");
            var data2 = canvat2[0].toDataURL();
            
                var docDefinition = {
            
            content: [
                {
                    text: 'BÁO CÁO DOANH THU ' + report.type + '\n',
                    style: 'header1'
                },
                {
                    text: 'Biểu đồ doanh thu merchant' + '\n\n',
                    style: 'header2'
                },
                {
                    text: 'Từ ngày ' + report.datefrom  + ' đến ngày '+ report.dateto +'\n\n',
                    style: 'header2'
                },
                {
                    image: data1,
                    width: 500
                },
                {
                    text: 'Biểu đồ doanh thu các loại card'+ '\n\n',
                    style: 'header2'
                },
                {
                    image: data2,
                    width: 500,
                    height:350
                },
                {
                    text: '\n\n\n',
                    style: 'header3'
                },
                {
						style: 'tableExample',
						table: {
								body: $scope.body
						}
				}

            ], styles: {
                header1: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                    float: 'left'
                },
                header2: {
                    fontSize: 13,
                    alignment: 'center',
                    italics: true,
                    float: 'left'
                },
                header3: {
                    fontSize: 10,
                    alignment: 'left',
                    float: 'left'
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        }
                pdfMake.createPdf(docDefinition).download("Report.pdf");
            
        }
    }
})()
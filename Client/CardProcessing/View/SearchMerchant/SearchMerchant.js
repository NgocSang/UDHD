(function () {
    'user strict';
    angular.module('app.SearchMerchant', []).controller('SearchMerchantController', Home);
    function Home($scope, $http, $location, Myfactory, storage)
    {
        debugger;
        $scope.role = Myfactory.user.role;
        $scope.token = Myfactory.user.token;
        $scope.merchant = {
            merchant_number: "",
            merchant_address: "",
            typeMerchant: "",
            agent_manager: "",
            merchant_name: ""
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
        
        $scope.customFilter = {};
        $scope.oselected = [];
        $scope.merchants = {
                    "count": 0,
                    "data": []
                };
                $scope.rselected = [];

                $scope.limitOptions = [5, 10, 15];

                $scope.options = {
                    //rowSelection: true,
                    //multiSelect: true,
                    autoSelect: true,
                    decapitate: false,
                    
                    largeEditDialog: false,
                    boundaryLinks: false,
                    limitSelect: false,
                    pageSelect: true
                };

                $scope.query = {
                    order: 'name',
                    limit: 5,
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
        
        function ConvertNull(data){
            if(data.merchant_number == null )
                data.merchant_number = "";
            if(data.merchant_address == null)
                data.merchant_address = "";
            if(data.typeMerchant == null)
                data.typeMerchant = "";
            if(data.agent_manager == null)
                data.agent_manager = "";
            if(data.merchant_name == null)
                data.merchant_name = "";
            if(Myfactory.user.role == '3')
                data.merchant_number = Myfactory.user.username;
            if(Myfactory.user.role == '2')
                data.agent_manager = Myfactory.user.username;
            }
        
        $scope.Update_status = function(item){
            
            debugger;
            var status;
            if(item.MERCHANT_STATUS == '1')
            {
                status = '0';
            }
            else{
                status = '1';
            }
            $http({
                method: "POST",
                url: "http://localhost:50259/api/Merchant/Update",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                params: {
                    merchant_number: item.MERCHANT_NUMBER,
                    status: status
                }
            }).then(function sucess(objet) {
                if (objet.data == null) {
                    $scope.checkUser = true;
                }
                else {
                    debugger;
                    var a = $scope.merchants.data.indexOf(item);
                    $scope.merchants.data[a].MERCHANT_STATUS = status;
                    }
            }, function errorCallback(response) {
                debugger;
                var a = response;
            });
        }
        
        $scope.searchMerchant = function()
        {
            $scope.firstName = '';
             
            debugger;
            ConvertNull($scope.merchant);
            debugger;
            $http({
                method: "GET",
                url: 'http://localhost:50259/api/Merchant/searchmerchant',
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                params: {
                    merchant_number: $scope.merchant.merchant_number,
                    merchant_address: $scope.merchant.merchant_address,
                    merchant_type: $scope.merchant.typeMerchant,
                    agent_manager: $scope.merchant.agent_manager,
                    merchant_name: $scope.merchant.merchant_name
                }
            })
            .then(function sucess(objet) {
                if (objet.data != null) {
                    debugger;
                    $scope.merchants.data = objet.data;
                    $scope.merchants.count = objet.data.length;
                    $scope.deleteClass();
                }
            }, function errorCallback(response) {
                debugger;
                var a = response;
                console.log(response);
            });
        }
    }
})();
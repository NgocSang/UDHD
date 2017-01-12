(function () {
    'user strict';
    angular.module('app.GrantAgent', []).controller('GrantAgentController', GrantAgent);
    function GrantAgent($scope, $http, $location, Myfactory, storage)
    {
        $scope.oselected = [];
        $scope.message = {

        };
        $scope.seletedAgent = [];
        $scope.information = {

        };
        $scope.merchant={};
        $scope.merchantOwns = [];
        $scope.merchantNoOwns = [];
        $scope.merchanthasOwns = [];
        $scope.boxmessage = true;
        $scope.desserts = {
            "size": 0,
            "data": []
        }
        $scope.agents = {
            "size": 0,
            "data": []
        }
        $scope.SelectAgent = function (agent) {
            console.log(agent, 'was selected');
        }
        $scope.agent = {
            agentNumber: Myfactory.user.username,
            agentBankNumber: '',
            agentDistrict: '',
            agentApprovedDate: '',
            merchantType: '',
        }
        function ConvertNull(agent) {
            if(agent.agentNumber == null )
                agent.agentNumber = Myfactory.user.username
            if(agent.agentBankNumber == null)
                agent.agentBankNumber = ""
            if(agent.merchantType == null)
                agent.merchantType = ""
            if(agent.agentDistrict == null)
                agent.agentDistrict = ""
            if(agent.agentApprovedDate == null)
                agent.agentApprovedDate = ""
        }
       
        $scope.rselected = [];

        $scope.limitOptions = [5, 10, 15];

         $scope.options = {
            rowSelection: true,
            multiSelect: false,
            autoSelect: true,
            decapitate: false,

            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        }
        $scope.query = {
            order: 'name',
            limit: 7,
            page: 1
        };
        $scope.query2 = {
            order: 'name',
            limit: 7,
            page: 1
        };
        $scope.query3 = {
            order: 'name',
            limit: 7,
            page: 1
        };
        $scope.query4 = {
            order: 'name',
            limit: 7,
            page: 1
        };

        $scope.loadStuff = function () {
            $scope.promise = $timeout(function () {
                // loading
            }, 2000);
        };
        $scope.SearchAgent = function() {
            ConvertNull($scope.agent);
            $scope.loading = true
            $http({
                method: "GET",
                url: "http://localhost:50259/Api/Agent/SearchAgent",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                params: {
                    agentNumber: $scope.agent.agentNumber,
                    agentBankNumber: $scope.agent.agentBankNumber,
                    agentDistrict: $scope.agent.agentDistrict,
                    agentApprovedDate: $scope.agent.agentApprovedDate,
                    merchantType: $scope.agent.merchantType
                }
            }).then(function sucess(response) {
                if (response.data != null) {
                    $scope.agents.data = response.data;
                    $scope.agents.size = response.data.length;
                }
                else {
                    Myfactory.user = response.data;
                    storage.set('User', Myfactory.user);
                    $location.url("/home")
                }
                $scope.loading = false
            }, function errorCallback(response) {
                console.log(response.data)
                console.log(response.status)
                $scope.loading = false
            })
        }
        $scope.logItem = function (item) {
            $scope.information = item;
            console.log(item, 'was selected');
            
            
            
            
            $http({
                method: "GET",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Agent/LoadMerchantNoAgent",
                    }).then(function sucess(objet) {
                
               if(objet.data != null) {
                     $scope.merchantNoOwns = objet.data;
                }

            }, function errorCallback(response) {
                 
                var a = response;
            }); 
             
            $http({
                method: "GET",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Agent/LoadMerchantOfAgent",
                params: {
                    AGENT_NUMBER: item.AGENT_NUMBER
                }
            }).then(function sucess(objet) {
                if (objet.data != null) {
                    $scope.merchantOwns = objet.data;   
                }
                else
                {
                     
                    information.AGENT_NUMBER = "ko dc";
                }
                    
                
            }, function errorCallback(response) {
                var a = response;
            });
            
            $http({
                method: "GET",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Agent/LoadMerchantOfOtherAgent",
                params: {
                    AGENT_NUMBER: item.AGENT_NUMBER
                }
            }).then(function sucess(objet) {
                if (objet.data != null) {
                    $scope.merchanthasOwns = objet.data;   
                }
                else
                {
                    information.AGENT_NUMBER = "ko dc";
                }
                    
                
            }, function errorCallback(response) {
                var a = response;
            });

            
           
            
        };

        $scope.logOrder = function (order) {
            console.log('order: ', order);
        };

        $scope.showAlert = function (item) {
            $scope.message = item;
            
        }

        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        };
        
        
        
        $scope.huy = function (item) {
            
            $http({
                method: "POST",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Agent/RemoveAgentOfMerchant",
                
                params: {
                    MERCHANT_NUMBER: item.MERCHANT_NUMBER
                }
            }).then(function sucess(objet) {
                if (objet.data != null) {
                    $scope.asd = objet.data;
                    var index = $scope.merchantOwns.indexOf(item);
                    $scope.merchantOwns.splice(index, 1);
                    $scope.merchantNoOwns.push(item);
                }
                else
                {
                    information.AGENT_NUMBER = "ko dc";
                }
                    
                
            }, function errorCallback(response) {
                 
                var a = response;
            });
        }
        $scope.them = function (item) {
             
            
            var Obj = {
                AGENT_NUMBER: $scope.information.AGENT_NUMBER,
                MERCHANT_NUMBER: item.MERCHANT_NUMBER  
            };
             
            $http({
                method: "POST",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Agent/UpdateAgentOfMerchant",
                params: {
                    MERCHANT_NUMBER: item.MERCHANT_NUMBER,
                    AGENT_NUMBER: $scope.information.AGENT_NUMBER
                }
            }).then(function sucess(objet) {
                if (objet.data != null) {
                    $scope.asd = objet.data;
                    var index = $scope.merchantNoOwns.indexOf(item);
                    $scope.merchantNoOwns.splice(index, 1);
                    $scope.merchantOwns.push(item);
                }
                else
                {
                     
                    information.AGENT_NUMBER = "ko dc";
                }
                    
                
            }, function errorCallback(response) {
                 
                var a = response;
            });
           
        }
        $scope.themAgent = function (item) {
            var Obj = {
                AGENT_NUMBER: $scope.information.AGENT_NUMBER,
                MERCHANT_NUMBER: item.MERCHANT_NUMBER  
            };
             
            $http({
                method: "POST",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Agent/UpdateAgentOfMerchant",
                params: {
                    MERCHANT_NUMBER: item.MERCHANT_NUMBER,
                    AGENT_NUMBER: $scope.information.AGENT_NUMBER
                }
            }).then(function sucess(objet) {
                if (objet.data != null) {
                    $scope.asd = objet.data;
                    var index = $scope.merchanthasOwns.indexOf(item);
                    $scope.merchanthasOwns.splice(index, 1);
                    $scope.merchantOwns.push(item);
                }
                else
                {
                     
                    information.AGENT_NUMBER = "ko dc";
                }
                    
                
            }, function errorCallback(response) {
                 
                var a = response;
            });
            
        }
        
        
        $scope.searchAgent = function () {
            $http({
                method: "GET",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Agent/LoadAgentNameAndNumber",
                    }).then(function sucess(objet) {
                
               if(objet.data != null) {
                     
                     $scope.desserts.data = objet.data;
                }

            }, function errorCallback(response) {
                 
                var a = response;
            }); 
        }  
    }
})();
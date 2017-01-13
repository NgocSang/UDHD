(function () {
    'user strict';
    angular.module('app.SearchAgent', []).controller('SearchAgentController', SearchAgent)
    function SearchAgent($scope, $http, $location, Myfactory, storage)
    {
        $scope.role = Myfactory.user.role;
        $scope.seletedAgent = [];
        $scope.agents = {
            "size": 0,
            "data": []
        }
        
        $scope.agent = {
            agentNumber: Myfactory.user.username,
            agentBankNumber: '',
            agentDistrict: '',
            agentApprovedDate: '',
            merchantType: '',
        }
        $scope.deleteClass = function(){
            
            
            if($('#collapse12').css('display') == 'none'){
                $('#collapse12').show('slow');
            }
            else{
                $('#collapse12').hide('slow');
            }
            
        }
        $scope.rselected = [];
        $scope.limitOptions = [5, 10, 15];
        $scope.options = {
            rowSelection: false,
            multiSelect: false,
            autoSelect: false,
            decapitate: false,

            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        }
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        }
        
        function ConvertNull(agent) {
            if(agent.agentNumber == null )
                agent.agentNumber = ""
            if(agent.agentBankNumber == null)
                agent.agentBankNumber = ""
            if(agent.merchantType == null)
                agent.merchantType = ""
            if(agent.agentDistrict == null)
                agent.agentDistrict = ""
            if(agent.agentApprovedDate == null)
                agent.agentApprovedDate = ""
            if(Myfactory.user.role == '2')
                data.agentNumber = Myfactory.user.username;
        }
        
        $scope.loadStuff = function () {
            $scope.promise = $timeout(function () {
                // loading
            }, 2000);
        }
        $scope.SelectAgent = function (agent) {
            console.log(agent, 'was selected');
        }
        $scope.logOrder = function (order) {
            console.log('order: ', order);
        }
        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        }
        
        $scope.SearchAgent = function() {
            ConvertNull($scope.agent)
            ConvertDate()
            debugger
            $scope.loading = true
            $http({
                method: "GET",
   
                headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                         Authorization: Myfactory.user.token},
                url: "http://localhost:50259/Api/Agent/SearchAgent",
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
                    //$scope.deleteClass();
                    $scope.loading = false                    
                }
                
            }, function errorCallback(response) {
                console.log(response.data)
                console.log(response.status)
                $scope.loading = false
            })
        }
        $scope.ActDeactAgent = function(agent) {
            var status;
            if(agent.AGENT_STATUS == '1')
            {
                status = '0';
            }
            else{
                status = '1';
            }
            $http({
                method: "POST",
                url: "http://localhost:50259/Api/Agent/ActDeactAgent",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                params: {
                    agentNumber: agent.AGENT_NUMBER
                }
            }).then(function sucess(response) {
                if (response.data != null) {
                    debugger;
                    agent.AGENT_STATUS = status
                }
                else {
                    
                    Myfactory.user = response.data;
                    storage.set('User', Myfactory.user);
                    $location.url("/home")
                }
            }, function errorCallback(response) {
                console.log(response.data)
                console.log(response.status)
            })
        }
        function ConvertDate() {
            if ($scope.agent.agentApprovedDate != "")
                $scope.agent.agentApprovedDate = $scope.agent.agentApprovedDate.toLocaleDateString()
        }
    }
})();
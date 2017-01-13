(function () {
    'user strict';
    angular.module('app.InsertAgent', []).controller('InsertAgentController', InsertAgent);
    function InsertAgent($scope, $http, $location, Myfactory, storage)
    {
        $scope.approveDate = new Date(); 
        $scope.register = {
            Password : null,
            ConfirmPassword: null
        }
        $scope.change = function()
        {
             
            $scope.agent.approveDate = $scope.approveDate; 
            if($scope.agent.approveDate >= $scope.agent.firstDateActive)
                {
                    $scope.checkngay = 1;
                }
            else
                {
                     $scope.checkngay = 0;
                }
                
        }     
        
         $scope.reload_click = function(){
             $scope.loading = true
                var register = {
                UserName: $scope.agent.agentNumber,
                Role : '2',
                Phone: $scope.agent.telephone1,
                Email: $scope.agent.email1,
                Password: $scope.register.Password,
                ConfirmPassword: $scope.register.ConfirmPassword
            };
                $http({
                method: "POST",
                url: "http://localhost:50259/Api/Account/SignUp",
                data: register
            }).then(function sucess(objet) {
                     
                if (objet.data.success == true) {
                     
                    $scope.checkAccount = 0;
                    window.location.reload();
                }
                else
                    {
                        $scope.checkAccount = 1;
                    }
                $scope.loading = false
                
            }, function errorCallback(response) {
                $scope.checkAccount = 1;
                var a = response;
                $scope.loading = false
            });
        }
       
        $scope.insertAgent_click = function () { 
            debugger;
            $scope.loading = true
            var agent = {
                AGENT_NUMBER: $scope.agent.agentNumber,
                AGENT_NAME: $scope.agent.agentName,
                AGENT_TELEPHONE1: $scope.agent.telephone1,
                AGENT_TELEPHONE2: $scope.agent.telephone2,
                AGENT_TELEPHONE3: $scope.agent.telephone3,
                AGENT_CITY: $scope.agent.city,
                AGENT_DISTRICT: $scope.agent.district,
                AGENT_STREET: $scope.agent.street,
                AGENT_STREET_NUMBER: $scope.agent.streetNumber,
                AGENT_REGION: $scope.agent.region,
                AGENT_OWNER: $scope.agent.owner,
                AGENT_FAX: $scope.agent.fax,
                AGENT_BANK_ACCOUNT: $scope.agent.bankAccount,
                AGENT_EMAIL_1: $scope.agent.email1,
                AGENT_EMAIL_2: $scope.agent.email2,
                AGENT_EMAIL_3: $scope.agent.email3,
                BACKEND_PROCESSOR: $scope.agent.backEndProcessor,
                AGENT_STATUS: $scope.agent.status,
                AGENT_APPR0VE_DATE: moment($scope.approveDate).format('DD/MM/YYYY'),
                AGENT_FIRST_DATE_ACTIVATE: moment($scope.agent.firstDateActive).format('DD/MM/YYYY')
            }; 
            
             
            $http({
                method: "POST",
                url: "http://localhost:50259/api/Agent/InsertAgent",
                
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: Myfactory.user.token
                         },
                data: $.param(agent)
            }).then(function sucess(objet) {
                if (objet.data == true) {
                    $scope.checkInsertAgent = 0;
                }
                else
                    {
                        $scope.checkInsertAgent = 1;
                    }
                $scope.loading = false
                
            }, function errorCallback(response) {
                 
                var a = response;
                $scope.loading = false
            });
        };
    }
})();
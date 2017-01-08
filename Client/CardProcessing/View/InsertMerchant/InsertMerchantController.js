(function () {
    'user strict';
    angular.module('app.InsertMerchant', []).controller('InsertMerchantController', InsertMerchant);
    function InsertMerchant($scope, $http, $location, Myfactory, storage)
    {
        $scope.approveDate = new Date(); 
        $scope.register = {
            Password : null,
            ConfirmPassword: null
        }
        $scope.change = function()
        {
            debugger;
            $scope.merchant.approveDate = $scope.approveDate; 
            if($scope.merchant.approveDate >= $scope.merchant.firstDateActive)
                {
                    $scope.checkngay = 1;
                }
            else
                {
                     $scope.checkngay = 0;
                }
                
        }
        
        $scope.reload_click = function(){
            var register = {
                UserName: $scope.merchant.merchantNumber,
                Role : '3',
                Password: $scope.register.Password,
                ConfirmPassword: $scope.register.ConfirmPassword
            };
                $http({
                method: "POST",
                url: "http://localhost:50259/Api/Account/SignUp",
                data: register
            }).then(function sucess(objet) {
                    debugger;
                if (objet.data.success == true) {
                    debugger;
                    $scope.checkAccount = 0;
                    window.location.reload();
                }
                else
                    {
                        $scope.checkAccount = 1;
                    }
                    
                
            }, function errorCallback(response) {
                $scope.checkAccount = 1;
                var a = response;
            });
                
        }
       
        $scope.insertMerchant_click = function () { 
            var merchant = {
                merchantNumber: $scope.merchant.merchantNumber,
                merchantName: $scope.merchant.merchantName,
                merchantType: $scope.merchant.merchantType,
                merchantTelephone1: $scope.merchant.telephone1,
                merchantTelephone2: $scope.merchant.telephone2,
                merchantTelephone3: $scope.merchant.telephone3,
                merchantCity: $scope.merchant.city,
                merchantDistrict: $scope.merchant.district,
                merchantStreet: $scope.merchant.street,
                merchantSteetNumber: $scope.merchant.streetNumber,
                merchantRegion: $scope.merchant.region,
                merchantOwner: $scope.merchant.owner,
                merchantFax: $scope.merchant.fax,
                merchantBankAccount: $scope.merchant.bankAccount,
                merchantEmail1: $scope.merchant.email1,
                merchantEmail2: $scope.merchant.email2,
                merchantEmail3: $scope.merchant.email3,
                agent: {
                    agentNumber: $scope.merchant.manageAgent
                },
                processor: {
                    processorId: $scope.merchant.backEndProcessor
                },
                merchantStatus: $scope.merchant.status,
                merchantAppr0veDate: $scope.merchant.approveDate,
                merchantFirstDateActivate: $scope.merchant.firstDateActive
            }; 
            
            debugger;
            $http({
                method: "POST",
                url: "http://localhost:8080/DoAnAPI/rest/api/merchant",
                data: merchant
            }).then(function sucess(objet) {
                if (objet.data == true) {
                    $scope.checkInsertMerchant = 0;
                }
                else
                    {
                        $scope.checkInsertMerchant = 1;
                    }
                    
                
            }, function errorCallback(response) {
                debugger;
                var a = response;
            });
        };
    }
})();
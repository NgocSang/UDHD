(function () {
    'user strict';
    angular.module('app.EditProfile', []).controller('EditProfileController', EditProfile);
    function EditProfile($scope, $http, $location, Myfactory, storage)
    {
        $scope.Agent = {
            AGENT_APPR0VE_DATE: null
        };
        $scope.Merchant = {}
        $scope.role = Myfactory.user.role;
        function init(){
            if($scope.role == '2'){
                    $http({
                    method: "GET",
                    headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                    url: "http://localhost:50259/Api/Agent/SearchAgent",
                    params: {
                        agentNumber: Myfactory.user.username,
                        agentBankNumber: "",
                        agentDistrict: "",
                        agentApprovedDate: "",
                        merchantType: ""
                    }
                }).then(function sucess(objet) {
                    if (objet.data != null) {
                        
                        $scope.Agent = objet.data[0];
                        $scope.Agent.AGENT_APPR0VE_DATE =  moment($scope.Agent.AGENT_APPR0VE_DATE).format('DD/MM/YYYY');
                    }
                }, function errorCallback(response) {
                    
                    var a = response;
                });
            }
            else{
                $http({
                method: "GET",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/Api/Merchant/searchmerchant",
                params: {
                    merchant_number: Myfactory.user.username,
                    merchant_address: "",
                    merchant_type: "",
                    agent_manager: "",
                    merchant_name: ""
                }
            }).then(function sucess(objet) {
                if (objet.data != null) {
                    $scope.Merchant = objet.data[0];
                    $scope.Merchant.MERCHANT_APPR0VE_DATE =  moment($scope.Merchant.MERCHANT_APPR0VE_DATE).format('DD/MM/YYYY');
                    $scope.Merchant.MERCHANT_FIRST_DATE_ACTIVATE = moment($scope.Merchant.MERCHANT_FIRST_DATE_ACTIVATE).format('DD/MM/YYYY');
                    $scope.Merchant.MERCHANT_LAST_DAY_ACTIVATE = moment($scope.Merchant.MERCHANT_LAST_DAY_ACTIVATE).format('DD/MM/YYYY');
                }
            }, function errorCallback(response) {
  
                var a = response;
            });
            }
            
        }
        init();
        
        $scope.EditProfile_click = function () { 
            if($scope.role == '3'){
                var merchant = {
                    merchantNumber: $scope.Merchant.MERCHANT_NUMBER,
                    merchantName: $scope.Merchant.MERCHANT_NAME,
                    merchantType: $scope.Merchant.MERCHANT_TYPE,
                    merchantTelephone1: $scope.Merchant.MERCHANT_TELEPHONE1,
                    merchantTelephone2: $scope.Merchant.MERCHANT_TELEPHONE2,
                    merchantTelephone3: $scope.Merchant.MERCHANT_TELEPHONE3,
                    merchantCity: $scope.Merchant.MERCHANT_CITY,
                    merchantDistrict: $scope.Merchant.MERCHANT_DISTRICT,
                    merchantStreet: $scope.Merchant.MERCHANT_STREET,
                    merchantSteetNumber: $scope.Merchant.MERCHANT_STEET_NUMBER,
                    merchantRegion: $scope.Merchant.MERCHANT_REGION,
                    merchantOwner: $scope.Merchant.MERCHANT_OWNER,
                    merchantFax: $scope.Merchant.MERCHANT_FAX,
                    merchantEmail1: $scope.Merchant.MERCHANT_EMAIL1,
                    merchantEmail2: $scope.Merchant.MERCHANT_EMAIL2,
                    merchantEmail3: $scope.Merchant.MERCHANT_EMAIL3,
                    merchantBankAccount: $scope.Merchant.MERCHANT_BANK_ACCOUNT,
                    agent: {
                        agentNumber: $scope.Merchant.MANAGE_AGENT
                    },
                    processor: {
                        processorId: $scope.Merchant.BACKEND_PROCESSOR
                    },
                    merchantStatus: $scope.Merchant.MERCHANT_STATUS,
                    merchantLastDayActivate: new Date($scope.Merchant.MERCHANT_LAST_DAY_ACTIVATE).getTime()
                };
                //convert object to json
                var merchantJson = JSON.stringify(merchant);
               console.log(merchantJson)
                $http({
                    method: "PUT",
                    url: "http://localhost:8080/DoAnAPI/rest/api/merchant/",
                    data: merchantJson
                }).then(function sucess(object) {
 
                    if (object.data.success == true) {
                        $scope.checkEditProfile = 0;
                    }
                    else
                        {
                            $scope.checkEditProfile = 1;
                        }

                }, function errorCallback(response) {
                    console.log("error");
                    var a = response;
                });
            }
            else{
                var agent = {
                    AGENT_NUMBER: $scope.Agent.AGENT_NUMBER,
                    AGENT_NAME: $scope.Agent.AGENT_NAME,
                    AGENT_TELEPHONE1: $scope.Agent.AGENT_TELEPHONE1,
                    AGENT_TELEPHONE2: $scope.Agent.AGENT_TELEPHONE2,
                    AGENT_TELEPHONE3: $scope.Agent.AGENT_TELEPHONE3,
                    AGENT_CITY: $scope.Agent.AGENT_CITY,
                    AGENT_DISTRICT: $scope.Agent.AGENT_DISTRICT,
                    AGENT_STREET: $scope.Agent.AGENT_STREET,
                    AGENT_STREET_NUMBER: $scope.Agent.AGENT_STREET_NUMBER,
                    AGENT_REGION: $scope.Agent.AGENT_REGION,
                    AGENT_OWNER: $scope.Agent.AGENT_OWNER,
                    AGENT_FAX: $scope.Agent.AGENT_FAX,
                    AGENT_EMAIL_1: $scope.Agent.AGENT_EMAIL_1,
                    AGENT_EMAIL_2: $scope.Agent.AGENT_EMAIL_2,
                    AGENT_EMAIL_3: $scope.Agent.AGENT_EMAIL_3,
                    AGENT_BANK_ACCOUNT: $scope.Agent.AGENT_BANK_ACCOUNT
                    
            }
 
                $http({
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: Myfactory.user.token
                    },
                    url: "http://localhost:50259/Api/Agent/UpdateAgent",
                    data: $.param(agent)
                }).then(function sucess(object) {
           
                    if (object.data == true) {
                        $scope.checkEditProfile = 0;
                    }
                    else
                        {
                            $scope.checkEditProfile = 1;
                        }

                }, function errorCallback(response) {
                    console.log("error");
                    var a = response;
                });
        };
        }
    }
})()
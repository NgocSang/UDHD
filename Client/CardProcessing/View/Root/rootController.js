(function () {
    'user strict';
    angular.module('app.Root', []).controller('RootController', Root)
    function Root($scope, $http, $location, Myfactory, storage)
    {
        function initModel() {
            $scope.checkpass = 0;
            if (Myfactory.user != null)
            {
                $scope.user = {
                    name: Myfactory.user.username,
                    role: Myfactory.user.role
                }
            }
            
        };
        
        initModel();
        
        $('.dropdown-toggle').dropdown()
        $scope.logout_click = function()
        {
            storage.clearAll()
            Myfactory.user = null
            $location.url('/login')
        }
        $scope.data = "123";
        $scope.ChangePassword = function() {
            debugger;
            var pass = {
                UserName: Myfactory.user.username,
                OldPassword: $scope.oldPassword,
                NewPassword: $scope.newPassword,
                ConfirmPassword: $scope.confirmPassword
            }
            $scope.isPassFalse = false
            $scope.isPassTrue = false
            if (!$scope.newPassword.localeCompare($scope.confirmPassword))
                $http({
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: Myfactory.user.token
                },
                url: "http://localhost:50259/api/Account/ChangePassword",
                    
                
                data: $.param(pass)
                    
                }).then(function sucess(response) {
                    debugger
                    if (response.data.success == true) {
                        $scope.result = "Mật khẩu đã cập nhật."
                        $scope.isPassTrue = true
                    } else {
                        $scope.result = "Mật khẩu không đúng."
                        $scope.isPassFalse = true
                    }
                    $scope.oldPassword = ""
                    $scope.newPassword = ""
                    $scope.confirmPassword = ""
                }, function errorCallback(response) {
                    console.log(response.data);
                    console.log(response.status);
                    $scope.result = "Mật khẩu không đúng.";
                    $scope.isPassFalse = true;
                })
            else {
                $scope.result = "Mật khẩu xác nhận không khớp"
                $scope.isPassFalse = true
            }
            
        }

        
        $scope.noUnreadMessage = 0
        CountUnreadMessage()
        function CountUnreadMessage() {
           $http({
                method: "GET",
                url: "http://localhost:50259/Api/Message/CountUnreadMessage",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: Myfactory.user.token
                         },
                params: {
                    receiver: Myfactory.user.username
                }
            }).then(function successCallBack(response) {
                console.log(response.data)
                    $scope.noUnreadMessage = response.data;
               if($scope.noUnreadMessage > 0)
               {
                    $.notiny({ text: "Bạn có tin nhắn mới ",
                                theme: 'light',
                                image: '../Asset/picture/letter.png',
                                animation_show: 'notiny-animation-show-wtf 0.4s'});
               }
                
            }, function errorCallBack(response) {
                console.log(response.data)
                console.log(response.status)
            }) 
        }
        $scope.$on('ReadDeleteMessage', function(event, data){
            $scope.noUnreadMessage = $scope.noUnreadMessage - data
        })
        $scope.$on('UpdateInbox', function(event, data){
            $scope.noUnreadMessage = data
        })
    }
})();
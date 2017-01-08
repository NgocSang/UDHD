(function () {
    'user strict';
    angular.module('app.ChangePassword', []).controller('ChangePasswordController', ChangePassword)
    function ChangePassword($scope, $http, $location, Myfactory, storage)
    {
       $scope.ChangePassword = function() {
            if (!$scope.newPassword.localeCompare($scope.confirmPassword))
                $http({
                method: "POST",
                url: "http://localhost:60546/Account/UpdatePassword",
                    params: {
                        account: Myfactory.user.username,
                        oldPassword: $scope.oldPassword,
                        newPassword: $scope.newPassword,
                        confirmPassword: $scope.confirmPassword
                    }
                }).then(function sucess(response) {
                    if (response.data > 0)
                        $scope.result = "Mật khẩu đã cập nhật."
                    else
                        $scope.result = "Mật khẩu không đúng."
                }, function errorCallback(response) {
                    console.log(response.data)
                    console.log(response.status)
                })
            else
                $scope.result = "Mật khẩu xác nhận không khớp"
            
        }
    }
})()
(function () {
    'user strict';
    angular.module('app.SendMessage', []).controller('SendMessageController', SendMessage);
    function SendMessage($scope, $http, $location, Myfactory, storage)
    {
        $scope.SendMessage = function() {
            $scope.isErr = false
            $scope.isSuc = false
            $scope.loading = true
            $http({
                
                method: "PUT",
                url: "http://localhost:8080/DoAnAPI/rest/api/outboxMessage/sendMessage",
                params: {
                    sender: Myfactory.user.username,
                    receiver: $scope.receiver,
                    description: $scope.description
                }
            }).then(function successCallBack(response) {
                 
                if (response.data > 0) {
                    $scope.receiver = ""
                    $scope.description = ""
                    $scope.result = "Tin nhắn đã gửi thành công." 
                    $scope.isSuc = true
                } else {
                    $scope.result = "Tin nhắn không thể gửi."
                    $scope.isErr = true
                }
                $scope.loading = false
            }, function errorCallBack(response) {
                console.log(response.data)
                console.log(response.status)
                $scope.loading = false
            })
        }
    }
})()
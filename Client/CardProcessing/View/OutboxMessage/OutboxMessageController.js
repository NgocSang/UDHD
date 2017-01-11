(function () {
    //'user strict';
    angular.module('app.OutboxMessage', []).controller('OutboxMessageController', BoxMessage)
    function BoxMessage($scope, $http, $location, $mdDialog, Myfactory, storage)
    {
        $scope.messages = {
                    "size": 0,
                    "data": []
                }
        $scope.selectedMessages = []
        
        $scope.limitOptions = [5, 10, 15]
        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: false,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true,
        }
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        }
        $scope.loadStuff = function () {
            $scope.promise = $timeout(function () {
                // loading
            }, 2000)
        }
        
        $scope.SelectMessage = function(message) {}
        
        $scope.logOrder = function (order) {
            console.log('order: ', order)
        }
        $scope.logPagination = function (page, limit) {
            console.log('page: ', page)
            console.log('limit: ', limit)
        }
        
        ShowOutbox()
        function ShowOutbox() {
            debugger;
            $scope.isReadMessage = false

            $http({
                method: "GET",
                url: "http://localhost:8080/DoAnAPI/rest/api/outboxMessage/showOutbox",
                params: {
                    sender: Myfactory.user.username
                }
            }).then(function successCallBack(response) {
                debugger;
                console.log(response.data)
                if (response.data != null) {
                    $scope.messages.data = response.data;
                    $scope.messages.size = response.data.length;
                } else {
                    Myfactory.user = object.data
                    storage.set('User', Myfactory.user)
                    $location.url("/home")                   
                }
            }, function errorCallBack(response) {
                console.log(response.data)
                console.log(response.status)
            })
        }
        $scope.message = {}
        $scope.ReadMessage = function(message) {
            $scope.message = message
            $scope.isReadMessage = true
            $scope.selectedMessages = []
        }
        $scope.DeleteReadingMessage= function(message) {
            debugger
            $http({
                method: "POST",
                url: "http://localhost:50259/api/MessageOutbox/DeleteMessage",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                params: {
                    idMessage: message.emailId.toString()
                }
            }).then(function successCallBack(response) {
                if (response.data > 0) {
                    $scope.messages.data.splice($scope.messages.data.indexOf(message), 1)
                    $scope.isReadMessage = false
                }
            }, function errorCallBack(response) {
                console.log(response.data)
                console.log(response.status)
            })
        }
        $scope.DeleteMessage= function() {
            debugger
            selectedMessagesID = []
            angular.forEach($scope.selectedMessages, function(message){
                selectedMessagesID.push(message.emailId)
            })
            debugger
            
            $http({
                method: "POST",
                url: "http://localhost:50259/api/MessageOutbox/DeleteMessage",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                params: {
                    idMessage: selectedMessagesID.toString()
                }
            }).then(function successCallBack(response) {
                if (response.data > 0) {
                    angular.forEach($scope.selectedMessages, function(message){
                        $scope.messages.data.splice($scope.messages.data.indexOf(message), 1)
                        $scope.messages.size--
                        $scope.selectedMessages = []
                    })
                }
            }, function errorCallBack(response) {
                console.log(response.data)
                console.log(response.status)
            })
        }
        $scope.back = function (){
            $scope.isReadMessage = false
        }
    }
})()
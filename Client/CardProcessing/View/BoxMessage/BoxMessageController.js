(function () {
    //'user strict';
    angular.module('app.BoxMessage', []).controller('BoxMessageController', BoxMessage)
    function BoxMessage($scope, $http, $location, $mdDialog, Myfactory, storage) {
        $scope.messages = {
            size: 0,
            data: [],
            noUnreadMessage: 0,
        }
        $scope.selectedMessages = {
            data: [],
            noUnreadMessage: 0,
        }
        
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
        
        $scope.SelectMessage = function(message) { }
        
        $scope.logOrder = function (order) {
            console.log('order: ', order)
        }
        $scope.logPagination = function (page, limit) {
            console.log('page: ', page)
            console.log('limit: ', limit)
        }
        
        ShowInbox()
        function ShowInbox() {
            $scope.isReadMessage = false
            $scope.loading = true
            $http({
                method: "GET",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/Api/Message/ShowInbox",
                params: {
                    receiver: Myfactory.user.username
                }
            }).then(function successCallBack(response) {
                console.log(response.data)
                if (response.data != null) {
                    $scope.messages.data = response.data
                    $scope.messages.size = response.data.length
                    CountUnreadMessage()
                } else {
                    Myfactory.user = object.data
                    storage.set('User', Myfactory.user)
                    $location.url("/home")                   
                }
                $scope.loading = false
            }, function errorCallBack(response) {
                console.log(response.data)
                console.log(response.status)
                $scope.loading = false
            })
        }
        $scope.message = {}
        $scope.ReadMessage = function(message) {
            $scope.message = message
            $scope.isReadMessage = true
            $scope.selectedMessages.data=[]
            $scope.selectedMessages.noUnreadMessage=0
            
            if (message.READING_STATUS == 'NO')
                $http({
                    method: "POST",
                    headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                    url: "http://localhost:50259/api/Message/ReadMessage", 
                    params: {
                        idMessage: message.ID.toString()
                    }
                }).then(function successCallBack(response) {
                    if (response.data > 0) {
                        $scope.messages.data[$scope.messages.data.indexOf(message)].READING_STATUS = 'YES'
                        $scope.$emit('ReadDeleteMessage', 1)
                    }
                }, function errorCallBack(response) {
                    console.log(response.data)
                    console.log(response.status)
                })
        }
        $scope.DeleteReadingMessage = function(message) {
            $scope.loading = true;
            $http({
                method: "POST",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Message/DeleteMessage", 
                params: {
                    idMessage: message.ID.toString()
                }
            }).then(function successCallBack(response) {
                if (response.data > 0) {
                    $scope.messages.data.splice($scope.messages.data.indexOf(message), 1)
                    $scope.isReadMessage = false
                }
                $scope.loading = false
            }, function errorCallBack(response) {
                console.log(response.data)
                console.log(response.status)
                $scope.loading = false
            })
        }
        $scope.DeleteMessage = function() {
            $scope.loading = true
            selectedMessagesID = []
            angular.forEach($scope.selectedMessages.data, function(message){
                selectedMessagesID.push(message.ID)
            })
            
            $http({
                method: "POST",
                headers: {
                        
                        Authorization: Myfactory.user.token
                    },
                url: "http://localhost:50259/api/Message/DeleteMessage", 
                params: {
                    idMessage: selectedMessagesID.toString()
                }
            }).then(function successCallBack(response) {
                if (response.data > 0) {
                    angular.forEach($scope.selectedMessages.data, function(message){
                        $scope.messages.data.splice($scope.messages.data.indexOf(message), 1)
                        if (message.READING_STATUS == 'NO') {
                            $scope.selectedMessages.noUnreadMessage++
                        }
                        $scope.messages.size--
                    })
                    $scope.$emit('ReadDeleteMessage', $scope.selectedMessages.noUnreadMessage)
                    $scope.selectedMessages.data=[]
                    $scope.selectedMessages.noUnreadMessage=0
                    $scope.loading = false
                }
            }, function errorCallBack(response) {
                console.log(response.data)
                console.log(response.status)
                $scope.loading = false
            })
        }
        function CountUnreadMessage() {
            angular.forEach($scope.messages.data, function(message){
                if (message.READING_STATUS == 'NO') {
                    $scope.messages.noUnreadMessage++
                }
                $scope.$emit('UpdateInbox', $scope.messages.noUnreadMessage)
            })
        }
        $scope.back = function (){
            $scope.isReadMessage = false
        }
    }
})()
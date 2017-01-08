(function () {
    'user strict';
    angular.module('app.login', []).controller('LoginController', Login);

    function Login($scope, $http, $location, Myfactory, storage) {
        //$scope.myservice = myservice;
        $scope.forget ={
            username : null
        };
        $scope.user = {
            username : null,
            password: null
        }
        $scope.change = function(){
            $scope.hideforget = false;
        }
        $scope.hideforget = true;
        $scope.login_click = function () {
            debugger;
            var user = {
                username: $scope.user.username,
                password: $scope.user.password
            };
            $http({
                method: "POST",
                url: "http://localhost:50259/api/Account/SignIn",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(user)
            }).then(function sucess(objet) {
                if (objet.data == null) {
                    $scope.checkUser = true;
                }
                else {
                    debugger;
                    Myfactory.user = objet.data.dbUser;
                    Myfactory.user.token = objet.data.token;
                    storage.set('User', Myfactory.user);
                    $location.url("/home");
                }

            }, function errorCallback(response) {
                $scope.checkUser = true;
                var a = response;
            });
        };
        $scope.forget_click = function(){
            $http({
                method: "GET",
                url: "http://localhost:50259/api/Account/ForgetPassword",
                params:{ 
                    username: $scope.forget.username
                }
            }).then(function sucess(objet) {
                if (objet.data == null) {
                    $scope.checkUser = true;
                }
                else {
                    if(objet.data == false){
                        $scope.checkForget = true;
                    }
                    else
                        $scope.hideforget = true;
                }

            }, function errorCallback(response) {
                $scope.checkUser = true;
                var a = response;
            });
        };
    }
})();
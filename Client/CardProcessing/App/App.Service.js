(function () {
    'use strict';
    var service = angular.module('app');
    service.factory("myservice", service_func);
    function service_func($http) {
        function login() {
            return $http({
                method: "Get",
                url: "http://localhost:50259/User/Login"
            });
        }
        return {
            Login : login
        }
    }
})();
(function () {
    'use strict';
    var factory = angular.module('app.factory',[]);
    factory.factory("Myfactory", factor);
    function factor() {
        return {
            user: {
                token: null
            }
        };
    }
})();
(function () {
    'user strict';
    var app = angular.module('app', [
        'angularLocalStorage',
        'ngAnimate',
        'ngMaterial',
        'ui.router',
        'md.data.table',
        'ngMessages',
        'app.login',
        'app.Root',
        'app.Home',
        'app.ChangePassword',
        'app.SearchMerchant',
        'app.SearchAgent',
        'app.InsertMerchant',
        'app.BoxMessage',
        'app.OutboxMessage',
        'app.SendMessage',
        'app.InsertAgent',
        'app.InsertMerchant',
        'app.EditProfile',
        'app.Revenue',
        'app.GrantAgent',
        'app.factory',
        'app.SearchRetrival'
    ])
    
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, Myfactory) {
            // $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state("/login", {
                    url: '/login',
                    templateUrl: "Login/Login.html",
                    controller: "LoginController",
                    resolve: {
                        "authentication": function ($location, Myfactory) {
                            var user = Myfactory.user;
                            if (user !== null) {
                                $location.url("/home");
                            }
                        }
                    }
                })
                .state("root", {
                    abstract: true,
                    login: true,
                    templateUrl: 'Root/root.html',
                    controller: "RootController"
                })
            
                .state("home", {
                    parent: "root",
                    url: "/home",
                    templateUrl: 'Home/Home.html',
                    controller: "HomeController",
                    login: true
                    
                })
                .state("SearchRetrival", {
                        parent: "root",
                        url: "/SearchRetrival",
                        templateUrl: 'SearchRetrival/SearchRetrival.html',
                        controller: "SearchRetrivalController",
                        login: true
                        
                    })
                .state("ChangePassword", {
                            parent: "root",
                            url: "/ChangePassword",
                            templateUrl: 'ChangePassword/ChangePassword.html',
                            controller: "ChangePasswordController",
                            login: true 
                            
                        })
                .state("SearchMerchant", {
                        parent: "root",
                        url: "/SearchMerchant",
                        templateUrl: 'SearchMerchant/SearchMerchant.html',
                        controller: "SearchMerchantController",
                        login: true        
                
                    })
                .state("SearchAgent", {
                            parent: "root",
                            url: "/SearchAgent",
                            templateUrl: 'SearchAgent/SearchAgent.html',
                            controller: "SearchAgentController",
                            login: true
                            
                        })
                .state("BoxMessage", {
                        parent: "root",
                        url: "/BoxMessage",
                        templateUrl: 'BoxMessage/BoxMessage.html',
                        controller: "BoxMessageController",
                        login: true
                        
                    })
                .state("OutboxMessage", {
                            parent: "root",
                            url: "/OutboxMessage",
                            templateUrl: 'OutboxMessage/OutboxMessage.html',
                            controller: "OutboxMessageController",
                            login: true
                            
                        })
                .state("SendMessage", {
                        parent: "root",
                        url: "/SendMessage",
                        templateUrl: 'SendMessage/SendMessage.html',
                        controller: "SendMessageController",
                        login: true
                        
                    })
                .state("InsertAgent", {
                        parent: "root",
                        url: "/InsertAgent",
                        templateUrl: 'InsertAgent/InsertAgent.html',
                        controller: "InsertAgentController",
                        login: true
                        
                    })
                .state("InsertMerchant", {
                        parent: "root",
                        url: "/InsertMerchant",
                        templateUrl: 'InsertMerchant/InsertMerchant.html',
                        controller: "InsertMerchantController",
                        login: true
                        
                    })
                
                .state("GrantAgent", {
                        parent: "root",
                        url: "/GrantAgent",
                        templateUrl: 'GrantAgent/GrantAgent.html',
                        controller: "GrantAgentController",
                        login: true
                        
                    })
                .state("EditProfile", {
                        parent: "root",
                        url: "/EditProfile",
                        templateUrl: 'EditProfile/EditProfile.html',
                        controller: "EditProfileController",
                        login: true
                        
                    })
                    
                .state("Revenue", {
                        parent: "root",
                        url: "/Revenue",
                        templateUrl: 'Revenue/Revenue.html',
                        controller: "RevenueController",
                        login: true,
                
                        
                    })
            ;

        }]);
    app.run(function (Myfactory, storage, $rootScope, $state, $timeout) {
        var a = storage.get('User');
        if (a) {
            Myfactory.user = a;
        }
        $rootScope.$on('$stateChangeStart', function(event, state, param, fromsate, fromparam){
            if(state.login)
            {
                var user = Myfactory.user;
                if (user.token == null || user.token == "undefined") {
                    $timeout(function(){
                        $state.go("/login");
                    });
                    
                }
            }else{
                var user = Myfactory.user;
                if (user.token !== null && user.token !== "undefined") {
                    $timeout(function(){
                        $state.go("/home");
                    });
                    
                }
            }
                
        });

    });
    app.filter('lengthstring', function () {
          return function (item) {
            if(item.length > 82)
            {
              return item.substr(0, 82) + '...'
            }else{
              return item
            }

        };
    });
    app.filter('fomatdate', function () {
          return function (item) {
            return moment(item).format('DD/MM/YYYY');
        };
    })
})();
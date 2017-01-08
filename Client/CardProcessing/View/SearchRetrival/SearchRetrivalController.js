(function() {
    'user strict';
    angular.module('app.SearchRetrival', []).controller('SearchRetrivalController', SearchRetrival);

    function SearchRetrival($scope, $http, $location, Myfactory, storage) {
//        $scope.role = Myfactory.user.role;
        
        $scope.retrivals = {
            "count": 0,
            "data": []
        };
        $scope.customFilter = {};
        $scope.rselected = [];

                $scope.limitOptions = [5, 10, 15];

                $scope.options = {
                    //rowSelection: true,
                    //multiSelect: true,
                    autoSelect: true,
                    decapitate: false,
                    
                    largeEditDialog: false,
                    boundaryLinks: false,
                    limitSelect: false,
                    pageSelect: true
                };

                $scope.query = {
                    order: 'name',
                    limit: 5,
                    page: 1
                };
        $scope.searchRetrival = function() {
            
            var retrival = {
                retrivalId: $scope.retrivalId,
                retrivalDate: new Date($scope.retrivalDate).getTime()
            }
            if(retrival.retrivalId == "")
            {
                retrival.retrivalId = undefined;
            }
            if(retrival.retrivalDate == 0)
            {
                retrival.retrivalDate = undefined;
            }
            
            $http({
                method: "POST",
                url: "http://localhost:8080/DoAnAPI/rest/api/retrival/searchRetrival",
               
                data:retrival
            }).then(function sucess(objet) {
                debugger
                if (objet.data != null) {
                    debugger
                    console.log(objet.data);
                    $scope.retrivals.data = objet.data;
                    $scope.retrivals.count = objet.data.length;
                }
            }, function errorCallback(response) {
                
                var a = response;
            });
        }
    }
})();

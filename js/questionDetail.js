/**
 * 话题详情页
 */
angular.module('questionDetailApp',[])
.controller('questionDetailController',['$scope','$http','$sce','$stateParams',function ($scope,$http,$stateParams) {
    console.log('接受到的参数')
    console.log($stateParams);
    $scope.mine = {

    };


    (function () {
        $http({
          url:'http://localhost:5000?myUrl=' + "http://c.3g.163.com/newstopic/list/latestqa/" + $stateParams.docid+"/10-10.html&callback=JSON_CALLBACK",
            method:'jsonp'
        }).then(function success(result) {
            // console.log("**********");
            // console.log($stateParams.docid);
            // console.log(result);


        },function error(e) {
            console.log(e);
        })
    })();
}])
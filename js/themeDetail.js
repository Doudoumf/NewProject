/**
 * 话题详情页
 */
angular.module('themeDetailApp',[])
.controller('themeDetailController',['$scope',"$sce",'$stateParams','$http',function ($scope,$sce,$stateParams,$http) {
    $scope.mine = {
        title:'',
        time:'',
        source:'',
        content:''
    };




    (function () {
        $http({
            url:'http://localhost:5000?myUrl=' + "http://c.3g.163.com/newstopic/list/latestqa/" + $stateParams.docid + "/10-10.html&callback=JSON_CALLBACK",
            method:'jsonp'
        }).then(function success(result) {
            // console.log(result);
        },function error(e) {
            console.log(e)
        })
    })();


}])
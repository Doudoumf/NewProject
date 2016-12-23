/**
 * 漫画
 */
angular.module('cartoonApp',[])
.controller('cartoonController',['$scope','$state','$http','$timeout','myService',function ($scope,$state,$http,$timeout,myService) {


    $scope.mine = {
        newList:[],
        firstLoad:false,
        switch:true,
        loadMore:loadMore,
        doRefresh:doRefresh,
        goToDetail:goToDetail
    };

    function goToDetail(str) {
        $state.go('tab.cartoonDetail',{docid:str})
    }

    var myUrl = 'http://localhost:5000?myUrl=' + "http://c.3g.163.com/nc/article/list/T1444270454635/0-20.html" + "&callback=JSON_CALLBACK";

    function doRefresh() {
        $http({
            url:myUrl,
            method:'jsonp'
        }).then(function success(result) {
            var result = result.data.T1444270454635;
            result.splice(0,1);
            $scope.mine.newList = result;
            $timeout(function () {
                $scope.mine.firstLoad = true;
            },4000)
            // console.log(result);
            $scope.$broadcast('scroll.refreshComplete');
        },function error(e) {
            // console.log(e);
            $scope.$broadcast('scroll.refreshComplete');
        })
    }

    doRefresh();

    myService.num = 20;
    function loadMore() {
        if(myService.isFirst){
            $scope.$broadcast('scroll.infiniteScrollComplete');
            myService.isFirst = false;
        }else{
            return;
        }

        if($scope.mine.switch){
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.mine.switch = false;
        }else{
            return;
        }

        myService.num += 20;
        var moreUrl = 'http://localhost:5000?myUrl=' + "http://c.3g.163.com/nc/article/list/T1444270454635/" + 0 + "-" + myService.num + ".html" + "&callback=JSON_CALLBACK";

        $http({
            url:moreUrl,
            method:'jsonp'
        }).then(function success(result) {

            myService.isFirst = true;
            $scope.mine.switch = true;
            $scope.mine.firstLoad = true;
            var result = result.data.T1444270454635;
            $scope.mine.newList = result;
            // console.log(result.length);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if(myService.num == 140){
                $scope.mine.firstLoad = false;
            }
        },function error(e) {
            // console.log(e);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }

}])
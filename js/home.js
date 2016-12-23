/**
 * 家居
 */
angular.module('homeApp',[])
.controller('homeController',['$scope','$state','$http','$timeout','myService',function ($scope,$state,$http,$timeout,myService) {
    
    $scope.mine = {
        doRefresh:doRefresh,
        loadMore:loadMore,
        firstLoad:false,
        switch:true,
        newList:[],
        goToDetail:function (str) {
            $state.go('tab.homeDetail',{docid:str})
        }
    };

    var myUrl = "http://localhost:5000?myUrl=" + "http://c.m.163.com/nc/article/list/T1348654105308/0-20.html" +"&callback=JSON_CALLBACK";
    function doRefresh() {
        $http({
            url:myUrl,
            method:'jsonp'
        }).then(function success(result) {
            var result =result.data.T1348654105308;
            result.splice(0,1);
            $scope.mine.newList = result;
            $timeout(function () {
                $scope.mine.firstLoad = true;
            },3000);
            $scope.$broadcast('scroll.refreshComplete');
        },function error(e) {
            console.log(e);
            $scope.$broadcast('croll.refreshComplete')
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
        var moreUrl = 'http://localhost:5000?myUrl=' + "http://c.3g.163.com/nc/article/list/T1348654105308/" + 0 + "-" + myService.num + ".html" + "&callback=JSON_CALLBACK";

        $http({
            url:moreUrl,
            method:'jsonp'
        }).then(function success(result) {

            myService.isFirst = true;
            $scope.mine.switch = true;
            $scope.mine.firstLoad = true;
            var result = result.data.T1348654105308;
            $scope.mine.newList = result;
            // console.log(result.length);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if(myService.num == 60){
                $scope.mine.firstLoad = false;
            }
        },function error(e) {
            console.log(e);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
}])
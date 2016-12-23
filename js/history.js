/**
 * 历史
 */
angular.module('historyApp',[])
.controller('historyController',['$scope','$state','$http','$timeout','myService',function ($scope,$state,$http,$timeout,myService) {
    
    $scope.mine = {
        doRefresh:doRefresh,
        newList:[],
        loadMore:loadMore,
        firstLoad:false,
        switch:true,
        goToDetail:function (str) {
            $state.go('tab.historyDetail',{docid:str})
        }
    };

    
    var myUrl = "http://localhost:5000?myUrl=" + "http://c.m.163.com/nc/article/list/T1368497029546/0-20.html" + "&callback=JSON_CALLBACK";

    function doRefresh() {
        $http({
            url:myUrl,
            method:'jsonp'
        }).then(function success(result) {
            var result = result.data.T1368497029546;
            // console.log(result);
            result.splice(0,1);
            $scope.mine.newList = result;
            $timeout(function (){
                $scope.mine.firstLoad = true;
            },3000);
            $scope.$broadcast('scroll.refreshComplete')
        },function error(e) {
            console.log(e);
            $scope.$broadcast('scroll.refreshComplete')
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
        var moreUrl = 'http://localhost:5000?myUrl=' + "http://c.3g.163.com/nc/article/list/T1368497029546/" + 0 + "-" + myService.num + ".html" + "&callback=JSON_CALLBACK";

        $http({
            url:moreUrl,
            method:'jsonp'
        }).then(function success(result) {

            myService.isFirst = true;
            $scope.mine.switch = true;
            $scope.mine.firstLoad = true;
            var result = result.data.T1368497029546;
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
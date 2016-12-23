/**
 * 网易主页面
 */
angular.module('headLineApp',[])
.controller('headLineController',['$scope','$state','$http','$timeout','myService',function ($scope,$state,$http,$timeout,myService) {
    // $scope.emitSome = function () {
    //     $scope.$emit('小明','1000元')
    // }
    $scope.mine = {
        doRefresh:doRefresh,
        loadMore:loadMore,
        firstLoad:false,
        switch:true,
        newList:[],
        goToDetail: function (str) {
            $state.go('tab.headDetail',{docid:str});
        }
    };

    var myUrl = 'http://localhost:5000?myUrl=' + "http://c.3g.163.com/nc/article/list/T1348648517839/0-20.html" + "&callback=JSON_CALLBACK";
    function doRefresh() {
        $http({
            url:myUrl,
            method:'jsonp'
        }).then(function success(result) {
            var  result = result.data.T1348648517839;
            result.splice(0,1);
            $scope.mine.newList = result;
            $timeout(function () {
              $scope.mine.firstLoad = true;
            },3000);
            $scope.$broadcast('scroll.refreshComplete');
        },function error(e) {
            console.log(e);
            $scope.$broadcast('scroll.refreshComplete');
        })
    }


    doRefresh();
    myService.num = 20;


    function loadMore() {
        // alert('success');
        if($scope.mine.firstLoad){
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.mine.firstLoad = false;
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
        var moreUrl ='http://localhost:5000?myUrl=' + "http://c.3g.163.com/nc/article/list/T1348648517839/" + 0 + "-" + myService.num + ".html" + "&callback=JSON_CALLBACK";
        $http({
            url:moreUrl,
            method:'jsonp'
        }).then(function success(result) {

            $scope.mine.firstLoad = true;
            $scope.mine.switch = true;
            myService.isFirst = true;

            var  result = result.data.T1348648517839;
            // console.log(result.length);

            $scope.mine.newList = result;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if(myService.num == 140){
                $scope.mine.firstLoad = false;
            }
        },function error(e) {
            console.log(e);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
    
}])
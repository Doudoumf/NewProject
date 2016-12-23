angular.module('greatApp',[])
    .controller('greatController',['$scope','$state','$http','$timeout','myService',function ($scope,$state,$http,$timeout,myService) {
        $scope.mine = {
            doRefresh:doRefresh,
            loadMore:loadMore,
            switch:true,
            firstLoat:false,
            newList:[],
            goToDetail:function (str) {
                $state.go('tab.greatDetail',{docid:str});
            }
        };

        function doRefresh() {
            $http({
                url:"http://localhost:5000?myUrl=" + "http://c.m.163.com/nc/article/list/T1444289532601/0-20.html" + "&callback=JSON_CALLBACK",
                method:'jsonp'
            }).then(function success(result) {
                var result = result.data.T1444289532601;
                result.splice(0,1);
                $scope.mine.newList = result;
                // console.log(result);
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

            myService.num += 10;
            var moreUrl = 'http://localhost:5000?myUrl=' + "http://c.3g.163.com/nc/article/list/T1444289532601/" + 0 + "-" + myService.num + ".html" + "&callback=JSON_CALLBACK";

            $http({
                url:moreUrl,
                method:'jsonp'
            }).then(function success(result) {

                myService.isFirst = true;
                $scope.mine.switch = true;
                $scope.mine.firstLoad = true;
                var result = result.data.T1444289532601;
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


    }]);
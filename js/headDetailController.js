/**
 * 网易详情页
 */
angular.module('headDetailApp',[])
.controller('headDetailController',['$scope','$http','$state','$stateParams','$sce',function ($scope,$http,$state,$stateParams,$sce) {
    console.log( $stateParams);
    $scope.mine = {
        title:'',
        time:'',
        source:'',
        content:'',
        goBack:goBack
    };
    function goBack() {
        $state.go('tab.headLine');
    }


    (function () {
        var promise = $http({
            method:'jsonp',
            url:'http://localhost:5000?myUrl=' +'http://c.3g.163.com/nc/article/' + $stateParams.docid +"/full.html&callback=JSON_CALLBACK"
        });
        promise.success(function (result) {

            // console.log('这是精选详情页面的输出');

             result = result[$stateParams.docid];

            // console.log(result);

            $scope.mine.title = result;

            $scope.mine.title = result.title;

            $scope.mine.time = result.ptime;

            $scope.mine.source = result.source;

            if(result.img&&result.img.length){

                for(var i in result.img){
                    // var width = result.img[i].pixel.split['*'][0];

                    // var height = result.img[i].pixel.split['*'][1];

                    var str = "<img src=" + JSON.stringify(result.img[i].src) +
                            "style='width:395px;height:350px;'" +">";

                    result.body = result.body.replace(result.img[i].ref,str);
                }

            }

            $scope.mine.content = $sce.trustAsHtml(result.body);

        });
        promise.error(function (e) {
            console.log(e);
        })
    })();


}]);
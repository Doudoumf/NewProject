/**
 * 历史详情页
 */
angular.module('historyDetailApp',[])
.controller('historyDetailController',['$scope','$http','$sce','$stateParams',function ($scope,$http,$sce,$stateParams) {
    $scope.mine = {
        title:'',
        source:'',
        time:'',
        content:''
    };

    (function () {
        $http({
     url:'http://localhost:5000?myUrl=' + "http://c.m.163.com/nc/article/" +$stateParams.docid +"/full.html&callback=JSON_CALLBACK",
            method:'jsonp'
        }).then(function success(result) {
            // console.log(result);
            var result = result.data;
            result = result[$stateParams.docid];
            $scope.mine.title = result.title;
            $scope.mine.time = result.time;
            $scope.mine.source = result.ptime;
            if(result.img&&result.img.length){
                for(var i in result.img){
                    var str = "<img src=" + JSON.stringify(result.img[i].src) + "style='widht:335px;height:350px'" +">";
                    result.body = result.body.replace(result.img[i].ref,str);
                }
            }
            $scope.mine.content = $sce.trustAsHtml(result.body);
                },function error(e) {
            console.log(e);
        })
    })()
}])

angular.module('greatDetailApp',[])
.controller('greatDetailController',['$scope','$http','$stateParams','$sce',function ($scope,$http,$stateParams,$sce) {
    $scope.mine = {
        title:'',
        source:'',
        time:'',
        content:'',
    };

    (function () {
        $http({
            url:'http://localhost:5000?myUrl=' + "http://c.m.163.com/nc/article/" +$stateParams.docid + "/full.html&callback=JSON_CALLBACK",
            method:'jsonp'
        }).then(function success(result) {
            var result = result.data;
                result = result[$stateParams.docid];
            // console.log("greatDetail这是网易输出的")
            // console.log(result);
            $scope.mine.title = result.title;
            $scope.mine.source = result.source;
            $scope.mine.time = result.ptime;
            if(result.img&&result.img.length){
                for(var i in result.img){
                    var str = "<img src=" + JSON.stringify(result.img[i].src) + "style='width:395px;height:350px'" +">";
                    result.body = result.body.replace(result.img[i].ref,str);
                }
            }
            $scope.mine.content = $sce.trustAsHtml(result.body);
        },function error(e) {
            console.log(e);
        })

    })()

}])
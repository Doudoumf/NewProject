// 百科---图片轮播详情
 
angular.module('concernDetailApp',[])
    .controller('concernDetailController',['$scope','$stateParams','$http','$sce',function ($scope,$stateParams,$http,$sce) {
        $scope.mine = {

        };

        (function () {
            $http({
                url:"http://localhost:5000?myUrl=" + "http://topic.comment.163.com/topic/subject/details/" + $stateParams.docid +"&callback=JSON_CALLBACK",
                method:'jsonp'
            }).then(function success(result) {
                // console.log(result);
            },function error(e) {
                console.log(e);
            })
        })();

    }])
/**
 * 话题--话题
 */
angular.module('themeApp',[])
.controller('themeController',['$scope','$state','$http',function ($scope,$state,$http) {
    $scope.mine = {
        newList:[],
        name:'',
        talkContentOne:'',
        userHeadOne:'',
        talkContentTwo:'',
        userHeadTwo:'',
        goToDetail:function (str) {
            goToDetail('tab.themeDetailController',{docid:str});
        }
    };

    (function () {
        $http({
            url:'http://localhost:5000?myUrl=' + "http://topic.comment.163.com/topic/list/subject/0-10.html" + "&callback=JSON_CALLBACK",
            method:'jsonp'
        }).then(function  success(result) {
            console.log(result);
            var result = result.data.data.subjectList;
            // result.splice(0,1);
            $scope.mine.newList = result;
            for(var i in result){
                $scope.mine.name = result[i].name;
                $scope.mine.talkContentOne = result[i].talkContent[0].content;
                $scope.mine.talkContentTwo =result[i].talkContent[1].content;
                // console.log('hehe')
                // console.log($scope.mine.talkContentOne);
                // console.log($scope.mine.talkContentTwo);


                if(result[i].talkContent[0].userHeadPicUrl&&result[i].talkContent[0].userHeadPicUrl.length){
                    $scope.mine.userHeadOne = result[i].talkContent[0].userHeadPicUrl;
                }else{

                }
                if(result[i].talkContent[1].userHeadPicUrl&&result[i].talkContent[1].userHeadPicUrl.length){
                    $scope.mine.userHeadTwo = result[i].talkContent[1].userHeadPicUrl;
                }else{

                }
                // console.log('DADA')
                // console.log($scope.mine.userHeadOne);
                // console.log($scope.mine.userHeadTwo);
            }

        },function error(e) {
            console.log(e);
        })
    })();

}])
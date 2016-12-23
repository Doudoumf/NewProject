/**
 * 话题
 */
angular.module('questionApp',[])
.controller('questionController',['$scope','$http','$state',function ($scope,$http,$state) {

    $scope.mine = {
        newList:[],
        createTime:'',
        headpicutl:'',
        name:'',
        title:'',
        picurl:'',
        alias:'',
        classification:'',
        concernCount:'',
        questionCount:'',
        // expertId:'',
        goToDetail:function (str) {
            $state.go('tab.questionDetail',{docid:str});
        }
    };
    
    
    
    
    
    
    
    
    (function () {
        var promise = $http({
            url:'http://localhost:5000?myUrl=' + "http://c.3g.163.com/newstopic/list/expert/5bmz6aG25bGx/0-10.html" + "&callback=JSON_CALLBACK",
            method:'jsonp'
        });

        promise.success (function (result) {
            // console.log(result);
            var result = result.data.expertList;
            $scope.mine.newList = result;
            // console.log('newList打印');
            // console.log(result);
            $scope.mine.createTime = result.createTime;
            $scope.mine.headpicutl = result.headpicutl;
            $scope.mine.name = result.name;
            $scope.mine.title = result.title;
            $scope.mine.picurl =result.picurl;
            $scope.mine.alias = result.alias;
            $scope.mine.classification = result.classification;
            $scope.mine.concernCount = result.concernCount;
            $scope.mine.questionCount = result.questionCount;
            // $scope.mine.expertId = result.expertList[i].expertId;

        });

        promise.error (function (e) {
            console.log(e);
        })
    })();

}])
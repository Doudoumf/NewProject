/**
 * 主页面
 */
angular.module('navApp',[])
.controller('navController',['$scope','$state',function ($scope,$state) {
    $scope.mine = {
        titleData:['哒哒趣闻','家居','历史','漫画'],
        changePath:changePath,
        topicTitle:['问吧','话题','百科'],
        topicChangePath:topicChangePath
    };
    /**
     * 
     * @param str
     */



var button = document.getElementById('changePath');
    function changePath(str) {
        if(str == '哒哒趣闻'){
            $state.go('tab.great');
        }
        
        if(str == '家居'){
            $state.go('tab.home');
        }
        if(str == '历史'){
            $state.go('tab.history');
        }
        if(str == '漫画'){
            $state.go('tab.cartoon');
        }
    }


    function topicChangePath(str) {
        if(str == '问吧'){
            $state.go('tab.question');
        }
        if(str == '话题'){
            $state.go('tab.theme');
        }
        if(str == "百科"){
            $state.go('tab.concern')
        }
    }



}]);

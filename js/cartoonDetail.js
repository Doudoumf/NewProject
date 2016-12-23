/**
 * 漫画详情页
 */
angular.module('cartoonDetailApp',[])
.controller('cartoonDetailController',['$scope','$http','$sce','$stateParams',function ($scope,$http,$sce,$stateParams) {


   
    $scope.mine = {
        title:'',
        time:'',
        source:'',
        content:'',
        goBack:function () {
            window.history.go(-1);
        }
    };

    // console.log("http://c.3g.163.com/nc/article/" + $stateParams.docid + "/full.html");
    (function () {
       $http({
           url:'http://localhost:5000?myUrl=' + "http://c.3g.163.com/nc/article/" + $stateParams.docid + "/full.html&callback=JSON_CALLBACK",
           method:'jsonp'
       }).then(function success(result) {
           // console.log("*************cartoonDetail输出的内容");
           var result = result.data;
           // result.splice(0,1);
           result = result[$stateParams.docid];
           console.log(result);
           result = result.body;
           result = JSON.stringify(result);
           result = result.split("<p>")[1];
           result = result.toString().replace(/^\s+|\s+$/g,"");
           result = result.substring(0,result.length-4);
           console.log(result);
           $scope.cartoonHtml = $sce.trustAsResourceUrl(result);

       },function error(e) {
           console.log(e);
       })
    })()
}])
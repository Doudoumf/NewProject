/**
 * 导航通过URLs来控制试图，路由使多个模块呈现在一个页面
 */
angular.module('myApp',['ionic','tabBarApp',"headLineApp",'headDetailApp','questionApp','questionDetailApp','historyApp','historyDetailApp','greatApp','greatDetailApp','homeApp','homeDetailApp','navApp','mineApp','cartoonApp','cartoonDetailApp','themeApp','themeDetailApp','concernApp','concernDetailApp','serviceApp'])
    // [ ] 里的模块表示模块之间的依赖关系
.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider   //查询页面状态值，加载页面到<ion-nav-view>
        .state('tab',{
            url:'/tab',
            cache:false, //不使用缓存，如果为true,缓存AJAX结果
            templateUrl:'templates/tab.html', // 模板
            abstract:true, //抽象模板，传递作用域变量$scope给子模板
            controller:'tabBarController'
        })

    .state('tab.headLine',{
        url:'/headLine',
        views:{
            "tab-news":{
                templateUrl:'templates/headLine.html',
                controller:'headLineController'
            }
        }
    })

        .state('tab.headDetail',{
            url:'/headDetail',
            views:{
                'tab-news':{
                    templateUrl:'templates/headDetail.html',
                    controller:'headDetailController'
                }
            },  
            params:{   // 表示函数的参数是可变的
                docid:''
            }
        })
        .state('tab.question',{
            url:'/question',  
            views:{
                'tab-topic':{
                    templateUrl:'templates/question.html',
                    controller:'questionController'
                }
            }
        })

        .state('tab.questionDetail',{
            url:'/questionDetail',
            params: {
                docid: ''
            },
            views:{
                'tab-topic':{
                    templateUrl:'templates/questionDetail.html',
                    controller:'questionDetailController'
                }
            }
        })
        
        
        .state('tab.theme',{
            url:'/theme',
            views:{
                'tab-topic':{
                    templateUrl:'templates/theme.html',
                    controller:'themeController'
                }
            }
        })


        .state('tab.themeDetail',{
            url:'themeDetail/:docid',
            views:{
                'tab-topic':{
                    templateUrl:'templates/themeDetail.html',
                    controller:'themeDetailController'
                }
            }
        })


        .state('tab.concern',{
            url:'concern',
            views:{
                'tab-topic':{
                    templateUrl:'templates/concern.html',
                    controller:'concernController'
                }
            }
        })

        .state('tab.concernDetail',{
            url:'concernDetail/:docid',
            views:{
                'tab-topic':{
                    templateUrl:'templates/concernDetail.html',
                    controller:'concernDetailController'
                }
            }
        })
        
        
        
        .state('tab.history',{
            url:'/history',
            views:{
                'tab-news':{
                    templateUrl:'templates/headLine.html',
                    controller:'historyController'
                }
            }
        })
        
        .state('tab.historyDetail',{
            url:'/historyDetail/:docid',
            views:{
                'tab-news':{
                    templateUrl:'templates/headDetail.html',
                    controller:'historyDetailController'
                }
            }
        })
        .state('tab.great',{
            url:'/great',
            views:{
                'tab-news':{
                    templateUrl:'templates/headLine.html',
                    controller:'greatController'
                }
            }
        })

        
        .state('tab.greatDetail',{
            url:'/greatDetail/:docid',
            views:{
                'tab-news':{
                    templateUrl:'templates/headDetail.html',
                    controller:'greatDetailController'
                }
            }
        })
        .state('tab.home',{
            url:'/home',
            views:{
                'tab-news':{
                    templateUrl:'templates/headLine.html',
                    controller:'homeController'
                }
            }
        })

        .state('tab.homeDetail',{
            url:'/homeDetail/:docid',
            views:{
                'tab-news':{
                    templateUrl:'templates/headDetail.html',
                    controller:'homeDetailController'
                }
            }
        })


        .state('tab.cartoon',{
            url:'/cartoon',
            views:{
                'tab-news':{
                    templateUrl:'templates/headLine.html',
                    controller:'cartoonController'
                }
            }
        })

        .state('tab.cartoonDetail',{
            url:'/cartoonDetail/:docid',
            views:{
                'tab-news':{
                    templateUrl:'templates/cartoonDetail.html',
                    controller:'cartoonDetailController'
                }
            }
        })





        .state('tab.mine',{
            url:'/mine',
            views: {
                'tab-mine':{
                    templateUrl:'templates/mine.html',
                    controller:'mineController'
                }
            }
        })

    
    
        $urlRouterProvider.otherwise('/tab/headLine');
}]);
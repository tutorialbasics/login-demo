var demoapp =  angular.module('demoapp',['ngRoute']);

demoapp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/demoapp',{
		templateUrl: 'src/demoapp/demoapp.html',
        controller: 'demoController'
		
	}).otherwise({ redirectTo: '/demoapp' });
}]);

demoapp.controller('demoController',function($scope){
	//controller code here...
});
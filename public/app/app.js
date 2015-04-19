angular.module('myApp',[
	'ngRoute']);


$locationProvider.html5Mode(true);
$routeProvider
		.when('/home',	{
				templateUrl:'views/pages/home',
				controller:	'homeController',
				controllerAs:'home'
		});


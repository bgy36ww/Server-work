
var app = angular.module('clicker',['ngResource','ngRoute','ngAnimate']);

app.controller('Testing',function(){});

app.controller('UserController', function($scope,$http,$resource,gameData){
	
	this.nm = "";
	$scope.tries = gameData.helloworld();
	$scope.userdata;
	var respc;
	var serviceResponse;
	var verify = $resource('/api/fetch');
	$scope.loaded = false;
	
	$scope.addName = function() {
		$scope.tries = this.nm;

		serviceResponse = gameData.login({test: $scope.tries});
		$scope.tries = "";
		serviceResponse.then(function(){
			$scope.tries = gameData.returnName();
			$scope.loaded = true;
		});

	};
	$scope.reName = function() {
		gameData.logout();
		$scope.loaded = false;
		this.nm = "";
		$scope.tries = 'Stranger';
	};
});

app.controller('keyboardController', function($rootScope,$scope,gameData){
	this.lines = [''];
	this.line = 0;
	this.capslock = false;
	this.lowercase = true;
	$scope.score = gameData.viewScore();
	var loggedIn = false;
	
	$scope.logOff = function(){
		loggedIn = false;
	};
	
	var updateScore = function(){
		$scope.score = gameData.viewScore();
	};

	var runListener = $scope.$on('updateScore',updateScore);



	$scope.logIn = function(){
		loggedIn = true;
	};

	this.getKey = function(letter) {
		if(loggedIn) {
			if(letter.keyCode > 47 && letter.keyCode <91) {
				if(this.lowercase) {
					this.lines[this.line] = this.lines[this.line].concat(String.fromCharCode(letter.keyCode).toLowerCase());
				} else {
					this.lines[this.line] = this.lines[this.line].concat(String.fromCharCode(letter.keyCode));	
				}
				gameData.keyScore();
			} else if(letter.keyCode == 16) {
				this.lowercase = false;
			} else if(letter.keyCode == 32) {
				this.lines[this.line] = this.lines[this.line].concat(String.fromCharCode(160));
				gameData.keyScore();
			}

			if(this.lines[this.line].length >= 10) {
				this.lines.push('');
				this.line = this.line + 1;
			}
			
			if(this.line >= 9) {
				this.lines = this.lines.slice(1);
				this.line--;
			}
		} 
	};
	
	this.shiftRelease = function(letter) {
		if(letter.keyCode == 16) {
			this.lowercase = true;	
		}
	};

});

app.controller('saveController',function($rootScope,$resource){

var saveb = $resource('/api/meetups');



	$rootScope.debugg="test";



	this.saveName=function(){





		var newName =new saveb();

        var test=$resource('/api/meetups');
		var test2=test.get({name:$rootScope.nm},function(){});

		console.log(test2);

		newName.$get({name:$rootScope.nm});




		console.log($rootScope.nm);


		newName.name=$rootScope.nm;
		newName.score=$rootScope.score;
		newName.rate=$rootScope.rate;

		var uptmp=[];
		var i=0;
		for (var objj in $rootScope.upgrades)
		{
			uptmp[i]=$rootScope.upgrades[objj].lvl||0;
			i++;
		}

		newName.upgrades=uptmp;
		$rootScope.debugg=newName;
		newName.$save();



	};



	

});



app.controller('rateController',function($rootScope,$interval){
	var run;
	this.test = "ok";
	this.addRate = function() {
		$rootScope.score = $rootScope.score + $rootScope.rate;
	};

	run = $interval(this.addRate,1000);

});

app.controller('upgradeController', function($scope,gameData,$rootScope){
	$scope.upgrades = gameData.upgradeList();
	$scope.rate = gameData.rateUpdate();
	var nUps = $scope.upgrades.length;
	var upgradeListeners = [];
	var n = 0;

	var testFunction = function(event){
		var whichUpgrade = event.name.substring(0,1);
		$scope.upgrades[whichUpgrade].lvl = gameData.upgradeUpdate(whichUpgrade);
	};

	for( n = 0 ; n < nUps ; n ++) {
		$rootScope.$on(n+$scope.upgrades[n].name,testFunction);
	}

	var updateUpgrades = function(){
		console.log('hello');
		$scope.upgrades[n].lvl = gameData.upgradeUpdate(n);
		$scope.rate = gameData.rateUpdate();
	};

	$scope.suckyUp = function(n){
		gameData.upgrade(n);		
	};
});


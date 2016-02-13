
var app = angular.module('clicker',['ngResource','ngRoute']);

app.controller('Testing',function(){});

app.controller('UserController', function($scope,$rootScope,$http,$resource,gameData){
	
	this.nm = "";
	$scope.tries = gameData.helloworld();
	$scope.userdata;
	var respc;
	var serviceResponse;
	var verify = $resource('/api/fetch');
	$scope.loaded = false;
	$rootScope.loggedin = false;
	
	
	$scope.addName = function() {
		$scope.tries = this.nm;

		serviceResponse = gameData.login({test: $scope.tries});
		$scope.tries = "";
		serviceResponse.then(function(){
			$scope.tries = gameData.returnName();
			$scope.loaded = true;
		});
		$rootScope.loggedin
		//var temp = new verify();
		//respc = temp.$save();

		$rootScope.loggedin = gameData.loggedin;



	};
	$scope.reName = function() {
		$rootScope.loggedin = false;
		$scope.loaded = false;
		this.nm = "";
		$scope.tries = 'Stranger';
	};
});

app.controller('keyboardController', function($rootScope, $scope){
	this.lines = [''];
	this.line = 0;
	$rootScope.score = 0;
	this.capslock = false;
	this.lowercase = true;
	var loggedIn = false;
	$scope.logOff = function(){
		loggedIn = false;
	};
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
				$rootScope.score = $rootScope.score + $rootScope.letterValue;
			} else if(letter.keyCode == 16) {
				this.lowercase = false;
			} else if(letter.keyCode == 32) {
				this.lines[this.line] = this.lines[this.line].concat(String.fromCharCode(160));
				$rootScope.score = $rootScope.score + $rootScope.letterValue;
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
			uptmp[i]=$rootScope.upgrades[objj].lvl;
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

app.controller('upgradeController', function($rootScope){
	var upgradelist = [
		{id: 0, lvl: 0, rate: 1,cost: 1, name: 'Sucky Writer'},
		{id: 1, lvl: 0, rate: 5,cost: 4, name: 'OK Writer'},
		{id: 2, lvl: 0, rate: 1,cost: 10, name: 'Improved Typing'}
	];
	this.upgrades = upgradelist;
	this.adding;
	$rootScope.letterValue = 1;	
	$rootScope.rate = 0;

	this.suckyUp = function(n){
		
		if($rootScope.score >= this.upgrades[n].cost) {
			this.upgrades[n].lvl++;
			if(n == 2) {
				$rootScope.letterValue = 1 + this.upgrades[2].rate * this.upgrades[2].lvl;
			} else {
				$rootScope.rate = $rootScope.rate + this.upgrades[n].cost;	
			}
			
			$rootScope.score = $rootScope.score - this.upgrades[n].cost;
		}
		$rootScope.upgrades=this.upgrades;
		
	};


});


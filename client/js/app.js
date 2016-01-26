(function() {

var app = angular.module('clicker',['ngResource']);

app.controller('Testing',function(){});

app.controller('UserController', function($rootScope,$resource){
	this.nm = "";
	this.tries ='Stranger';
	$rootScope.loggedin = false;
	this.addName = function() {

		this.tries = this.nm;
		$rootScope.nm=this.nm;
		$rootScope.new=true;
		var saveb = $resource('/api/meetups');


		$rootScope.name1=saveb.$find({name:this.nm});
        if ($rootScope.name1==null)
		{
			$rootScope.new=false;
		}

		$rootScope.loggedin = true;
	};
	this.reName = function() {
		$rootScope.loggedin = false;
		this.nm = "";
		this.tries = 'Stranger';
	};
});

app.controller('keyboardController', function($rootScope){
	this.lines = [''];
	this.line = 0;
	$rootScope.score = 0;
	this.capslock = false;
	this.lowercase = true;
	
	this.getKey = function(letter) {
		if($rootScope.loggedin) {
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



	saveb.query(function (results) {
		$rootScope.meetups = results;
	});

	$rootScope.debugg="test";


	$rootScope.meetups = [];

	this.saveName=function(){
		if ($rootScope.new){
			var newName =new saveb();	}
		else {
			var newName=$rootScope.name1;
		}
		$rootScope.debugg="good";


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
		$rootScope.debugg=uptmp;
		newName.upgrades=uptmp;
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

	var upgradelist = [
		{id: 0, lvl: 0, rate: 1,cost: 1, name: 'Sucky Writer'},
		{id: 1, lvl: 0, rate: 5,cost: 4, name: 'OK Writer'},
		{id: 2, lvl: 0, rate: 1,cost: 10, name: 'Improved Typing'}
	];
})();
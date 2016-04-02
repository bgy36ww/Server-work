
app.service('gameData',function($http,$q,$interval,$rootScope){
	
	var username = "";
	var loading = false;
	var userdata;
	var defer = $q.defer();
	var loaded = false;
	var rate = 0;
	var score = 0;
	var run;

	var uplist = [
		{id: 0, lvl: 0, rate: 1,cost: 1, name: 'Sucky Writer'},
		{id: 1, lvl: 0, rate: 5,cost: 4, name: 'OK Writer'},
		{id: 2, lvl: 0, rate: 1,cost: 10, name: 'Improved Typing'}
	];

	this.returnName = function() {
		return username;
	};

	this.returnLogged = function() {
		return loaded;
	};

	this.helloworld = function() {
		return "helloworld";
	};

	this.login = function(userInfo) {
		return $http.post('/api/fetch',userInfo).then(function( response ) {
			console.log(response.data);
			userdata = response.data;
			loaded = true;
			username = userdata[0].name;
			scoreInterval();
			return true;
		});

	};

	var scoreInterval = function(){
		run = $interval(rateScore,1000);
	};

	this.logout = function(){
		loaded = false;
		$interval.cancel(run);
	};

	this.upgradeList = function(){
		return uplist;
	};

	this.keyScore = function(){
		score = score + 1 + uplist[2].rate * uplist[2].lvl;
		scoreBroadcast();
	};

	var rateScore = function(){
		score = score + rate;
		scoreBroadcast();
	};

	this.viewScore = function(){
		return score;
	};

	this.upgrade = function(n){
		
		if( score >= uplist[n].cost) {
			console.log('tried to upgrade');
			uplist[n].lvl++;
			if(n != 2) {
				rate = rate + uplist[n].rate;
			}
			score = score - uplist[n].cost;
			scoreBroadcast();
			upgradeBroadcast(n);
		}
	};

	this.rateUpdate = function(){
		console.log('rate returned');
		return rate;
	};

	this.upgradeUpdate = function(n){
		return uplist[n].lvl;

	};

	var scoreBroadcast = function(){
		$rootScope.$broadcast('updateScore');
	}

//	var rateBroadcast = function(){
//		console.log('broadcast rate update');
//	}

	var upgradeBroadcast = function(n){
		console.log(uplist[n].name + ' broadcast');
		$rootScope.$broadcast(n+uplist[n].name);
	};

});
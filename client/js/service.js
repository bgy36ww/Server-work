
app.service('gameData',function($http,$q,$interval,$rootScope){
	
	var username = "";
	var loading = false;
	var userdata;
	var defer = $q.defer();
	var loaded = false;
	var rate = 100;
	var score = 0;
	var run;

	run = $interval(rateScore,1000);

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

			return true;
		});
	};

	this.logout = function(){
		loaded = false;
	};

	this.upgradeList = function(){
		return uplist;
	};

	this.keyScore = function(){
		score = score + uplist[2].rate;
		console.log(score);
		$rootScope.$broadcast('updateScore');
	};

	var rateScore = function(){
		score = score + rate;
		$rootScope.$broadcast('updateScore');
		console.log('rateadd');
	};

	this.viewScore = function(){
		return score;
	};
});
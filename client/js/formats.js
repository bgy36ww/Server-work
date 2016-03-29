
var gameHeight = function() {
	var screenheight = window.innerHeight;
	var navbarheight = document.getElementById('TitleBar').clientHeight;

	document.getElementById('sidebar').style.height = screenheight - navbarheight + "px";
	document.getElementById('gameScreen').style.height = screenheight - navbarheight + "px";
	console.log(document.getElementById('gameScreen').style.height);
};

var gamePos = function() {
	var gameHeight = document.getElementById('gameScreen').clientHeight;
	var gameWidth = document.getElementById('gameScreen').clientWidth;
	var imgHeight = document.getElementById('mainTree').clientHeight;
	var imgWidth = document.getElementById('mainTree').clientWidth;

	console.log(imgWidth);
	console.log(document.getElementById('mainTree').style.height);
	document.getElementById('mainTree').style.left = gameWidth / 2 - imgWidth / 2 + 'px';
	document.getElementById('mainTree').style.top = 5 * gameHeight / 8 + 'px';


}
gameHeight();
gamePos();
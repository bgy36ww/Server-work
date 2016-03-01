
var formatting = function() {
	var screenheight = window.innerHeight;
	var navbarheight = document.getElementById('TitleBar').clientHeight;
	console.log(screenheight);
	console.log(navbarheight);
	document.getElementById('sidebar').style.height = screenheight - navbarheight + "px";
	console.log(screenheight - navbarheight);
	console.log(document.getElementById('sidebar').clientHeight);
};
formatting();
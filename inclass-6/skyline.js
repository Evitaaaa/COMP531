'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	// information of each building
	var startXArr = new Array();
	var widthArr = new Array();
	var heightArr = new Array();
	var colorArr = new Array();
	var index = 1;

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width;
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10);
		var blgHeight = Math.random()*canvas.height/2;

		//draw building
		var bdColor = Math.floor(Math.random()*blgColors.length);
		c.fillStyle= blgColors[ bdColor];
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)

		//record the information of the building
		startXArr[index] = x0;
		widthArr[index] = blgWidth;
		heightArr[index] = blgHeight;
		colorArr[index] = bdColor;
		index++; 
		drawWin(index - 1);
	}

	function draw(i){
		var xStartNew = startXArr[i];
		var yStartNew = floor - heightArr[i] - 30;
		var widthNew = widthArr[i];
		var colorNew = colorArr[i];

		//draw building
		c.fillStyle = blgColors[colorNew];
		c.fillRect(xStartNew, yStartNew, widthNew, 30);

		//draw window
		drawWin(i);
		heightArr[i] = heightArr[i] + 30;


	}
	var grow = function(event){
		var x = event.x;
		var y = event.y - 50;
		//search
		for (var i = 1; i < index; i++){
			if( (x >= startXArr[i] && x <= startXArr[i] + widthArr[i]) &&
			     (y >= floor - heightArr[i] && y <= floor) ){
				draw(i);
			}
		}
	};
	canvas.addEventListener("mousedown", grow);

	
	var drawBld = function(i){

		var xStart = startXArr[i];
		var h = heightArr[i];
		var w = widthArr[i];

		var bdColor = Math.floor(Math.random()*blgColors.length);
		c.fillStyle= blgColors[ bdColor];
		c.fillRect(xStart, floor - h, w, h);
		drawWin(i);
	}
	var drawAllBld = function(i){
		for (var i = 1; i < index; i++){
			drawBld(i);
		}
	}

	var drawWin = function(i){
		var xStart = startXArr[i];
		var h = heightArr[i];
		var w = widthArr[i];

		
		for (var y = floor - floorSpacing; y > floor - h + (floorSpacing + windowHeight); y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < w - windowWidth; x += windowSpacing + windowWidth) {
				if(Math.random() < 0.5){
					c.fillStyle="yellow";
				}
				else{
					c.fillStyle="black";
				}
				c.fillRect(xStart + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	var drawAllWin = function(){
		for (var i = 1; i < index; i++){
			drawWin(i);
		}
	}

	//var inter1 = setInterval(drawAllBld, 100);

	// draw car
	var carMove = 0;
	var car = document.getElementById("car");
	var drawCar = function(){
		c.drawImage(car, carMove, 340, 100, 60);
		if(carMove < 800){
			carMove = carMove + 50;
		}
		else{
			carMove = 0;
		}
	}

	var sunX = 0;
	var sunY = 10;
	var flu = 0
	var sun = document.getElementById("sun");
	var drawSun = function(){
		c.drawImage(sun, sunX, sunY, 50, 50);
		if(sunX < 800){
			sunX = sunX + 10;
		}
		else{
			sunX = 0;
		}
		if(flu == 0){
			sunY  = 40;
			flu = 1;
		}
		else{
			sunY = 10;
			flu = 0;
		}
	}



	var drawAll = function(){
		c.fillStyle = "white";
	    c.fillRect(0, 0, 800, 400);
		drawAllBld();
		drawCar();
		drawSun();
	}
	var inter = setInterval(drawAll, 100);



	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"));
	document.getElementById("build").onclick = app.build;

}



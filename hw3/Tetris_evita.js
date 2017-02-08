
//the play board
var boardGui = document.getElementById("playBoard"); 
var boardRcd = new Array(20);
//the score
var score = 0;
var scoreGui = document.getElementById("score"); 

//btn
var startBtn = document.getElementById("startBtn"); 
//alert
var alertGui = document.getElementById("alert"); 
//interval to control going down
var interval;
var time = 1000;
//0: not start game; 1: start game; 2 stop game
var status = 0;
// currentBlock
var currentBlock = null;
var tmpBlock = new Array(4);


//initialization
for(var rows = 0; rows < 20; rows++){
	boardRcd[rows] = new Array(10);
	for(var cols = 0; cols < 10; cols++){
		boardRcd[rows][cols] = 0;
	}
}

for(var i = 0; i < 4; i++){
	tmpBlock[i] = {x : 0, y : 0};
}


//make new block, if we cannot ake new block, return false
function makeBlock(){
	currentBlock = null;
	currentBlock = new Array(4);
	var type = Math.floor(Math.random() * 7);
	if(type == 0){
		currentBlock[0] = {x : 0, y : 3};
		currentBlock[1] = {x : 0, y : 4};
		currentBlock[2] = {x : 0, y : 5};
		currentBlock[3] = {x : 0, y : 6};
	}
	else if(type == 1){
		currentBlock[0] = {x : -2, y : 5};
		currentBlock[1] = {x : -1, y : 4};
		currentBlock[2] = {x : -1, y : 5};
		currentBlock[3] = {x : 0, y : 4};
	}
	else if(type == 2){
		currentBlock[0] = {x : -2, y : 4};
		currentBlock[1] = {x : -1, y : 4};
		currentBlock[2] = {x : -1, y : 5};
		currentBlock[3] = {x : 0, y : 5};
	}
	else if(type == 3){
		currentBlock[0] = {x : -1, y : 4};
		currentBlock[1] = {x : -1, y : 5};
		currentBlock[2] = {x : 0, y : 4};
		currentBlock[3] = {x : 0, y : 5};		
	}
	else if(type == 4){
		currentBlock[0] = {x : -2, y : 4};
		currentBlock[1] = {x : -1, y : 4};
		currentBlock[2] = {x : 0, y : 4};
		currentBlock[3] = {x : 0, y : 5};		
	}
	else if(type == 5){
		currentBlock[0] = {x : -2, y : 5};
		currentBlock[1] = {x : -1, y : 5};
		currentBlock[2] = {x : 0, y : 4};
		currentBlock[3] = {x : 0, y : 5};		
	}
	else if(type == 6){
		currentBlock[0] = {x : -1, y : 4};
		currentBlock[1] = {x : 0, y : 3};
		currentBlock[2] = {x : 0, y : 4};
		currentBlock[3] = {x : 0, y : 5};		
	}

	return validPos(currentBlock);
}

//set interval to keep the block going down and update its status as well as score
function goDown(){
	if(touchBottom()){
		clearInterval(interval); 
		addBlockToBrd();
		if(clearLine() > 0){
			clearBoard();
			paintBoard();
		}
		if(hitUpper()){
			
			alert("Game over!"); 
			startBtn.value = "New Round";
			status = 2; 
			return;
		}
		else{
			makeBlock();
		}
		paintBlock();
		interval = setInterval(goDown, time);		
	}
	else{
		clearBlock();
		for(var i = 0; i < 4; i++){
			currentBlock[i].x = currentBlock[i].x + 1;
		}
		paintBlock();
	}
}

function rotate(){
	var roBlock = new Array(4);
	for(var i = 0; i < 4; i++){
		roBlock[i] = {x : 0, y : 0};
	}
	var centerX = Math.round((currentBlock[0].x + currentBlock[1].x + currentBlock[2].x + currentBlock[3].x) / 4 );
	var centerY = Math.round((currentBlock[0].y + currentBlock[1].y + currentBlock[2].y + currentBlock[3].y) / 4 );
	for(var i = 0; i < 4; i++){
		roBlock[i].x = - currentBlock[i].y +  centerX + centerY;
		roBlock[i].y = currentBlock[i].x - centerX + centerY;
	}
	if(!validPos(roBlock)){
		return ;
	}
	clearBlock();
	for(var i = 0; i < 4; i++){
		currentBlock[i].x = roBlock[i].x;
		currentBlock[i].y = roBlock[i].y;
	}
	paintBlock();
}

function goLeft(){
	if(!hitLeft()){
		clearBlock();
		for(var i = 0; i < 4; i++){
			currentBlock[i].y--;
		}
		paintBlock();
	}
}

function goRight(){
	if(!hitRight()){
		clearBlock();
		for(var i = 0; i < 4; i++){
			currentBlock[i].y++;
		}
		paintBlock();
	}
}

function hitLeft(){
	for(var i = 0; i < 4; i++){
		if(currentBlock[i].y  == 0){
			return true;
		}
		tmpBlock[i].x = currentBlock[i].x;
		tmpBlock[i].y = currentBlock[i].y - 1;
	}
	if(!validPos(tmpBlock)){
		return true;
	}
	return false;
}

function hitRight(){
	for(var i = 0; i < 4; i++){
		if(currentBlock[i].y  == 9){
			return true;
		}
		tmpBlock[i].x = currentBlock[i].x;
		tmpBlock[i].y = currentBlock[i].y + 1;
	}
	if(!validPos(tmpBlock)){
		return true;
	}
	return false;
}

function validPos (currentBlock){
	//check boundary
	//checl if it is occupied
	for(var i = 0; i < 4; i++){
		if(currentBlock[i].x < 0){
			continue;
		}
		if(currentBlock[i].x > 19 || currentBlock[i].y < 0 || currentBlock[i].y > 9){
			return false;
		}
		if(boardRcd[currentBlock[i].x][currentBlock[i].y] == 1){
			return false;
		}
	}
	return true;
}

function touchBottom(){
	for(var i = 0; i < 4; i++){
		if(currentBlock[i].x < 0){
			continue;
		}
		if(currentBlock[i].x + 1 == 20){
			return true;
		}
		if(boardRcd[currentBlock[i].x + 1][currentBlock[i].y] == 1){
			return true;
		}
	}
	return false;
}

//paint the current block white
function clearBlock(){
	for(var i = 0; i < 4; i++){
		if(currentBlock[i].x < 0 || currentBlock[i].y < 0){
			continue;
		}
		boardGui.rows[currentBlock[i].x].cells[currentBlock[i].y].style.backgroundColor = "white"; 
	}
}

//paint the current block red
function paintBlock(){
	for(var i = 0; i < 4; i++){
		if(currentBlock[i].x  < 0 || currentBlock[i].x > 19 || currentBlock[i].y < 0 || currentBlock[i].y > 9){
			continue;
		}
		boardGui.rows[currentBlock[i].x].cells[currentBlock[i].y].style.backgroundColor = "rgba(255,0,0,0.3)"; 
	}
}

function addBlockToBrd(){
	for(var i = 0; i < 4; i++){
		if(currentBlock[i].x < 0){
			continue;
		}
		boardRcd[currentBlock[i].x][currentBlock[i].y] = 1;
	}
}

function clearLine(){
	var lines = 0;
	
	for(var i = 0; i < 20; i++){
		var j = 0;
		for(; j < 10; j++){
			if(boardRcd[i][j] == 0){
				break;
			}
		}
		if(j == 10){
			lines++;
			if(i != 0){
				for(var k = i - 1; k >= 0; k--){
					boardRcd[k + 1] = boardRcd[k];
				}
			}//if i
			// clear the first line
			for(var m = 0; m < 10; m++){
				boardRcd[0][m] = 0;
			}
		}//if j
	}
	score = score + 10 * lines;
	scoreGui.innerHTML = score;
	if(lines > 0 && score > 0 && score % 20 == 0){
		time = time - 100;
		alertGui.style.visibility = "visible";
		setTimeout(function(){ alertGui.style.visibility = "hidden"; }, 3000);
	}
	return lines;
}

function clearBoard(){
	for(var i = 0; i < 20; i++){
		for(var j  = 0; j < 10; j++){
			boardGui.rows[i].cells[j].style.backgroundColor = "white"; 
		}
	}
}

function paintBoard(){
	for(var i = 0; i < 20; i++){
		for(var j  = 0; j < 10; j++){
			if(boardRcd[i][j] == 1){
				boardGui.rows[i].cells[j].style.backgroundColor = "rgba(255,0,0,0.3)"; 
			}
		}
	}
}
function keyFunc(){
	var x = event.key;
	if(x == 'ArrowLeft'){
		goLeft();
	}
	else if(x == 'ArrowRight'){
		goRight();
	}
	else if(x == 'ArrowDown'){
		goDown();
	}
	else if(x == 'ArrowUp'){
		rotate();
	}
}
function hitUpper(){
	for(var i =0; i < 10; i++){
		if(boardRcd[0][i] == 1){
			return true;
		}
	}
	return false;
}

function newRound(){
	//initialization
	for(var rows = 0; rows < 20; rows++){
		boardRcd[rows] = new Array(10);
		for(var cols = 0; cols < 10; cols++){
			boardRcd[rows][cols] = 0;
		}
	}
	clearBoard();
	clearInterval(interval);
	score = 0;
	status = 0;
	time = 1000;
	scoreGui.innerHTML = score;
}

function start(e){
	if(status == 0){
		status = 1; 
		if(!makeBlock()){
			alert("GAME OVER!");
			status = 2;
			startBtn.value = "New Round";
			return ;
		}
		paintBlock(); 
		interval = setInterval(goDown,time); 

	}
	else if (status == 2){
		newRound();
		startBtn.value = "Start Game!";
		
	}
	
	
}
document.onkeydown = keyFunc; 

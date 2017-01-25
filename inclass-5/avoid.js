btn = document.getElementById("avoid");
info = document.getElementById("Congs");
win_width = window.innerWidth;
win_height = window.innerHeight;

window.onload = function(){

	btn.addEventListener("mouseover", move);
	btn.addEventListener("click", click);
	window.addEventListener("keydown", down);
	window.addEventListener("keyup", up);
}


function click(){
	if(btn.value == "Click me!"){
		btn.value = "Play Again!";
		info.style.visibility = "visible";
		btn.removeEventListener("mouseover", move);
	}
	else{
		btn.value = "Click me!";
		info.style.visibility = "hidden";
		btn.addEventListener("mouseover", move);
	}
}

function move(){
		btn.style.left = Math.random()* win_width + "px";
		btn.style.top = Math.random()* win_height + "px";
		
}
function down(){
	if(event.shiftKey){
		btn.removeEventListener("mouseover", move);
	}
}
function up(){
	if(btn.value == "Click me!"){
		btn.addEventListener("mouseover", move);
	}
}

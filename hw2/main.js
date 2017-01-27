'use strict'
window.onload = function(){
	var f1 = Math.random() * 4 + 1;
	var f2 = Math.random() * 4 + 1;
	var f3 = Math.random() * 4 + 1;
	var f4 = Math.random() * 4 + 1;

	var btn1 = document.getElementById("stop1");
	var btn2 = document.getElementById("stop2");
	var btn3 = document.getElementById("stop3");
	var btn4 = document.getElementById("stop4");

	var inter1 = setInterval(countDown1, f1*1000);
	var inter2 = setInterval(countDown2, f2*1000);
	var inter3 = setInterval(countDown3, f3*1000);
	var inter4 = setInterval(countDown4, f4*1000);
    

	var imgset1 = ["rice1.jpg", "rice2.jpg", "rice3.jpg"];
	var imgset2 = ["houston1.jpg", "houston2.jpg", "houston3.jpg", "houston4.jpg"];
	var imgset3 = ["owl1.jpg", "owl2.jpg", "owl3.jpg"];
	var imgset4 = ["sql1.jpg", "sql2.jpg", "sql3.jpg","sql4.jpg"];

	var i1 = 1;
	var i2 = 1;
	var i3 = 1;
	var i4 = 1;
	
	function countDown1(){
		document.getElementById("img1").src = imgset1[i1%3];
		i1++;
	}
	function countDown2(){
		document.getElementById("img2").src = imgset2[i2%4];
		i2++;
	}
	function countDown3(){
		document.getElementById("img3").src = imgset3[i3%3];
		i3++;
	}
	function countDown4(){
		document.getElementById("img4").src = imgset4[i4%4];
		i4++;
	}

	var btnArr = [btn1, btn2, btn3, btn4];
	var interArr = [inter1, inter2, inter3, inter4];
	var imgsetArr = [imgset1, imgset2, imgset3, imgset4];
	var countDownArr = [countDown1, countDown2, countDown3, countDown4];

	var callOnclick = function(btn, index){
		btn.onclick = function(){
			var inter = interArr[index];
			if(btn.value == "Stop"){
				stop(btn, inter);
				btn.src = imgsetArr[index][0];
			}
			else{
				resume(btn, inter, countDownArr[index],interArr, index );
			}
		}
	}

	btnArr.forEach(callOnclick);
	
	function stop(btn, inter){
		clearInterval(inter);
		btn.value = "Start";
	}
	
	function resume(btn, inter, countDown, interArr, index){
		btn.value = "Stop"
		var f = Math.random() * 4 + 1;
		inter = setInterval(countDown, f*1000);
		interArr[index] = inter;
	}

}
function profile(){
		location.href = "profile.html";
	}








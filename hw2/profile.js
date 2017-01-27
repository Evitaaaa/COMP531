


function validate(){
	name = document.getElementById("dname").value;
	email = document.getElementById("email").value;
	phone = document.getElementById("phone").value;
	zipcode = document.getElementById("zipcode").value;
	password1 = document.getElementById("passwordId").value;
	password2 = document.getElementById("cpasswordId").value;
	
	if(!checkValid()){
		return false;
	}
	if (password1 != password2){
		window.alert("Two passwords are not same");
			return false;
	}
	checkUpt();
	document.getElementById("name_info").innerHTML = name;
	document.getElementById("email_info").innerHTML = email;
	document.getElementById("phone_info").innerHTML = phone;
	document.getElementById("zcode_info").innerHTML = zipcode;
	document.getElementById("pwd1_info").innerHTML = password1;
	document.getElementById("pwd2_info").innerHTML = password2;
	
	document.getElementById("dname").value = "";
	document.getElementById("email").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("zipcode").value = "";
	document.getElementById("passwordId").value = "";
	document.getElementById("cpasswordId").value = "";

	return true;
}
function checkUpt(){

	if(name == ""){
		name = "evita";
	}
	if(name != "evita"){
		document.getElementById("name_upt").innerHTML = "updated from evita to " + name;
	}

	if(email == ""){
		email = "evita@rice.edu";
	}
	if(email != "evita@rice.edu"){
		document.getElementById("email_upt").innerHTML = "updated from evita@rice.edu to " + email;
	}

	if(phone == ""){
		phone = "123-123-1234";
	}
	if(phone != "123-123-1234"){
		document.getElementById("phone_upt").innerHTML = "updated from 123-123-1234 to " + phone;
	}

	if(zipcode == ""){
		zipcode = "12345";
	}
	if(zipcode != "12345"){
		document.getElementById("zcode_upt").innerHTML = "updated from 12345 to " + zipcode;
	}

	if(password1 == ""){
		password1 = "123abc";
	}
	if(password1 != "123abc"){
		document.getElementById("pwd1_upt").innerHTML = "updated from 123abc to " + password1;
	}

	if(password2 == ""){
		password2 = "123abc";
	}
	if(password2 != "123abc"){
		document.getElementById("pwd2_upt").innerHTML = "updated from 123abc to " + password2;
	}
}
function checkValid(){
	var email_valid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.]+\.[A-Za-z]{2,3}$/;
	var phone_valid = /\d\d\d-\d\d\d-\d\d\d\d/;
	var zcode_valid = /[0-9]{5}/;
	
	if(email != "" && !email_valid.test(email)){

		document.getElementById("email_upt").innerHTML = "your email is invalid";
		return false;
	}
	if(phone != "" && !phone_valid.test(phone)){
		document.getElementById("phone_upt").innerHTML = "your phone is invalid";
		return false;
	}
	if(zipcode !="" && !zcode_valid.test(zipcode)){
		document.getElementById("zcode_upt").innerHTML = "your zipcode is invalid";
		return false;
	}
	return true;
}

function back(){
	location.href = "main.html";
}

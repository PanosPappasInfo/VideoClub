var url = "http://localhost:7777/";

document.getElementById("createNew").onclick = 
function createProfile() {
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	let inputs = document.querySelectorAll('input'); 
	var signup_req = url + "signup?user=" + email + "&pass=" + password;
	document.getElementById("sin").textContent = "Sign up successful!";
	fetch(signup_req)
		.then(data => console.log(data))
}



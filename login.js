const url = "http://localhost:7777/";

document.getElementById("login").onclick = function login() {
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var login_req = url + "login?user=" + email + "&pass=" + password;
	fetch(login_req).then(res=>res.json())
	.then(data => { console.log(data);
		if (data) { 
			localStorage.setItem("key", password);
			document.querySelector('#login').textContent = 'logout';
			document.getElementById("log").textContent = "Log in successful!";
	}});
}
const url = "http://localhost:7777/";
const key= "http://www.omdbapi.com/?apikey=c6a3e77a&i="

callbacks = [];

window.onload = 
	function show_movies() {
		console.log("loaded");
		var key_id = localStorage.getItem("key");
		var req = url + "favorites?key=" + key_id;
		
		fetch(req).then(res => res.json())
			.then(data => {
				console.log(data);
				console.log(data.length);
				for (var i = 0; i < data.length; ++i) {
					if (data[i] != null) {
						fetch(key+data[i]).then(res=>res.json())
							.then(data=>data['Title'])
							.then(title => {if (title != null) {
								var callback = function () { showMovieDets(data[0]); }
								callbacks.push(callback);
								document.getElementById("listed-movies").innerHTML += '<button id=sth" name="sth" onclick="callbacks['+(callbacks.length-1)+']()">' + title + '</button>' + '<br>';
							}})
							.catch(error=>{})
					}
				}
				
			})
		
	}
function showMovieDets(id){
		var movie_id = id;
		var url = key + movie_id;
		fetch(url)
			.then(res => res.json())
			.then(data => {
				console.log(data);
					document.getElementById("text").value = "";
					document.getElementById("text").style.display = 'block';
					if(data.Poster == "N/A"){
						document.getElementById('image').src = "pna.jpg";
					} else {
						document.getElementById('image').src = data.Poster;
					}
					document.getElementById("text").value = document.getElementById("text").value + "Title: " + data.Title + "\n";
					if(data.Plot != "N/A"){
						document.getElementById("text").value = document.getElementById("text").value + "Plot: " + data.Plot + "\n";
					}
					document.getElementById("text").value = document.getElementById("text").value + "Actors: " + data.Actors + "\n";
					if(data.Director != "N/A"){
						document.getElementById("text").value = document.getElementById("text").value + "Director: " + data.Director + "\n";
					}
				
			});
}

var i = 0;
var key = 'http://www.omdbapi.com/?apikey=c6a3e77a&t=';

function changeImage() {
		if(i % 2 == 0){
            document.getElementById("imgClickAndChange").src = "goldenstar.png";
			console.log(localStorage.key);
		}
		else{
            document.getElementById("imgClickAndChange").src = "emptystar.png";
		}
		i++;
}

let input = document.getElementById("movie");
let timeout = null;

input.addEventListener('keyup', function searchMovie() {
	clearTimeout(timeout);
	timeout = setTimeout(function () {
		document.textarea = "";
		document.getElementById('image').src = "";
		var movie = document.getElementById("movie").value;
		var url = key + movie;
		fetch(url)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if(movie == ""){
					document.getElementById("text").value = "";
					document.getElementById("text").style.display = 'none';
					document.getElementById("full").style.display = 'none';
				}else if(data.Response == "False"){
					document.getElementById("text").value = "Movie not found";
					document.getElementById("text").style.display = 'block';
					document.getElementById("full").style.display = 'none';
				} else {
					document.getElementById("text").value = "";
					document.getElementById("text").style.display = 'block';
					document.getElementById("full").style.display = 'block';
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
				}
				localStorage.setItem("title", data.Title);
				
			});
   }, 1000);
});

function showFull() {
	document.textarea = "";
	document.getElementById('image').src = "";
	var movie = document.getElementById("movie").value;
	var url = key + movie;
	fetch(url)
		.then(res => res.json())
		.then(data => {
			if(movie == ""){
				document.getElementById("text").value = "";
			}else if(data.Response == "False"){
				document.getElementById("text").value = "Movie not found";
			} else {
				document.getElementById("text").value = "";
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
				if(data.Genre != "N/A"){
					document.getElementById("text").value = document.getElementById("text").value + "Genre: " + data.Genre + "\n";
				}
				if(data.Writer != "N/A"){
					document.getElementById("text").value = document.getElementById("text").value + "Writer: " + data.Writer + "\n";
				}
				if(data.Runtime != "N/A"){
					document.getElementById("text").value = document.getElementById("text").value + "Runtime: " + data.Runtime + "\n";
				}
				if(data.Year != "N/A"){
					document.getElementById("text").value = document.getElementById("text").value + "Year: " + data.Year + "\n";
				}
				if(data.Rated != "N/A"){
					document.getElementById("text").value = document.getElementById("text").value + "Rated: " + data.Rated + "\n";
				}
				if(data.Language != "N/A"){
					document.getElementById("text").value = document.getElementById("text").value + "Language: " + data.Language + "\n";
				}
				if(data.Country != "N/A"){
					document.getElementById("text").value = document.getElementById("text").value + "Country: " + data.Country + "\n";
				}
				console.log("title = " + data.Title);
				localStorage.setItem("title", data.Title);
			}
		});
}

const url = "http://localhost:7777/";

document.getElementById("imgClickAndChange").onclick =
	function star(){
		var pass = localStorage.getItem("key");
		var title = localStorage.getItem("title");
		if (title == null){
			console.log("no movie to star");
			return;
		}
		console.log("requesting: " + key+title);
		fetch(key+title).then(res=>res.json())
			.then(data=>data['imdbID'])
			.then(movie_id => {
				console.log("movie id = " + movie_id);
				var star_req = url + "star?" + "key=" + pass + "&movie_id=" + movie_id;
				fetch(star_req)
					.then(res => res.json())
					.then(d => console.log(d));
				changeImage();
			})
	}
	

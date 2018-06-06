$(document).ready( () => {

	$('#searchForm').on('submit',(e) => {
		let search = $('#search').val();

		getMovies(search);


		e.preventDefault();
	});
	
});


function getMovies(search){
	axios.get('https://www.omdbapi.com?apikey=14c1b031&s='+search)
	.then((response) => {
		console.log(response);
		let movies = response.data.Search;
		let output = '';
		$.each(movies, (index, movie) => {
			output += `
				
				    <div class="col s12 m3">
				      <div class="card">
				        <div class="card-image">
				          <img src="${movie.Poster}">
				         	 <h5>${movie.Title}</h5>
				          	<a onclick="movieSelected('${movie.imdbID}')" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">more_horiz</i></a>
				        </div>
				        <div class="card-content">
					    
				        </div>
				      </div>
				    </div>
			`;
		});

		$("#movies").html(output);
	})
	.catch((err) => {
		console.log(err)
	})
}

function movieSelected(id){
	sessionStorage.setItem('movieId',id);
	window.location = 'details.html';
	return false;
}

function getMovie(){

	
	let movieId = sessionStorage.getItem('movieId')

	axios.get('https://www.omdbapi.com?apikey=14c1b031&i='+movieId)
		.then((response) => {
			console.log(response);
			let movies = response.data.Search;
			console.log(response);
			let movie = response.data;
			let output = `

				<div class="row">
					<div class="col m4">
						
						<ul class="collection">
						    <li class="collection-item"><img src="${movie.Poster}" alt="" /></li>
							<li class="collection-item"><span>Movie Rating:</span> ${movie.Rated}</li>
							<li class="collection-item"><span>IMDB Rating:</span> ${movie.imdbRating}</li>
							<li class="collection-item"><span>IMDB Votes</span> ${movie.imdbVotes}</li>

						</ul>
					</div>
					<div class="col m8">
						<h2>${movie.Title} </h2> <h4>(${movie.Year})</h4>
						<p>${movie.Plot}</p>
						<ul class="collection">

							<li class="collection-item"><span>Genre:</span> ${movie.Genre}</li>
							<li class="collection-item"><span>Writers:</span> ${movie.Writer}</li>
							<li class="collection-item"><span>Language:</span>${movie.Language}</li>
							<li class="collection-item"><span>Stars:</span> ${movie.Actors}</li>
							<li class="collection-item"><span>Awards:</span> ${movie.Awards}</li>
						

						</ul>

						<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="waves-effect waves-light btn light-green accent-4">View on IMDB</a>
						<a href="index.html" class="waves-effect waves-light btn light-green accent-4">Back</a>


					</div>
				</div>
			`;

			$('#movie').html(output)
		})
		.catch((err) => {
			console.log(err)
		})



}
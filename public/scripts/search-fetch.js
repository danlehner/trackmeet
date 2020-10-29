const DZ_API_KEY = 'fae0f6f90emsh8e90cd79d598afcp1e6185jsn8b369fe30354'

const GET_CONFIG = {
	"method": "GET",
		"headers": {
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
			"x-rapidapi-key": `${DZ_API_KEY}`
		}
}

const displayResults = function(
  dzArtistId, 
  title, 
  artist, 
  albumArt, 
  genre, 
  dzGenreId) {
  
  $('.search-results').append(`  
  <form class="card-body result-card" action="/search" method="POST">
    <img class="card-img-top" src="${albumArt}" alt="${title} artwork" />
      <input type="hidden" name="dzArtistId" value="${dzArtistId}"><br>
      <input class="card-title" type="text" name="title" value="${title}"><br>
      <input type="text" name="artist" value="${artist}"><br>
      <input type="hidden" name="albumArt" value="${albumArt}">
      <input type="text" name="genre" value="${genre}"><br>
      <input type="hidden" name="dzGenreId" value="${dzGenreId}">
     <input class="add-card" type="submit" value="Add" />
    </form>
  `)
  
  console.log(dzArtistId, title, artist, albumArt, genre, dzGenreId)
}

const dzSearch = (query) => {
  return fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=track:"${query}"`, GET_CONFIG)
   .then(res => res.json())
   .then(json => {
     json.data.map(song => {
      const artistId = song.artist.id
      const songTitle = song.title
      const artistName = song.artist.name
      const albumArt = song.album.cover_medium
      const albumId = song.album.id

      return fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`, GET_CONFIG)
        .then(res => res.json())
        .then(album => {
          
          let genreId
          if (album.genre_id !== -1) {
            genreId = album.genre_id
          } else {
            genreId = 0
          }

          return fetch(`https://deezerdevs-deezer.p.rapidapi.com/genre/${genreId}`, GET_CONFIG)
          .then(res => res.json())
          .then(genre => {

            let genreName
            if (genreId === 0) {
              genreName = 'Misc.'
            } else {
              genreName = genre.name
            }

            displayResults(artistId, songTitle, artistName, albumArt, genreName, genreId); 

            // cardSubmit(); 
          })
      })
   })
 })
}


$('.result-box').submit(function(e) {
  e.preventDefault();
  const searchVal = $('.results-input').val();
  dzSearch(searchVal); 
})


const cardSubmit = function() { 
  $('.result-card').submit(function(e) {
    e.preventDefault(); 
    console.log(e.target)
    $(this).toggleClass('blue')
  })
}

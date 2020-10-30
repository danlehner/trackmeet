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
  artistPicture,
  genre, 
  dzGenreId, 
  cardId) {
  
  $('.search-results').append(`  
  <div id=${cardId} class="card-body result-card">
    <form class="card-form" action="/search" method="POST">
    <img class="card-img-top" src="${albumArt}" alt="${title} artwork" />
      <input class="dz-artist-id" type="hidden" name="dzArtistId" value="${dzArtistId}"><br>
      <input class="card-title song-title" type="text" name="title" value="${title}"><br>
      <input class="artist-name" type="text" name="artist" value="${artist}"><br>
      <input class="album-art" type="hidden" name="albumArt" value="${albumArt}"><br>
      <input class="artist-picture" type="hidden" name="artistPicture" value="${artistPicture}"><br>
      <input class="genre-name" type="text" name="genre" value="${genre}"><br>
      <input class="dz-genre-id" type="hidden" name="dzGenreId" value="${dzGenreId}">
    </form>
  </div>
  `)

}

const dzSearch = (query) => {
  $('.search-results').append(`<p id="loading-text">Loading...</p>`)
  return fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=track:"${query}"`, GET_CONFIG)
   .then(res => res.json())
   .then(json => {
     console.log(json.data)
     json.data.map(song => {
      const cardId = song.id
      const artistId = song.artist.id
      const songTitle = song.title
      const artistName = song.artist.name
      const artistPicture = song.artist.picture_xl
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
          .then(res => {
            return res.json()
          })
          .then(genre => {

            let genreName
            if (genreId === 0) {
              genreName = 'Misc.'
            } else {
              genreName = genre.name
            }

            $('#loading-text').remove() 

            displayResults(artistId, songTitle, artistName, artistPicture, albumArt, genreName, genreId,cardId); 

            clearSearchAvail()

          })
      })
   })
 })
}

$('#clear-search').hide() // on page load

const clearSearchAvail = function() {
  $('#clear-search').show()
  $('#clear-search').on('click', function() {
    $('.search-results').empty() 
    $(this).hide() 
    $('.results-input').val("");
  })
}


$('.result-box').submit(function(e) {
  e.preventDefault();
  const searchVal = $('.results-input').val();
  dzSearch(searchVal); 
})


$('.search-results').on('click', 'div.result-card', function(e) {
  e.preventDefault() 
  const nearestId = $(e.target).closest(".result-card").attr("id")
  const dzArtistId = $(`#${nearestId}`).find("input.dz-artist-id").val()
  const title = $(`#${nearestId}`).find("input.song-title").val()
  const artist = $(`#${nearestId}`).find("input.artist-name").val()
  const artistPicture = $(`#${nearestId}`).find("input.artist-picture").val()
  const albumArt = $(`#${nearestId}`).find("input.album-art").val()
  const genre = $(`#${nearestId}`).find("input.genre-name").val()
  const dzGenreId = $(`#${nearestId}`).find("input.dz-genre-id").val()

  fetch('/search', {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
      dzArtistId: dzArtistId, 
      title: title, 
      artist: artist, 
      artistPicture: artistPicture,
      albumArt: albumArt, 
      genre: genre, 
      dzGenreId: dzGenreId
    })
  })
  .then(response => {
    $(`#${nearestId}`).addClass('blue')
    setTimeout(() => {
      $(`#${nearestId}`).remove()
      $('.collection-link').show()
    }, 1000)
  })
})

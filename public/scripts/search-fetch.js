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
  genrePicture, 
  dzGenreId, 
  cardId) {
  
  $('.search-results').append(`  
  <div id=${cardId} class="card-body result-card">
   <div class="card-content">
      <img class="card-img-top" src="${albumArt}" alt="${title} artwork" />
      <p id="dz-artist-id" class="hidden">${dzArtistId}</p>
      <h3 id="title" class="card-title">${title}</h3>
      <h5 id="artist" class="card-subtitle artist-name">${artist}</h5>
      <p id="album-art" class="hidden">${albumArt}</p>
      <p id="artist-picture" class="hidden">${artistPicture}</p>
      <p id="genre-picture" class="hidden">${genrePicture}</p>
      <h5 class="card-genre" id="genre">${genre}</h5>
      <p id="dz-genre-id" class="hidden">${dzGenreId}</p>
    </div>
  </div>
  `)

}

const dzSearch = (query) => {
  $('.search-results').append(`<h4 id="loading-text" class="text-center">Loading...</h4>`)
  return fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=track:"${query}"`, GET_CONFIG)
   .then(res => res.json())
   .then(json => {
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

            const genrePicture = genre.picture_xl

            let genreName
            if (genreId === 0) {
              genreName = 'Misc.'
            } else {
              genreName = genre.name
            }

            $('#loading-text').remove() 


            displayResults(artistId, songTitle, artistName, artistPicture, albumArt, genreName, genrePicture, genreId, cardId); 


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

// const dzArtistId = $(`#${nearestId}`).find("input.dz-artist-id").val()

$('.search-results').on('click', 'div.result-card', function(e) {
  e.preventDefault() 
  const nearestId = $(e.target).closest(".result-card").attr("id")
  const dzArtistId = $('#dz-artist-id')[0].innerHTML
  const title = $('#title')[0].innerHTML
  const artist = $('#artist')[0].innerHTML
  const artistPicture = $('#artist-picture')[0].innerHTML
  const albumArt = $('#album-art')[0].innerHTML
  const genre = $('#genre')[0].innerHTML
  const genrePicture = $('#genre-picture')[0].innerHTML
  const dzGenreId = $('#dz-genre-id')[0].innerHTML


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
      genrePicture: genrePicture,
      dzGenreId: dzGenreId
    })
  })
  .then(response => {
    $(`#${nearestId}`).addClass('click-translate')
    setTimeout(() => {
      $(`#${nearestId}`).remove()
      $('.collection-link').show()
    }, 200)
  })
})

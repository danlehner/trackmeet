console.log('sanity check')

const DZ_API_KEY = 'fae0f6f90emsh8e90cd79d598afcp1e6185jsn8b369fe30354'

const GET_CONFIG = {
	"method": "GET",
		"headers": {
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
			"x-rapidapi-key": `${DZ_API_KEY}`
		}
}

const dzSearch = (query) => {
  return fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=track:"${query}"`, GET_CONFIG)
   .then(res => res.json())
   .then(json => {
     json.data.map(song => {
      const artistId = song.artist.id
      const songTitle = song.title
      const artistName = song.artist.name
      const albumArt = song.album.cover_big
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
            const genreName = genre.name

            console.log(artistId, songTitle, artistName, albumArt, genreName, genreId)
          })
      })
   })
 })
}

$('.result-box').submit(function(e) {
  e.preventDefault() 
  const searchVal = $('.results-input').val()
  dzSearch(searchVal)
})




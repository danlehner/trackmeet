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
   .then(json => console.log(json))
}

$(document).ready(() => {
  $('.result-box').on('click', () => {
    console.log('test')
  })
})



# ANNOUNCEMENT!:

(7/28/21): Bigger and better things are in the works for Track Meet - check out the README for [Track Meet MERN](https://github.com/danlehner/trackmeet-mern) to see the proposed changes for the app and preview its progress before official deployment.

# Track Meet

(App deployed on Heroku: [Track Meet](https://dl-track-meet.herokuapp.com/))

## What is Track Meet? 

Track Meet is an app that promotes conscious music listening, utilizing Deezer’s API, that creates a collection for users where they can write notes about music to themselves, keep track of songs they’ve listened to, discover new music and see their own preference metrics. 

## What technologies does Track Meet use? 

Track Meet utlizes: 

* MongoDB / Mongoose
* Express
* jQuery
* EJS
* Bcrypt
* Express Session
* Deezer public API 
* Bootstrap 

## User Stories

### Logging in 

Users will be able to create an account or login into their existing one. When they hit the homepage, they'll have the option to view their current collection, search for new music or logout: 

![Logged in homepage](/readme-images/logged-in-home.png)

### Seeing their profile

Users will be able to see their profile and information they provided during sign-up, including their user name, profile image, location and a little bit about themselves (they can edit this info later) 

![Profile portion of homepage](/readme-images/profile-top.png)

### Viewing their collection

Scrolling down in the homepage, they'll be able to view their music collection, organized by genre, artist and song. They can click through any of the major sections or view any of the artists, songs or genres in the list to view collection and view pages. Users can also delete songs from their collection right on the homepage (artists and genres are not deleted by user - artists are automatically removed if they no longer have songs by them in the database, genres are removed once they no longer have represented artists) 

![collection portion of homepage](/readme-images/home-collection.png)

### Viewing their metrics

Based on their collection, users will be able to see which genre in their collection contains the most artists and which artists has the most songs. They will also be able to keep track of which songs they have not marked "listened to" yet (they can access those songs from this section)

![Metrics portion of homepage](/readme-images/metrics.png)

### Viewing sub collections

Users will be able to click through and see complete collections of genres, artists and songs. 

![Artist collection](/readme-images/artist-collection-page.png)

### Viewing artist pages

Users will be able to see complete song collections by specific artists. 

![Individual artist page](/readme-images/artist-page.png)

### Viewing song pages

Users will be able to see pages for individual songs. Here they can follow external links to listen to the song on YouTube, Spotify, Apple Music and Deezer. They can make personal notes on the song and check off whether they've listened to it or not. They can also delete the song from here and be redirected to their collection page. 

![Individual song page](/readme-images/song-page.png)

### Searching for new music

Here, users can add music to their collection. They can search by song title or keywords and get back results from the Deezer API. From here, they simply click on a song "card" and it will automatically be added to their collection:  

![Search hero](/readme-images/search-hero.png)

![Search results](/readme-images/search-results.png)




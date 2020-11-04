$('.testimony-edit-submit').hide()

$('.testimony-edit').on('click', function() {
  const elm = $('#song-testimony')[0]
  const songVal = $('#song-testimony')[0].innerHTML
  $(elm).html(`<textarea name="testimony" class="testimony-edit">${songVal}</textarea><br>`)
  $('.testimony-edit-submit').show()
})

$('.testimony-edit-submit').on('click', function() {
   const elm = $(".testimony-edit").val()
   const songId = window.location.href.split('/').pop()
   fetch(`/profile/songs/${songId}/edit`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      testimony: elm
    })
  })
   .then(res => {
    const elmCont = $('#song-testimony')[0]
    $(elmCont).html(`<p id="song-testimony">${elm}</p>`)
   })
})
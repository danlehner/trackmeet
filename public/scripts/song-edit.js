$('.testimony-edit-submit').hide()

$('.testimony-edit').on('click', function() {
  // grab the current value of the text
  const elm = $('#song-testimony')[0]
  const songVal = $('#song-testimony')[0].innerHTML
  $(elm).html(`<textarea name="testimony" class="testimony-edit">${songVal}</textarea><br>`)
  $('.testimony-edit-submit').show()
})

$('.testimony-edit-submit').on('click', function() {
   const elm = $(".testimony-edit")[0].innerHTML
   console.log(elm)
})
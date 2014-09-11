$('.touch a').on('touchstart', function() {
  $('a.touched').removeClass('touched');
  $(this).addClass('touched');
}).on('touchend', function() {
  $(this).removeClass('touched');
});

(function(window, $) {
  if (!window.dc.SUPPORTS_SCROLL_EFFECTS) {
    return;
  }

  var $parallax = $(".texture-parallax");

  if ($parallax.length) {
    $(window).on("rafscroll", function() {
      $parallax.css('background-position', '50% ' + ($(window).scrollTop() / 4 * -1) + 'px');
    });
  }


})(window, jQuery);

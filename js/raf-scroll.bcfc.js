(function(window, $) {
  var running = false;
  $(window).on("scroll", function(e) {
    var context = this,
        args = arguments;
    var method = function(event) {
      event.type = "rafscroll";
      $.event.dispatch.apply(context, args);
    };
    if (running) {
      return;
    }
    running = true;
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(function() {
        method(e);
        running = false;
      });
    } else {
      method(e);
      running = false;
    }
  });

})(window, jQuery);

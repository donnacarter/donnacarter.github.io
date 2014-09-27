(function(window, $) {

  if (!window.dc.SUPPORTS_SCROLL_EFFECTS) {
    return;
  }

  var $window = $(window);

  var navbar = {
    $el: $(".global-navbar").first(),
    $over: $(".navbar-over").first(),
    pinned: true,
    defaultOffset: 180,
    navbarHeight: 60,
    offset: function() {
      return this.navbarHeight * 2;
    }
  };

  var windowHeight = $window.height(),
      documentHeight = $(document).height();

  navbar.$el.headroom({
    tolerance: {
      up: 10,
      down: 0
    },
    classes: {
      pinned : "headroom-pinned",
      unpinned : "headroom-unpinned",
      top : "headroom-top",
      notTop : "headroom-not-top",
      initial: 'headroom-pinned'
    },
    offset: navbar.offset(),
    onUnpin: function() {
      $("body").removeClass('navbar-pinned');
      navbar.pinned = false;
      navbar.$el.trigger('unpin');
    },
    onPin: function() {
      $("body").addClass('navbar-pinned');
      navbar.pinned = true;
      navbar.$el.trigger('pin');
    }
  });

  $("body").addClass('navbar-pinned');

  $window.on("debouncedresize", function() {
    navbar.$el.data("headroom").offset = navbar.offset();
    windowHeight = $window.height();
    documentHeight = $(document).height();
  });

  navbar.$el.on('mouseenter', function() {
    if (!navbar.pinned) {
      navbar.$el.data("headroom").pin();
    }
  });

  $window.on("rafscroll", function(e) {
    var scrollTop = $window.scrollTop();
    if (scrollTop >= 45 && navbar.$el.hasClass("top-of-screen")) {
      navbar.$el.removeClass("top-of-screen");
    } else if (scrollTop <= 0 && !navbar.$el.hasClass("top-of-screen")) {
      navbar.$el.addClass("top-of-screen");
    }
    // if (scrollTop + windowHeight >= documentHeight) {
    //   navbar.$el.data("headroom").pin();
    // }
  });

  window.globalNavbar = navbar;

})(window, jQuery);

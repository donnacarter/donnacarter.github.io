(function(window, $) {
  var $window = $(window);

  if (!window.dc.SUPPORTS_SCROLL_EFFECTS) {
    return;
  }

  var navbar = {
    $el: $(".global-navbar").first(),
    $over: $(".navbar-over").first(),
    defaultOffset: 200,
    navbarHeight: 60,
    offset: function() {
      return this.$over.length ? this.$over.outerHeight() - this.navbarHeight : this.defaultOffset;
    },
    stickyStart: function() {
      return this.$over.length ? this.$over.outerHeight() - this.navbarHeight : this.defaultOffset;
    },
    stickyStop: function() {
      return this.$over.length ? this.$over.outerHeight() : this.defaultOffset + this.navbarHeight;
    }
  };

  var pinned = true;

  var stickyStart = navbar.stickyStart(),
      stickyStop = navbar.stickyStop()
      windowHeight = $window.height(),
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
      notTop : "headroom-not-top"
    },
    offset: navbar.offset(),
    onUnpin: function() {
      $("body").removeClass('navbar-pinned');
      pinned = false;
      var scrollTop = $window.scrollTop();
      if (scrollTop >= stickyStart && scrollTop <= stickyStop) {
        var amount = (scrollTop - stickyStart) * -1;
        navbar.$el.css("transform", "translateY(" +  amount + "px)");
      }
      navbar.$el.trigger('unpin');
    },
    onPin: function() {
      $("body").addClass('navbar-pinned');
      pinned = true;
      navbar.$el.trigger('pin');
    }
  });

  $window.on("debouncedresize", function() {
    navbar.$el.data("headroom").offset = navbar.offset();
    stickyStart = navbar.stickyStart();
    stickyStop = navbar.stickyStop();
    windowHeight = $window.height();
    documentHeight = $(document).height();
  });

  $window.on("rafscroll", function(e) {
    var scrollTop = $window.scrollTop();
    if (scrollTop >= 45 && navbar.$el.hasClass("top-of-screen")) {
      navbar.$el.removeClass("top-of-screen");
    } else if (scrollTop <= 0 && !navbar.$el.hasClass("top-of-screen")) {
      navbar.$el.addClass("top-of-screen");
    }
    if (scrollTop > stickyStop) {
      navbar.$el.addClass("transition-transform");
    } else {
      navbar.$el.removeClass("transition-transform");
    }
    if (scrollTop >= stickyStart && scrollTop <= stickyStop && !pinned) {
      var amount = (scrollTop - stickyStart) * -1;
      navbar.$el.css("transform", "translateY(" +  amount + "px)");
    } else if (navbar.$el.attr('style')) {
      navbar.$el.removeAttr('style');
    }

    // if (scrollTop + windowHeight >= documentHeight) {
    //   navbar.$el.data("headroom").pin();
    // }
  });
})(window, jQuery);

(function(window, $) {
  if (!window.dc.SUPPORTS_SCROLL_EFFECTS) {
    return;
  }
  var winTop = window.dc.GRID_BASIC_PADDING;
  var $window = $(window);

  $(".global-navbar").on("pin", function() {
    winTop = window.dc.GRID_BASIC_PADDING + window.dc.NAVBAR_SMALLSCREEN_HEIGHT;
  }).on("unpin", function() {
    winTop = window.dc.GRID_BASIC_PADDING;
  });

  $(".no-csspositionsticky .sticky-col .stick").each(function() {
    var $el = $(this),
        $parent = $el.parent(),
        parentOffset, elOuterHeight, documentWidth;

    var setDimensionVars = function() {
      documentWidth = $(document).width();
      parentOffset = $parent.offset();
      elOuterHeight = $el.outerHeight();
      // parentHeight = $parent.height();
    };
    setDimensionVars();

    var calculateFakeSticky = function() {
      if (documentWidth < window.dc.SCREEN_MD) return;
      var parentHeight = $parent.height();
      var maxScrollTop = $(document).height() - $window.height();
      var scrollTop = Math.min($window.scrollTop(), maxScrollTop);
      var navbarHeight = window.globalNavbar.pinned ? window.globalNavbar.navbarHeight : 0;
      if (scrollTop <= parentOffset.top - winTop) {
        if (!$el.hasClass("fake-sticky-top")) {
          $el.addClass("fake-sticky-top").removeClass("fake-sticky fake-sticky-bottom");
        }
      } else if (scrollTop <= parentOffset.top + parentHeight - elOuterHeight - winTop) {
        if (!$el.hasClass("fake-sticky")) {
          $el.addClass("fake-sticky").removeClass("fake-sticky-top fake-sticky-bottom");
        }
      } else {
        if (!$el.hasClass("fake-sticky-bottom")) {
          $el.addClass("fake-sticky-bottom").removeClass("fake-sticky-top fake-sticky");
        }
      }
    }

    $window.on("debouncedresize", function() {
      setDimensionVars();
      calculateFakeSticky();
    });

    $el.data("calculateFakeSticky", calculateFakeSticky);

    $window.on("rafscroll", calculateFakeSticky);

    calculateFakeSticky();
  });

})(window, jQuery);

// This is hacked together to abstract it out of sticky-insert

(function(window, $) {
  var $parallaxTitle = $(".parallax-title");
  var $parallaxSubTitle = $(".parallax-sub-title");
  var $mainHeader = $(".main-header");
  var $contents = $mainHeader.find(".contents");

  if (!($mainHeader.length  && $parallaxTitle.length)) return;

  var fadeStart, fadeEnd, insertAppear, mainHeaderHeight, stickyInsertActive = false;

  $(window).on("debouncedresize.title-parallax", function() {
    mainHeaderHeight = $mainHeader.outerHeight();
    var contentsHeight = $contents.height();
    var contentsTop = $contents.position().top;
    var translateY = $contents.data('translateY') || 0;

    var titleBottom = mainHeaderHeight - (contentsTop - translateY + contentsHeight);

    fadeStart = titleBottom + (titleBottom) / 2;
    fadeEnd = mainHeaderHeight - 120;
  }).triggerHandler("debouncedresize.title-parallax");

  if (!window.dc.SUPPORTS_SCROLL_EFFECTS) {
    return;
  }

  $(window).on("rafscroll.title-parallax", function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop <= fadeStart) {
      if ($contents.css("opacity") != 1) {
        $contents.css("opacity", 1);
      }
    } else if (scrollTop > fadeEnd) {
      if ($contents.css("opacity") != 0) {
        $contents.css("opacity", 0);
      }
    } else {
      var max = fadeEnd - fadeStart;
      var current = scrollTop - fadeStart;
      $contents.css("opacity", 1 - current / max);
    }

    if (scrollTop > mainHeaderHeight) {
      $contents.data('translateY', 0);
      $contents.css("transform", "translateY(0)");
    } else {
      var translateY = scrollTop / -2;
      $contents.data('translateY', translateY);
      $contents.css("transform", "translateY(" + translateY + "px)");
    }
  }).triggerHandler("rafscroll.title-parallax");

})(window, jQuery);

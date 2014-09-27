// This is hacked together to abstract it out of sticky-insert

(function(window, $) {
  var $fadeTitle = $(".fade-title");
  var $fadeSubTitle = $(".fade-sub-title");
  var $mainHeader = $(".main-header");
  var $contents = $mainHeader.find(".contents");

  if (!($mainHeader.length  && $fadeTitle.length)) return;

  var fadeStart, fadeEnd, insertAppear, mainHeaderHeight, stickyInsertActive = false;

  $(window).on("debouncedresize.title-fade", function() {
    mainHeaderHeight = $mainHeader.outerHeight();
    var contentsHeight = $contents.height();
    var contentsTop = $contents.position().top;

    var titleBottom = mainHeaderHeight - (contentsTop + contentsHeight);

    fadeStart = titleBottom + (titleBottom) / 2;
    fadeEnd = mainHeaderHeight - 120;
  }).triggerHandler("debouncedresize.title-fade");

  if (!window.dc.SUPPORTS_SCROLL_EFFECTS) {
    return;
  }

  $(window).on("rafscroll.title-fade", function() {
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
  }).triggerHandler("rafscroll.title-fade");

})(window, jQuery);

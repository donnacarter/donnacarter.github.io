(function(window, $) {
  var $stickyInsert = $(".sticky-insert");
  var $stickyInsertTitle = $(".sticky-insert-title");
  var $stickyInsertSubTitle = $(".sticky-insert-sub-title");
  var $stickyInsertTransplant = $(".sticky-insert-transplant");
  var $mainHeader = $(".main-header");
  var $contents = $mainHeader.find(".contents");

  if (!($mainHeader.length && $stickyInsert.length && $stickyInsertTitle)) return;

  var insert = function() {
    destroy();
    $stickyInsert.append('<h3 class="side-title">' + $stickyInsertTitle.html() + "</h3>");
    if ($stickyInsertSubTitle.length) {
      $stickyInsert.append('<h4 class="side-sub-title">' + $stickyInsertSubTitle.html() + "</h4>");
    }
    $stickyInsertTransplant.appendTo($stickyInsert);

    $stickyInsert.addClass('animate');

    if (!window.dc.SUPPORTS_SCROLL_EFFECTS) {
      $stickyInsert.addClass("in")
    }
  }

  var destroy = function () {
    $stickyInsert.removeClass('animate');
    $stickyInsertTransplant.each(function() {
      var append = $(this).data('append');
      if (append) {
        $(append).append(this);
      }
    });
    $stickyInsert.empty();
  }

  var fadeStart, fadeEnd, insertAppear, mainHeaderHeight, stickyInsertActive = false;

  $(window).on("debouncedresize.sticky-insert", function() {
    mainHeaderHeight = $mainHeader.outerHeight();
    var contentsHeight = $contents.height();
    var contentsTop = $contents.position().top;
    var translateY = $contents.data('translateY') || 0;

    var titleBottom = mainHeaderHeight - (contentsTop - translateY + contentsHeight);

    fadeStart = titleBottom + (titleBottom) / 2;
    fadeEnd = mainHeaderHeight - 120;
    insertAppear = fadeStart + (fadeEnd - fadeStart) / 2;

    if ($(window).width() >= window.dc.SCREEN_MD) {
      if (!stickyInsertActive) {
        insert();
        stickyInsertActive = true;
      }
    } else {
      if (stickyInsertActive) {
        destroy();
        stickyInsertActive = false;
      }
    }
  }).triggerHandler("debouncedresize.sticky-insert");

  if (!window.dc.SUPPORTS_SCROLL_EFFECTS) {
    return;
  }

  $(window).on("rafscroll.sticky-insert", function() {
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


    if (stickyInsertActive) {
      if (scrollTop <= insertAppear) {
        if ($stickyInsert.hasClass("in")) {
          $stickyInsert.removeClass("in");
        }
      } else {
        if (!$stickyInsert.hasClass("in")) {
          $stickyInsert.addClass("in");
        }
      }
    }

    if (scrollTop > mainHeaderHeight) {
      $contents.data('translateY', 0);
      $contents.css("transform", "translateY(0)");
    } else {
      var translateY = scrollTop / -2;
      $contents.data('translateY', translateY);
      $contents.css("transform", "translateY(" + translateY + "px)");
    }
  }).triggerHandler("rafscroll.sticky-insert");

})(window, jQuery);

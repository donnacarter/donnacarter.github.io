// This has had the title fading stuff amputated from it and put into title-parallax.js

(function(window, $) {
  var $stickyInsert = $(".sticky-insert");
  var $stickyInsertTitle = $(".sticky-insert-title");
  var $stickyInsertSubTitle = $(".sticky-insert-sub-title");
  var $stickyInsertTransplant = $(".sticky-insert-transplant");
  var $mainHeader = $(".main-header");
  var $contents = $mainHeader.find(".contents");

  if (!($mainHeader.length && $stickyInsert.length && $stickyInsertTitle.length)) return;

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

  var insertAppear, mainHeaderHeight, stickyInsertActive = false;

  $(window).on("debouncedresize.sticky-insert", function() {
    mainHeaderHeight = $mainHeader.outerHeight();
    var contentsHeight = $contents.height();
    var contentsTop = $contents.position().top;
    var translateY = $contents.data('translateY') || 0;

    var titleBottom = mainHeaderHeight - (contentsTop - translateY + contentsHeight);

    var fadeStart = titleBottom + (titleBottom) / 2;
    var fadeEnd = mainHeaderHeight - 120;
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

  }).triggerHandler("rafscroll.sticky-insert");

})(window, jQuery);

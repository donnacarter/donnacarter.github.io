(function(window, $) {

  var $mainHeader = $(".main-header.fixed");
  var $postHeaderWrapper = $(".post-header-wrapper");

  var resize = function() {
    if (!$mainHeader.length || !$postHeaderWrapper.length) {
      return;
    }
    var height = $mainHeader.height();
    var top = $postHeaderWrapper.offset().top;
    if (height != top) {
      $postHeaderWrapper.css("margin-top", height + "px");
    }
  };

  if ($mainHeader.length && $postHeaderWrapper.length) {
    $(window).on("debouncedresize", resize);
    resize();
  }

})(window, jQuery);

window.fbAsyncInit = function() {
  FB.init({
    appId      : '684345261634217',
    xfbml      : true,
    version    : 'v2.1'
  });

  $('.fb-share').click(function(e) {
    $el = $(this);
    FB.ui({
      method: 'share',
      href: $el.data('fb-href'),
      display: $el.data('fb-display') || 'popup',
      href: $el.data('fb-redirect-uri') || $el.data('fb-href')
    }, function(response){});
    e.preventDefault();
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

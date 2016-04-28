

var NavObj = {
  nav: $('nav'),
  logo: $('.nav-logo'),
  winScroll: function () {
  $(window).scroll(function() {

    var wScroll = $(window).scrollTop(),
        wHeight = NavObj.nav.height(),
        wStatus  = wScroll >= wHeight,
        wStatus2 = wScroll >= wHeight + 150;

      wStatus ? NavObj.nav.addClass('is-fixed') : NavObj.nav.removeClass('is-fixed')

      wStatus2 ? NavObj.logo.addClass('logo-is-in-position') : NavObj.logo.removeClass('logo-is-in-position')

  }); // end of scroll
  }
}

NavObj.winScroll();
/*
var wScroll = function () {
$(window).scroll(function() {

  var wScroll = $(this).scrollTop(),
      wHeight = nav.height(),
      wStatus  = wScroll >= wHeight,
      wStatus2 = wScroll >= wHeight + 150;

    wStatus ? nav.addClass('is-fixed') : nav.removeClass('is-fixed')

    wStatus2 ? logo.addClass('logo-is-in-position') : logo.removeClass('logo-is-in-position')

}); // end of scroll
}*/

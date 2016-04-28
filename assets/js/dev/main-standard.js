$(document).ready(function(){
  "use strict";

  var nav            = $('nav'),
      logo           = $('.nav-logo');

  $(window).scroll(function() {

    var wScroll = $(this).scrollTop(),
        wHeight = nav.height(),
        wStatus  = wScroll >= wHeight,
        wStatus2 = wScroll >= wHeight + 150;

      wStatus ? nav.addClass('is-fixed') : nav.removeClass('is-fixed')

      wStatus2 ? logo.addClass('logo-is-in-position') : logo.removeClass('logo-is-in-position')
  })

  const navToggleHandler = function(){
    var $this      = $(this),
        navigation = $this.parent().parent().find('.navigation'),
        submenu    = navigation.find('.submenu'),
        statusSub  = submenu.hasClass('submenu-is-open');
        //statusNav  = navigation.hasClass('is-open');  // good for animation

      $this.find('svg').toggleClass('is-hidden');
      if (statusSub) {
        submenu.removeClass('submenu-is-open');
      }

     navigation.toggleClass("is-open");
  }

  nav.on('click', '.toggle-menu', navToggleHandler);

  const navDropDownHandler = function(){
    var wWidth = $(window).width() < 700,
        $this = $(this);

      if (wWidth) {
        $this.find('.ch-down').toggleClass('is-hidden')
             .end().find('.ch-up').toggleClass('is-hidden')
             .end().find('.submenu').toggleClass('submenu-is-open');
                                  //  .toggleClass("animation")
      }
  }

  nav.on('click', '.dropdown', navDropDownHandler);

});

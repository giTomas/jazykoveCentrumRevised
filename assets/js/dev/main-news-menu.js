$(document).ready(function(){
  "use strict";

  var nav            = $('nav'),
      logo           = $('.nav-logo'),
      headline       = $(".newsLanguages__headlineNews");

  $(window).scroll(function() {

    var wScroll = $(this).scrollTop(),
        wHeight = nav.height(),
        wStatus  = wScroll >= wHeight,
        scrollStatus = wScroll >= wHeight + 120;

        wStatus ? nav.addClass('is-fixed') : nav.removeClass('is-fixed')

        if (scrollStatus) {
          logo.addClass('logo-is-in-position');
          headline.addClass("headline-inPosition");
        } else {
          logo.removeClass('logo-is-in-position');
          headline.removeClass("headline-inPosition");
        }
  })
/*
  const navToggleHandler = function(){
    var $this      = $(this),
        navigation = $this.parent().parent().find('.navigation'),
        submenu    = navigation.find('.submenu'),
        statusSub  = submenu.hasClass('submenu-is-open');
        //statusNav  = navigation.hasClass('is-open');  // good for animation
        console.log('hi');
        navigation.toggleClass("is-open");
        $this.find('svg').toggleClass("is-hidden");
      if (statusSub) {
        submenu.removeClass('submenu-is-open');
      }

  }*/

  //nav.on('click', '.toggle-menu', navToggleHandler);
/*
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
*/

  headline.on("click", function(){
    $.getJSON(dirNewsNotices)
    .then(function(data) {
      return templateRaw(data, "#idNoticesTemplate")
      })
    .then(function(html) {
      displayTmp(html, "#modal-new");
    })
    .then(function(){
      showModal();
    });
  });

});//end ready function

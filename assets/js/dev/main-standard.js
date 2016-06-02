"use strict";

$(document).ready(function(){

var nav = $('nav');


$(window).scroll(function() {

  var wScroll  = $(this).scrollTop(),
      wHeight  = nav.height(),
      wStatus  = wScroll >= wHeight,
      //logo     = $('.nav-logo');
      //wStatus2 = wScroll >= wHeight + 150;

    wStatus ? nav.addClass('is-fixed') : nav.removeClass('is-fixed')

    //wStatus2 ? logo.addClass('logo-is-in-position') : logo.removeClass('logo-is-in-position')
});

var navToggleHandler = function(){
  var $this      = $(this),
      navigation = $this.parent().parent().find('.navigation'),
      //submenu    = navigation.find('.submenu'),
      //statusSub  = submenu.hasClass('submenu-is-open'),
      svg        = $this.find('svg');

    svg.toggleClass('is-hidden');
  // for submenu
    /*if (statusSub) {
      submenu.removeClass('submenu-is-open');
    }*/

    navigation.toggleClass("is-open");
};
/*
var navDropDownHandler = function(){
  var wWidth = $(window).width() < 700,
      $this = $(this);

    if (wWidth) {
      $this.find('.ch-down').toggleClass('is-hidden')
           .end().find('.ch-up').toggleClass('is-hidden')
           .end().find('.submenu').toggleClass('submenu-is-open');
    }
};*/

nav.on('click', '.toggle-menu', navToggleHandler);

//nav.on('click', '.dropdown', navDropDownHandler);

}); //end of scope

////////////////
//global vars//
//////////////

//jQuery.noConflict();

"use strict";

var nav            = $('nav'),
    logo           = $('.nav-logo'),
    modalOverlay   = $('.modal-overlay'),
    modalContainer = $('.modal-container'),
  //  body           = $('body'),
    dirLectors     = "../assets/json/lectors/",
    dirNews        = "../assets/json/news/cz/",
    dirNewsNotices = "../assets/json/news/notices.json",
    dirLang        = "../assets/json/languages/",
    lang           = $(".languagesNews__languages"),
    lang1          = $("#1st"),
    lang2          = $("#2nd"),
    lang3          = $("#3rd");


///////////////////////******///
///custom functions///******///
/////////////////////******///


//display logic

const displayTmp = function (html, idToAdd){
  $(idToAdd).html(html);
}

// crate chunk of html
/*
const handlebarsTemplating = function(data, tmp) {
  var context  = data,
      template = Handlebars.templates[tmp],
      html     = template(context);
    return html
}*/

const handlebarsTemplating = function(data, tmp) {
  var context  = data,
      template = Handlebars.templates[tmp],
      html     = template(context);
    return html
}



//get directory from html data attr

const getDir = function(el, dataName, trgt, partDir ) {
  var data = trgt.find(el).data(dataName),
      dir  = partDir + data + ".json";
    return dir;
}

const getDirSimple = function(trgt, dataName,  partDir ) {
  var data = trgt.data(dataName),
      dir  = partDir + data + ".json";
    return dir;
};
/*
function jsonLoadOnPage(dir, tmp, idToAdd) {
  $.getJSON(dir)
  .done(function(data) {
    var html = handlebarsTemplating(data, tmp);
    displayTmp(html, idToAdd);
    //handlebarsTemplating(data, tmp, idToAdd);
    })
  .fail(function(){
      alert('Nepodarilo sa nacitat data')
    });
}*/

function jsonLoadOnPage(dir, tmp, idToAdd) {

  $.getJSON(dir)
  .then(function(data) {
    var html = handlebarsTemplating(data, tmp);
    return(html);

    //return handlebarsTemplating(data, tmp);
    //return handlebarsTemplating(data, tmp);

    //handlebarsTemplating(data, tmp, idToAdd);
    })
  .then(function(html) {
    displayTmp(html, idToAdd);
    //handlebarsTemplating(data, tmp, idToAdd);
  });
}
/*
function modalTemplating(dir, tmp, idToAdd){
  $.getJSON(dir)
    .done(function(data) {
      var html = handlebarsTemplating(data[0], tmp);
      displayTmp(html, idToAdd);
      showModal();
    })
    .fail(function(){
      alert('HTTP request failed');
    });
}*/

function modalTemplating(dir, tmp, idToAdd){
  $.getJSON(dir)
    .then(function(data) {
      //var html = handlebarsTemplating(data[0], tmp);
      //return html;
      return handlebarsTemplating(data, tmp);
    })
    .then(function(html) {
      displayTmp(html, idToAdd);
    })
    .then(function() {
      showModal();
    })
}
/*
function languagesTemplating(dir, tmp, idToAdd){
  jQuery.getJSON(
    dir)
    .done(function(data) {
      handlebarsTemplating(data, tmp, idToAdd);
    })
    .fail(function(){
      alert('HTTP request failed');
    })
}*/

////////////////
//modal////////
//////////////

const showModal = function() {
  /*body.addClass("o-hidden");*/
  modalOverlay.addClass('is-displaying')

    setTimeout(function(){
      modalOverlay.addClass('is-visible');
    }, 50);

    setTimeout(function(){
      modalContainer.addClass('is-in-position');
    }, 250);

}

const hideModal = function() {
  modalContainer.removeClass('is-in-position');

  setTimeout(function(){
    modalOverlay.removeClass('is-visible')
  }, 450 );

  setTimeout(function(){
    modalOverlay.removeClass('is-displaying');
  },  650);
  /*setTimeout(function(){
    body.removeClass("o-hidden");
  }, 1000 );*/
}

////////////
///menu////
//////////

$(document).ready(function() {


$(window).scroll(function() {

  var wScroll = $(this).scrollTop(),
      wHeight = nav.height(),
      header = $("#header"),
      wStatus = wScroll >= wHeight,
      wStatus2 = wScroll >= wHeight + 150;

    wStatus ? nav.addClass('is-fixed') : nav.removeClass('is-fixed')


    /*if (wStatus) {
      header.removeClass("header__have-shadow");
      nav.addClass('is-fixed');
    } else {
      header.addClass("header__have-shadow");
      nav.removeClass('is-fixed');
    }*/

    wStatus2 ? logo.addClass('logo-is-in-position') : logo.removeClass('logo-is-in-position')

}) // end of scroll

////////////////////
//responsive menu//
//////////////////


//experimental

const navToggleHandler = function(){
  var $this      = $(this),
      navigation = $this.parent().parent().find('.navigation'),
      submenu    = navigation.find('.submenu'),
      statusSub  = submenu.hasClass('submenu-is-open');
      //statusNav  = navigation.hasClass('is-open');

    $this.find('svg').toggleClass('is-hidden');
    //navigation.slideToggle();

    if (statusSub) {
      submenu.removeClass('submenu-is-open');
    }

    //statusNav && statusSub ? submenu.removeClass('submenu-is-open') : null;

    //statusNav ? navigation.removeClass('is-open') : navigation.addClass('is-open')
    navigation.toggleClass("is-open");

}

nav.on('click', '.toggle-menu', navToggleHandler);



//experimental!!!  maybe change it to var

const navDropDownHandler = function(){
  var wWidth = $(window).width() < 700,
      $this = $(this);

    if (wWidth) {
      $this.find('.ch-down').toggleClass('is-hidden')
           .end().find('.ch-up').toggleClass('is-hidden')
           .end().find('.submenu').toggleClass('submenu-is-open');
    }
}

nav.on('click', '.dropdown', navDropDownHandler);


///templating - modals

const lectorsHandler = function(){
  var $this = $(this);
  var dir   =  getDir('.lector__caption', 'name', $this, dirLectors);
    modalTemplating(dir, "lectorTemplate", "#modal-lector");
}

$('.lectors').on('click', '.lector', lectorsHandler);

//uni for all modals in document

$('.modal').on('click', '.close', hideModal);



///////////////////
//smooth scrolling:
////////////////// //https://css-tricks.com/snippets/jquery/smooth-scrolling/

/*
jQuery(function() {
  jQuery('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jQuery('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
*/

}); //end of dcmt ready

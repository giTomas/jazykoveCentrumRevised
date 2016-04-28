////////////////
//global vars//
//////////////

//jQuery.noConflict();

"use strict";


var nav            = $('nav'),
    logo           = $('.nav-logo'),
    modalOverlay   = $('.modal-overlay'),
    modalContainer = $('.modal-container'),
    body           = $('body'),
    dirLectors     = "../assets/json/lectors/",
    dirNews        = "../assets/json/news/cz/",
    dirNewsNotices = "../assets/json/news/notices.json",
    dirLang        = "../assets/json/languages/",
    lang1          = $('#1st'),
    lang2          = $('#2nd'),
    lang3          = $('#3rd');


///////////////////////******///
///custom functions///******///
/////////////////////******///


//display logic

const displayTmp = function(html, idToAdd){
  $(idToAdd).html(html);
}

//templating////

const handlebarsTemplating = function(data, tmp) {
  var context  = data,
      template = Handlebars.templates[tmp],
      html     = template(context);
    return html
    //$(idToAdd).html(html);
}

//get json directory

const getDir = function(el, dataName, trgt, partDir ) {
  var data = trgt.find(el).data(dataName),
      dir  = partDir + data + ".json";
    return dir;
}
/*
function getDirSimple(trgt, dataName,  partDir ) {
  var data = trgt.data(dataName),
      dir  = partDir + data + ".json";
    return dir;
};*/

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
}

function modalTemplating(dir, tmp, idToAdd){
  jQuery.getJSON(dir)
    .done(function(data) {
      var html = handlebarsTemplating(data[0], tmp);
      displayTmp(html, idToAdd);
      showModal();
    })
    .fail(function(){
      alert('HTTP request failed');
    });
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
    }, 150);

    setTimeout(function(){
      modalContainer.addClass('is-in-position');
    }, 500);

}

const hideModal = function() {
  modalContainer.removeClass('is-in-position');

  setTimeout(function(){
    modalOverlay.removeClass('is-visible')
    }, 450 );

  setTimeout(function(){
    modalOverlay.removeClass('is-displaying');
    }, 800 );
  /*setTimeout(function(){
    body.removeClass("o-hidden");
  }, 1000 );*/
}

////////////
///menu////
//////////

$(document).ready(function() {

var wScroll = function () {
$(window).scroll(function() {

  var wScroll = $(this).scrollTop(),
      wHeight = nav.height(),
      wStatus  = wScroll >= wHeight,
      wStatus2 = wScroll >= wHeight + 150;

    wStatus ? nav.addClass('is-fixed') : nav.removeClass('is-fixed')

    wStatus2 ? logo.addClass('logo-is-in-position') : logo.removeClass('logo-is-in-position')

}); // end of scroll
}

wScroll();
////////////////////
//responsive menu//
//////////////////


//experimental

const navToggleHandler = function(){
  var $this      = $(this),
      navigation = $this.parent().parent().find('.navigation'),
      submenu    = navigation.find('.submenu'),
      statusSub  = submenu.hasClass('submenu-is-open');
      //statusNav  = navigation.hasClass('is-open');  // good for animation

    $this.find('svg').toggleClass('is-hidden');
    //navigation.slideToggle();

    /*if (statusNav && statusSub) {
      submenu.removeClass('submenu-is-open');
    }*/

    if (statusSub) {
      submenu.removeClass('submenu-is-open');
    }

   navigation.toggleClass("is-open");
            //.toggleClass("some-animation-class")
    //statusNav && statusSub ? submenu.removeClass('submenu-is-open') : null;

  //statusNav ? navigation.removeClass('is-open') : navigation.addClass('is-open')
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
                                //  .toggleClass("animation")
    }
}

nav.on('click', '.dropdown', navDropdownHandler);


///templating - modals

const lectorsHandler = function(){
  var $this = $(this);
  var dir    =  getDir('.lector__caption', 'name', $this, dirLectors);
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

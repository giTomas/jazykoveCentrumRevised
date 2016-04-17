////////////////
//global vars//
//////////////

var nav            = $('nav'),
    logo           = $('.nav-logo'),
    modalOverlay   = $('.modal-overlay'),
    modalContainer = $('.modal-container'),
    body           = $('body'),
    dirLectors     = "../assets/json/lectors/",
    dirNews        = "../assets/json/news/";

///////////////////////*
///custom functions///*
/////////////////////*

//templating////

function handlebarsTemplating(data, tmp, idToAdd) {
  var context  = data,
      template = Handlebars.templates[tmp],
      html     = template(context);
    $(idToAdd).html(html);
}

function getDir(el, dataName, target, partDir ) {
  var data = target.find(el).data(dataName),
      dir  = partDir + data + ".json";
    return dir;
};

function jsonLoadOnPage(dir, tmp, idToAdd) {
  $.getJSON(
  dir)
  .done(function(data) {
    handlebarsTemplating(data, tmp, idToAdd);
    });
};

function modalTemplating(urlJSON, tmp, idToAdd){
  $.getJSON(
    urlJSON)
    .done(function(data) {
      handlebarsTemplating(data[0], tmp, idToAdd);
      showModal();
    });
};

////////////////
//modal////////
//////////////

function showModal() {
  //body.addClass("o-hidden");
  modalOverlay.addClass('is-displaying');
    setTimeout(function(){
      modalOverlay.addClass('is-visible');
    }, 150);
    setTimeout(function(){
      modalContainer.addClass('is-in-position');
    }, 550);
};

function hideModal(){
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
};

////////////
///menu////
//////////

$( document ).ready(function() {

$(window).scroll(function() {

  var wScroll = $(this).scrollTop(),
      wHeight = nav.height();

    wScroll >= wHeight ? nav.addClass('is-fixed') : nav.removeClass('is-fixed');

    wScroll >= wHeight + 200 ? logo.addClass('logo-is-in-position') : logo.removeClass('logo-is-in-position')

}); // end of scroll

////////////////////
//responsive menu//
//////////////////

nav.on('click', '.toggle-menu', function(){

  var target     = $(this),
      navigation = target.parent().parent().find('.navigation'),
      submenu    = navigation.find('.submenu'),
      statusNav  = navigation.hasClass('is-open'),
      statusSub  = submenu.hasClass('submenu-is-open');

    target.find('svg').toggleClass('is-hidden');

    /*if ( statusNav && statusSub ) {
      submenu.removeClass('submenu-is-open');
    };*/

    statusNav && statusSub ? submenu.removeClass('submenu-is-open') : null;

    statusNav ? navigation.removeClass('is-open') : navigation.addClass('is-open');

});

nav.on('click', '.dropdown', function() {

  var wWidth = $(window).width() < 700;
      target = $(this);

    if (wWidth) {
      target.find('.ch-down').toggleClass('is-hidden')
      .end().find('.ch-up').toggleClass('is-hidden')
      .end().find('.submenu').toggleClass('submenu-is-open');
    };
});

///templating - modals

$('.lectors').on('click', '.lector', function(){
  var target = $(this);
  var dir    =  getDir('.lector-caption', 'name', target, dirLectors);
    modalTemplating(dir, "lectorTemplate", "#modal-lector");
});

//uni for all modals

$('.modal').on('click', '.close', function(){
  hideModal();
});

///////////////////
//smooth scrolling:
////////////////// //https://css-tricks.com/snippets/jquery/smooth-scrolling/

/*
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

*/

}); //end of dcmt ready

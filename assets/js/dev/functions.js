////////////////
//global vars//
//////////////

//jQuery.noConflict();

var nav            = jQuery('nav'),
    logo           = jQuery('.nav-logo'),
    modalOverlay   = jQuery('.modal-overlay'),
    modalContainer = jQuery('.modal-container'),
    body           = jQuery('body'),
    dirLectors     = "../assets/json/lectors/",
    dirNews        = "../assets/json/news/cz/",
    dirNewsNotices = "../assets/json/news/notices.json",
    dirLang        = "../assets/json/languages/";

///////////////////////******///
///custom functions///******///
/////////////////////******///

//templating////

function handlebarsTemplating(data, tmp, idToAdd) {
  var context  = data,
      template = Handlebars.templates[tmp],
      html     = template(context);
    jQuery(idToAdd).html(html);
};

function getDir(el, dataName, trgt, partDir ) {
  var data = trgt.find(el).data(dataName),
      dir  = partDir + data + ".json";
    return dir;
};

function getDirSimple(trgt, dataName,  partDir ) {
  var data = trgt.data(dataName),
      dir  = partDir + data + ".json";
    return dir;
};

function jsonLoadOnPage(dir, tmp, idToAdd) {
  jQuery.getJSON(
  dir)
  .done(function(data) {
    handlebarsTemplating(data, tmp, idToAdd);
    })
  .fail(function(){
      alert('Nepodarilo sa nacitat data')
    })
};

function modalTemplating(dir, tmp, idToAdd){
  jQuery.getJSON(
    dir)
    .done(function(data) {
      handlebarsTemplating(data[0], tmp, idToAdd);
      showModal();
    })
    .fail(function(){
      alert('HTTP request failed');
    })
};

function languagesTemplating(dir, tmp, idToAdd){
  jQuery.getJSON(
    dir)
    .done(function(data) {
      handlebarsTemplating(data, tmp, idToAdd);
    })
    .fail(function(){
      alert('HTTP request failed');
    })
};

////////////////
//modal////////
//////////////

function showModal() {
  /*body.addClass("o-hidden");*/
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

jQuery( document ).ready(function() {

jQuery(window).scroll(function() {

  var wScroll = jQuery(this).scrollTop(),
      wHeight = nav.height();

    wScroll >= wHeight ? nav.addClass('is-fixed') : nav.removeClass('is-fixed');

    wScroll >= wHeight + 150 ? logo.addClass('logo-is-in-position') : logo.removeClass('logo-is-in-position')

}); // end of scroll

////////////////////
//responsive menu//
//////////////////

nav.on('click', '.toggle-menu', function(){

  var trgt       = jQuery(this),
      navigation = trgt.parent().parent().find('.navigation'),
      submenu    = navigation.find('.submenu'),
      statusNav  = navigation.hasClass('is-open'),
      statusSub  = submenu.hasClass('submenu-is-open');

    trgt.find('svg').toggleClass('is-hidden');

    /*if ( statusNav && statusSub ) {
      submenu.removeClass('submenu-is-open');
    };*/

    statusNav && statusSub ? submenu.removeClass('submenu-is-open') : null;

    statusNav ? navigation.removeClass('is-open') : navigation.addClass('is-open');

});

nav.on('click', '.dropdown', function() {

  var wWidth = jQuery(window).width() < 700;
      trgt = jQuery(this);

    if (wWidth) {
      trgt.find('.ch-down').toggleClass('is-hidden')
      .end().find('.ch-up').toggleClass('is-hidden')
      .end().find('.submenu').toggleClass('submenu-is-open');
    };
});

///templating - modals

jQuery('.lectors').on('click', '.lector', function(){
  var trgt = jQuery(this);
  var dir    =  getDir('.lector-caption', 'name', trgt, dirLectors);
    modalTemplating(dir, "lectorTemplate", "#modal-lector");
});

//uni for all modals

jQuery('.modal').on('click', '.close', function(){
  hideModal();
});

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

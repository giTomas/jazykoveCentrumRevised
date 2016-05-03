////////////////
//global vars//
//////////////

//jQuery.noConflict();

"use strict";

var nav            = $('nav'),
    logo           = $('.nav-logo'),
    modalOverlay   = $('.modal-overlay'),
    modalContainer = $('.modal-container'),
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

// template

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

function jsonLoadOnPage(dir, tmp, idToAdd) {
  $.getJSON(dir)
  .then(function(data) {
    var html = handlebarsTemplating(data, tmp);
    return html;
    })
  .then(function(html) {
    displayTmp(html, idToAdd);
  });
}

function modalTemplating(dir, tmp, idToAdd){
  $.getJSON(dir)
    .then(function(data) {
      var html = handlebarsTemplating(data, tmp);
      return html;
    })
    .then(function(html) {
      displayTmp(html, idToAdd);
    })
    .then(function() {
      showModal();
    })
}

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
    }, 200);
}

const hideModal = function() {
  modalContainer.removeClass('is-in-position');
  setTimeout(function(){
    modalOverlay.removeClass('is-visible')
  }, 400 );
  setTimeout(function(){
    modalOverlay.removeClass('is-displaying');
  },  600);
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
    wStatus2 ? logo.addClass('logo-is-in-position') : logo.removeClass('logo-is-in-position')

}) // end of scroll

////////////////////
//responsive menu//
//////////////////

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

//experimental!!!

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


$('.modal').on('click', '.close', hideModal);


}); //end of dcmt ready

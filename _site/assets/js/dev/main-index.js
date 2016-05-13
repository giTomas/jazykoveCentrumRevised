"use strict";

$(document).ready(function(){

var nav            = $('nav'),
    modalOverlay   = $('.modal-overlay'),
    modalContainer = $('.modal-container'),
    dirLang        = "../assets/json/languages/",
    lang           = $(".languagesNews__languages"),
    lang1          = $("#1st"),
    lang2          = $("#2nd"),
    lang3          = $("#3rd");
    //container     = $(".languagesNews__outerContainer");

function displayTmp(html, idToAdd){
  $(idToAdd).html(html);
 }

function handlebarsTemplating(data, tmp) {
  var context  = data,
      template = Handlebars.templates[tmp],
      html     = template(context);
    return html;
 }

function getDir(el, dataName, trgt, partDir ) {
  var data = trgt.find(el).data(dataName),
      dir  = partDir + data + ".json";
    return dir;
 }

 function jsonLoadOnPage(dir, tmp, idToAdd) {
   $.getJSON(dir)
   .then(function(data) {
     //var html = handlebarsTemplating(data, tmp);
     //return html;
     return handlebarsTemplating(data, tmp);
     })
   .then(function(html) {
     displayTmp(html, idToAdd);
   });
 }

 function modalTemplating(dir, tmp, idToAdd){
   $.getJSON(dir)
     .then(function(data) {
       //var html = handlebarsTemplating(data, tmp);
       return handlebarsTemplating(data, tmp);
     })
     .then(function(html) {
       displayTmp(html, idToAdd);
     })
     .then(function() {
       showModal();
     })
 }

function showModal() {
 /*body.addClass("o-hidden");*/
 modalOverlay.addClass('is-block')
   setTimeout(function(){
     modalOverlay.addClass('is-visible');
   }, 50);
   setTimeout(function(){
     modalContainer.addClass('is-in-position');
   }, 200);
}

var hideModal = function() {
 modalContainer.removeClass('is-in-position');
 setTimeout(function(){
   modalOverlay.removeClass('is-visible')
 }, 400 );
 setTimeout(function(){
   modalOverlay.removeClass('is-block');
 },  600);
 /*setTimeout(function(){
   body.removeClass("o-hidden");
 }, 1000 );*/
};

$(window).scroll(function() {

  var wScroll  = $(this).scrollTop(),
      logo     = $('.nav-logo'),
      wHeight  = nav.height(),
      wStatus  = wScroll >= wHeight,
      wStatus2 = wScroll >= wHeight + 150;

  wStatus ? nav.addClass('is-fixed') : nav.removeClass('is-fixed')
  wStatus2 ? logo.addClass('logo-is-in-position') : logo.removeClass('logo-is-in-position')

}) // end of scroll

////////////////////
//responsive menu//
//////////////////

var navToggleHandler = function(){
  var $this      = $(this),
      navigation = $this.parent().parent().find('.navigation'),
      submenu    = navigation.find('.submenu'),
      statusSub  = submenu.hasClass('submenu-is-open'),
      svg        = $this.find('svg');

    svg.toggleClass('is-hidden');

    if (statusSub) {
      submenu.removeClass('submenu-is-open');
    }

    navigation.toggleClass("is-open");

};

var navDropDownHandler = function(){
  var wWidth = $(window).width() < 750,
      $this = $(this);

    if (wWidth) {
      $this.find('.ch-down').toggleClass('is-hidden')
           .end().find('.ch-up').toggleClass('is-hidden')
           .end().find('.submenu').toggleClass('submenu-is-open');
    }
};

nav.on('click', '.toggle-menu', navToggleHandler);

nav.on('click', '.dropdown', navDropDownHandler);

var newsClickHandler = function(){
  var $this   = $(this);
  var hasClass = $this.find('i').hasClass('notice-modal');

  if (hasClass) {
    var dir = getDir(".notice-content", "date", $this, "../assets/json/news/cz/");
    modalTemplating(dir, "newTemplate", "#modal-new");
  }
};

function addRemoveHiglight( el1, el2, trgt, class) {
  trgt.closest(el1).find(el2)       //addremove class is-picked
  .removeClass(class)
  .end().end().addClass(class);
}

function addRemove(id, el, class) {
  $(id).find('.languages-hidden').removeClass(class);
  $(el).addClass(class);
};

var firstChoiceHandler = function(){
  var $this = $(this),
      dir  = getDir( "h3", "category", $this, dirLang);

  addRemoveHiglight(lang1, '.language-item', $this, 'is-picked');

  $.getJSON(dir)
    .then(function(data) {
      var html = handlebarsTemplating(data, "languageTemplate");
      return html;
    })
    .then(function(html){
      var dirAncient = "../assets/json/languages/starobyle.json",
            ancientDir =  dir === dirAncient;

      if (ancientDir) {
        displayTmp(html, lang3);
        addRemove(lang, lang3, 'is-flex');
      } else {
        displayTmp(html, lang2);
        addRemove(lang, lang2, 'is-flex');
        }
    });
};

//trigger click event

var secondChoiceHandler = function(){
  var $this = $(this),
      dir  = getDir( "h4", "category", $this, dirLang );
  addRemoveHiglight('#2nd', '.language-item', $this, 'is-picked');

  $.getJSON(dir)
    .then(function(data) {
      var html = handlebarsTemplating(data, "languageTemplate");
      return html;
    })
    .then(function(html) {
      lang3.html(html)
           .addClass('is-flex');
    });

};

var firstCloseHandler = function(){
  var el = $('.languages-hidden');
  el.removeClass('is-flex');
  lang1.find('.language-item').removeClass('is-picked');
};

var secondCloseHandler = function(){
  var  langStatus  = lang2.hasClass('is-flex');
  lang3.removeClass('is-flex');

  if (langStatus) {
    lang2.find('.language-item').removeClass('is-picked');
  } else {
    lang1.find('.language-item').removeClass('is-picked');
 }

};

jsonLoadOnPage("../assets/json/news/notices.json", "noticesTemplate", "#news");

$("#news").on("click", ".notice-flex", newsClickHandler);

lang1.on("click", ".language-item", firstChoiceHandler);

lang2.on("click", ".language-item", secondChoiceHandler);

lang2.on("click", ".languageTemplate__close", firstCloseHandler);

lang3.on("click", ".languageTemplate__close", secondCloseHandler);

$('.modal').on('click', '.close', hideModal);

});//end of scope

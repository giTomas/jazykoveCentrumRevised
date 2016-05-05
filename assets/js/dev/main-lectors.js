"use strict";

$(document).ready(function(){

var nav            = $('nav'),
    modalOverlay   = $('.modal-overlay'),
    modalContainer = $('.modal-container');
    //dirLectors     = "../assets/json/lectors/";

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

 function modalTemplating(dir, tmp, idToAdd){
   $.getJSON(dir)
     .then(function(data) {
       //var html = handlebarsTemplating(data, tmp);
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

  var wScroll = $(this).scrollTop(),
      wHeight = nav.height(),
      logo    = $('.nav-logo'),
      wStatus = wScroll >= wHeight,
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

var lectorsHandler = function(){
  var $this = $(this);
  var dir   =  getDir('.lector__caption', 'name', $this, "../assets/json/lectors/");
  modalTemplating(dir, "lectorTemplate", "#modal-lector");
};

$('.lectors').on('click', '.lector', lectorsHandler);

$('.modal').on('click', '.close', hideModal);

});//end of scope

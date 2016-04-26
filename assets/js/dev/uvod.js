$(document).ready(function() {

"use strict";

//load news

jsonLoadOnPage(dirNewsNotices, "noticesTemplate", "#news");

//load details after click on a notice

const newsClickHandler = function(){
  var $this = $(this);
  var dir = getDir(".notice-content", "date", $this, dirNews);
  modalTemplating(dir, "newTemplate", "#modal-new");
}

$("#news").on("click", ".notice", newsClickHandler);



//languages displaying

const addRemoveHiglight = function ( el1, el2, trgt, class) {
  trgt.parent(el1).find(el2)       //addremove class is-picked
  .removeClass(class)
  .end().end().addClass(class);
}

const addRemove = function( id, el, class) {
  $(id).find('.languages').removeClass(class);    // removes only class not content of the container
  $(el).addClass(class);
}
//1st click

const firstChoiceHandler = function(){
  var $this = $(this),
      dir  = getDir( "h3", "category", $this, dirLang );

  addRemoveHiglight(lang1, '.language-item', $this, 'is-picked');

  $.getJSON(dir)
    .done(function(data) {
      var html = handlebarsTemplating(data, "languageTemplate"),
          dirAncient = "../assets/json/languages/starobyle.json",
          whichDir =  dir === dirAncient;
    // put elements in the right container
      if (whichDir) {
        displayTmp(html, lang3);
        addRemove( '#languages', lang3, 'is-flex');
      } else {
        displayTmp(html, lang2);
        addRemove( '#languages', lang2, 'is-flex');
        }
    })
    .fail(function(){
      alert('HTTP request failed');
    });
}

//trigger click event

lang1.on("click", ".language-item", firstChoiceHandler);


//2nd click handler

const secondChoiceHandler = function(){
  var trgt = $(this),
      dir  = getDir( "h3", "category", trgt, dirLang );
  addRemoveHiglight('#2nd', '.language-item', trgt, 'is-picked');

  $.getJSON(dir)
    .done(function(data) {
      var html = handlebarsTemplating(data, "languageTemplate");
      /*var context  = data,
      // var source = $('#languageTemplate').html();
          template = Handlebars.templates.languageTemplate,
      // var template = Handlebars.compile(source)
          html     = template(context);*/
      lang3.html(html)
           .addClass('is-flex');
    })
    .fail(function(){
      alert('HTTP request failed')
    });
}

//trigger click event

lang2.on("click", ".language-item", secondChoiceHandler)

//closing languages windows

const firstCloseHandler = function(){
  var el = $('.languages');
  el.removeClass('is-flex');
  lang1.find('.language-item').removeClass('is-picked');
}

const secondCloseHandler = function(){
  var el          = $(this).parent(),
      langStatus  = lang2.hasClass('is-flex');

  el.removeClass('is-flex');

  if (langStatus) {
    lang2.find('.language-item').removeClass('is-picked');
  } else {
    lang1.find('.language-item').removeClass('is-picked');
 }
}

lang2.on("click", ".close", firstCloseHandler);

lang3.on("click", ".close", secondCloseHandler);


});

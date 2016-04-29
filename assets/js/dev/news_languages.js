const addRemoveHiglight = function ( el1, el2, trgt, class) {
  trgt.closest(el1).find(el2)       //addremove class is-picked
  .removeClass(class)
  .end().end().addClass(class);
}

const addRemove = function(id, el, class) {
  $(id).find('.languages').removeClass(class);
  $(el).addClass(class);
}


const firstChoiceHandler = function(){
  var $this = $(this),
      dir  = getDir( "h3", "category", $this, dirLang );

  addRemoveHiglight(lang1, '.language-item', $this, 'is-picked');
  $.getJSON(dir)
    .then(function(data) {
      //var html = handlebarsTemplating(data, "languageTemplate");
      var context = data;
      var source = $('#languageTemplate').html();
      var template = Handlebars.compile(source);
      var html = template(context);
      return html;

      //return handlebarsTemplating(data, "languageTemplate");
    })
    .then(function(html){
      var dirAncient = "../assets/json/languages/starobyle.json",
            whichDir =  dir === dirAncient;

      if (whichDir) {
        displayTmp(html, lang3);
        addRemove( '#languages', lang3, 'is-flex');
      } else {
        displayTmp(html, lang2);
        addRemove( '#languages', lang2, 'is-flex');
        }
    });
}


//trigger click event

lang1.on("click", ".language-item", firstChoiceHandler);

const secondChoiceHandler = function(){
  var trgt = $(this),
      dir  = getDir( "h3", "category", trgt, dirLang );
  addRemoveHiglight('#2nd', '.language-item', trgt, 'is-picked');



  $.getJSON(dir)
    .then(function(data) {
      //var html = handlebarsTemplating(data, "languageTemplate");
      //return(html)
      var context = data;
      var source = $('#languageTemplate').html();
      var template = Handlebars.compile(source);
      var html = template(context);
      return html;
      // return handlebarsTemplating(data, "languageTemplate");
    })
    .then(function(html) {
      lang3.html(html)
           .addClass('is-flex');
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
  // var el          = $(this).parent(),
  var    langStatus  = lang2.hasClass('is-flex');

  lang3.removeClass('is-flex');

  if (langStatus) {
    lang2.find('.language-item').removeClass('is-picked');
  } else {
    lang1.find('.language-item').removeClass('is-picked');
 }
}

lang2.on("click", ".close", firstCloseHandler);

lang3.on("click", ".close", secondCloseHandler);

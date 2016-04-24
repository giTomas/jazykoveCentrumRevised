$(document).ready(function() {

//load news

jsonLoadOnPage(dirNewsNotices, "noticesTemplate", "#news");

//2.load details after click on a notice

jQuery("#news").on("click", ".notice", function(){
  var trgt = $(this);
  var dir = getDir(".notice-content", "date", trgt, dirNews);
  modalTemplating(dir, "newTemplate", "#modal-new");
});


//languages displaying

function addRemoveHiglight( el1, el2, trgt, class) {
  trgt.parent(el1).find(el2)       //addremove class is-picked
  .removeClass(class)
  .end().end().addClass(class);
}

function addRemove( id, el, class) {
  $(id).find('.languages').removeClass(class);
  $(el).addClass(class);
};

//1st click

lang1.on("click", ".language-item", function(){
  var trgt = $(this),
      dir  = getDir( "h3", "category", trgt, dirLang );

  addRemoveHiglight(lang1, '.language-item', trgt, 'is-picked');

  $.getJSON(dir)
    .done(function(data) {
      //handlebarsTemplating(data, languageTemplate, "#2nd");
      var context  = data,
      // var source = $('#languageTemplate').html();
          template = Handlebars.templates.languageTemplate,
      // var template = Handlebars.compile(source)
          html     = template(context),
          whichDir =  dir === "../assets/json/languages/starobyle.json";
    // put elements in the right container
    if (whichDir) {
      lang3.html(html);
      addRemove( '#languages', lang3, 'is-flex');
    } else {
      lang2.html(html);
      addRemove( '#languages', lang2, 'is-flex');
    };
    })
    .fail(function(){
      alert('HTTP request failed')
    })
});


//2nd click

lang2.on("click", ".language-item", function(){
  var trgt = $(this),
      dir  = getDir( "h3", "category", trgt, dirLang );
  addRemoveHiglight('#2nd', '.language-item', trgt, 'is-picked');

  $.getJSON(dir)
    .done(function(data) {
      var context  = data,
      // var source = $('#languageTemplate').html();
          template = Handlebars.templates.languageTemplate,
      // var template = Handlebars.compile(source)
          html     = template(context);
      lang3.html(html)
           .addClass('is-flex');
    })
    .fail(function(){
      alert('HTTP request failed')
    })

});

//3rd click

/*lang3.on("click", ".language-item", function(){
  var trgt = jQuery(this),
      dir  = getDir( "h3", "category", trgt, dirLang );

  //addRemoveHiglight(lang3, '.language-item', trgt, 'is-picked')
});*/

//closing languages windows

lang2.on("click", ".close", function(){
  var el = $('.languages');
  el.removeClass('is-flex');
  lang1.find('.language-item').removeClass('is-picked');
});

lang3.on("click", ".close", function(){
  var el = $(this).parent();   //#3rd
  el.removeClass('is-flex');
  lang2.find('.language-item').removeClass('is-picked');
});

});

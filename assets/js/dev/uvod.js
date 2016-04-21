jQuery(document).ready(function() {

//load news

jsonLoadOnPage(dirNewsNotices, "noticesTemplate", "#news");

//2.load details after click on notice

jQuery("#news").on("click", ".notice", function(){
  var trgt = jQuery(this);
  var dir = getDir(".notice-content", "date", trgt, dirNews);
  modalTemplating(dir, "newTemplate", "#modal-new");
});

function addRemoveHiglight( el1, el2, trgt, class) {
  trgt.parent(el1).find(el2)       //addremove class is-picked
  .removeClass(class)
  .end().end().addClass(class);
}

function addRemove( id, el, class) {
  $(id).find('.languages').removeClass(class);
  $(el).addClass(class);
};

/*function addRemove2( el, class) {
  $(el).removeClass(class);
  .addClass(class);
};*/

//1st click

jQuery("#1st").on("click", ".language-item", function(){
  var trgt = jQuery(this),
      dir    = getDir( "h3", "category", trgt, dirLang );

  addRemoveHiglight('#1st', '.language-item', trgt, 'is-picked');
  //languagesTemplating(dir, languageTemplate, "#2nd");
  //function(dir, tmp, idToAdd) {

    jQuery.getJSON(dir)

      .done(function(data) {
        //handlebarsTemplating(data, languageTemplate, "#2nd");
        var context  = data;
        // var source = $('#languageTemplate').html();
        var template = Handlebars.templates.languageTemplate;
        // var template = Handlebars.compile(source)
        var   html     = template(context);
        $("#2nd").html(html)
          // jQuery("#2nd").html(html);
        addRemove( '#languages', '#2nd', 'is-flex');
      })

      .fail(function(){
        alert('HTTP request failed')
      })
});


//2nd click

$("#2nd").on("click", ".language-item", function(){
  var trgt = $(this),
      dir    = getDir( "h3", "category", trgt, dirLang );
      /*var t = this.className
      console.log(t === 'language-item state-1');
      console.log(this);

      console.log(this === $(this)[0]);*/

  addRemoveHiglight('#2nd', '.language-item', trgt, 'is-picked');

  jQuery.getJSON(dir)
    .done(function(data) {
      //handlebarsTemplating(data, languageTemplate, "#2nd");
      var context  = data;
      // var source = $('#languageTemplate').html();
      var template = Handlebars.templates.languageTemplate;
      // var template = Handlebars.compile(source)
      var   html     = template(context);
      $("#3rd").html(html)
        // jQuery("#2nd").html(html);
      //addRemove2( '#3rd', 'is-flex');

    $('#3rd').addClass('is-flex');   //show container

    })
    .fail(function(){
      alert('HTTP request failed')
    })

});

//3rd click

jQuery("#3rd").on("click", ".language-item", function(){
  var trgt = jQuery(this),
      dir    = getDir( "h3", "category", trgt, dirLang );

  addRemoveHiglight('#3rd', '.language-item', trgt, 'is-picked')
});

//closing languages windows

$("#2nd").on("click", ".close", function(){
  var el = $('.languages');
  el.removeClass('is-flex');
  $('#1st').find('.language-item').removeClass('is-picked');

});

$("#3rd").on("click", ".close", function(){
  var el = $(this).parent();
  el.removeClass('is-flex');
  $('#2nd').find('.language-item').removeClass('is-picked');
});

});

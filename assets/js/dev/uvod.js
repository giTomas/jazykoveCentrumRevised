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

function addRemove( id, el, trgt, class) {
  $(id).find('.languages').removeClass(class);
  $(el).addClass(class);
};

//1st click

jQuery("#1st").on("click", ".language-item", function(){
  var trgt = jQuery(this),
      dir    = getDir( "h3", "category", trgt, dirLang );
  addRemoveHiglight('#1st', '.language-item', trgt, 'is-picked');
  console.log(dir);



  //languagesTemplating(dir, languageTemplate, "#2nd");

  //function(dir, tmp, idToAdd) {
    jQuery.getJSON(dir)
      .done(function(data) {
        console.log('hello');
        //handlebarsTemplating(data, languageTemplate, "#2nd");
        var context  = data,
            template = Handlebars.templates[languageTemplate],
            html     = template(context);
          jQuery("#2nd").html(html);
      })
      .fail(function(){
        alert('HTTP request failed')
      })
  /*};
  /*jQuery.getJSON(dir)
  .done(function(data){
    addRemove( '#languages', '#2nd', trgt, 'is-flex');
    console.log(data)
  })
  .fail(function(){
    alert('HTTP request failed')
  })*/
});


//2nd click

jQuery("#2nd").on("click", ".language-item", function(){
  var trgt = jQuery(this),
      dir    = getDir( "h3", "category", trgt, dirLang );

  addRemoveHiglight('2nd', '.language-item', trgt, 'is-picked')
});

//3rd click

jQuery("#3rd").on("click", ".language-item", function(){
  var trgt = jQuery(this),
      dir    = getDir( "h3", "category", trgt, dirLang );

  addRemoveHiglight('#3rd', '.language-item', trgt, 'is-picked')
});

});

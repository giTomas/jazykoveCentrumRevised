jQuery(document).ready(function() {

//load news

jsonLoadOnPage(dirNewsNotices, "noticesTemplate", "#news");

//2.load details after click on notice

jQuery("#news").on("click", ".notice", function(){
  var target = jQuery(this);
  var dir = getDir(".notice-content", "date", target, dirNews);
  modalTemplating(dir, "newTemplate", "#modal-new");
});

function addRemoveHiglight( el1, el2, target, class) {
  target.parent(el1).find(el2)       //addremove class is-picked
  .removeClass('is-picked')
  .end().end().addClass(class);
}


//1st click

jQuery("#1st").on("click", ".language-item", function(){
  var target = jQuery(this),
      dir    = getDir( "h3", "category", target, dirLang );
  console.log(dir);
  addRemoveHiglight('#1st', '.language-item', target, 'is-picked')


  jQuery.getJSON(dir)
  .done(function(data){
    console.log(data.languages);
    console.log(data.items[1]);
  })
  .fail(function(){
    alert('HTTP request failed')
  })
});


//2nd click

jQuery("#2nd").on("click", ".language-item", function(){
  var target = jQuery(this),
      dir    = getDir( "h3", "category", target, dirLang );

  addRemoveHiglight('2nd', '.language-item', target, 'is-picked')
});

//3rd click

jQuery("#3rd").on("click", ".language-item", function(){
  var target = jQuery(this),
      dir    = getDir( "h3", "category", target, dirLang );

  addRemoveHiglight('#3rd', '.language-item', target, 'is-picked')
});

});

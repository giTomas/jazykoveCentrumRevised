var headline = $(".newsLanguages__headlineNews");

$(window).scroll(function() {


    var wScroll = $(this).scrollTop();
    var headlineScroll = headline.height();
    var scrollStatus = wScroll >= headlineScroll / 4;
    scrollStatus ? headline.addClass("headline-inPosition") : headline.removeClass("headline-inPosition")

});



headline.on("click", function(){

  //jsonLoadOnPage(dirNewsNotices, "noticesTemplate", "#modal-new");
  $.getJSON(dirNewsNotices)
  .then(function(data) {
    //var html = handlebarsTemplating(data, tmp);

    var context  = data;
    var    template = $("#idNoticesTemplate").html();
    var templateScript = Handlebars.compile(template);
    var    html     = templateScript(context);
    //handlebarsTemplating(data, tmp, idToAdd);
    return(html);
    })
  .then(function(html) {
    displayTmp(html, "#modal-new");
  })
  .then(function(){
    showModal();
  });

});

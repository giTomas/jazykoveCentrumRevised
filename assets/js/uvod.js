$( document ).ready(function() {

//load news

jsonLoadOnPage("../assets/json/news/notices.json", "#noticesTemplate", "#news");

//2.load details after click on notice

$("#news").on("click", ".notice", function(){
  var target = $(this);
  var urlJSON = getUrlJson(".notice-content", "date", target, "../assets/json/news/" );
  modalTemplating(urlJSON, "#newTemplate", "#modal-new");
});

});

$(document).ready(function() {

//load news

jsonLoadOnPage("../assets/json/news/notices.json", "noticesTemplate", "#news");

//2.load details after click on notice

$("#news").on("click", ".notice", function(){
  var target = $(this);
  var dir = getDir(".notice-content", "date", target, dirNews);
  console.log(dir);
  modalTemplating(dir, "newTemplate", "#modal-new");
});

});

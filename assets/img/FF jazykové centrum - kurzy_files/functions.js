$( document ).ready(function() {

var nav            = $('nav'),
    logo           = $('nav .logo-container'),
    modalOverlay   = $('.modal-overlay'),
    modalContainer = $('.modal-container'),
    body           = $('body');

//functions
///////////

//get data from html attr
/*
function getData(el, attr) {
  var data = $(el).data(attr);
  return data;
};

function getUrl(el, data) {
  var urlJSON;
  data = $(el).data(data);
  urlJSON = data + '.json';
  return urlJASON;
};*/

// show modal

function showModal() {
  modalOverlay.addClass('is-displaying');
  setTimeout(function(){
    modalOverlay.addClass('is-visible');
  }, 250);
  setTimeout(function(){
    modalContainer.addClass('is-visible');
  }, 600);
  body.addClass("o-hidden");
};


//hide modal

function hideModal(){
  modalOverlay.removeClass('is-displaying')
  .removeClass('is-visible');
  modalContainer.removeClass('is-visible');
  body .removeClass("o-hidden");
};


$(window).scroll(function() {

    var wScroll = $(this).scrollTop();
    //var wHeight = $(".banner").height();
    var wHeight = $("nav").height();
    //var wHeight2 = $("nav").height() * 2;


    if (wScroll >= wHeight) {
            nav.addClass('is-fixed');
            logo.addClass('is-flex');

        } else {
            nav.removeClass('is-fixed');
            logo.removeClass('is-flex');

    };
/*
    if (wScroll >= wHeight * 3) {
            logo.addClass('is-flex');    //change class name
        } else {
            logo.removeClass('is-flex');

    };*/

}); // end of scroll

/*
$('.menu').on('click', function() {
    $('.navigation').toggleClass('is-showing');
    $('.hamburger').toggleClass('is-hidden');
    $('.cross').toggleClass('is-hidden');

    if (!nav.hasClass('is-fixed')){
        nav.addClass('is-fixed');
    };

}); //end of menu function*/

///////////////////
//smooth scrolling:
////////////////// //https://css-tricks.com/snippets/jquery/smooth-scrolling/

/*
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});*/

///////modal///////
//////////////////



$('.lectors').on('click', '.lector', function(){
  var data;
  var urlJSON;
  data = $(this).find('.lector-name').data('name');
  urlJSON = "/assets/json/lectors/" + data + ".json";
  $.getJSON(
    urlJSON,
    function(data){
      var lector = data[0];
      var source = $("#lector-template").html()
      var template = Handlebars.compile(source);
      var html = template(lector);
      $("#modal-lector").html(html);
      showModal();
    });


});

$('.modal').on('click', '.close', function(){
  hideModal();
});


}); //end of dc ready

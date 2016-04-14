$( document ).ready(function() {
/////////
//vars//
////////

var nav            = $('nav'),                        //object? dom.nav ...
    logo           = $('nav .logo-container'),
    modalOverlay   = $('.modal-overlay'),
    modalContainer = $('.modal-container'),
    body           = $('body');

/////////////
//functions/
////////////

//get JSON Url

function getUrlJson(el, dataName, target, partUrl ) {
  var data;
  var urlJSON;
  data = target.find(el).data(dataName);
  urlJSON = partUrl + data + ".json";
  return urlJSON;
};

//AJAX json + modal template

function httpTemplating(urlJSON, el, id ){
  $.getJSON(
    urlJSON)
    .done(function(data) {
      var context = data[0];    ///!!!
      var source = $(el).html()
      var template = Handlebars.compile(source);
      var html = template(context);
      $(id).html(html);
      showModal();
    });
};

// show modal

function showModal() {
  body.addClass("o-hidden");
  modalOverlay.addClass('is-displaying');
  setTimeout(function(){
    modalOverlay.addClass('is-visible');
  }, 150);
  setTimeout(function(){
    modalContainer.addClass('is-in-position');
  }, 550);

};


//hide modal

function hideModal(){
  modalContainer.removeClass('is-in-position');
  setTimeout(function(){
    modalOverlay.removeClass('is-visible')
  }, 450 );
  setTimeout(function(){
    modalOverlay.removeClass('is-displaying');
  }, 800 );
  setTimeout(function(){
    body.removeClass("o-hidden");
  }, 1000 );
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

}); // end of scroll


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
/*
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
    });*/

//click events


$('.lectors').on('click', '.lector', function(){
  var target = $(this);
  urlJSON =  getUrlJson('.lector-caption', 'name', target, '/assets/json/lectors/');
  httpTemplating(urlJSON, "#lector-template", "#modal-lector");
});



$('.modal').on('click', '.close', function(){
  hideModal();
});

//responsive menu
/////////////////

nav.on('click', '.toggle-menu', function(){
  var target = $(this);
  target.find('i.fa-bars').toggleClass('is-hidden');
  target.find('i.fa-times').toggleClass('is-hidden');
  $('.navigation').toggleClass('is-open');
  //$('.navigation').slideToggle();
});

nav.on('click', '.dropdown', function(event) {
    var wWidth = $(window).width();
    var target = $(this);
    if  ( wWidth <  700) {
    target.find('.ch-down').toggleClass('is-hidden');
    target.find('.ch-up').toggleClass('is-hidden');
    target.find('.submenu').toggleClass('submenu-is-open');
  event.preventDefault();
}
});

}); //end of dc ready

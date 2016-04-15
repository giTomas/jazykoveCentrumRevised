/////////
//vars//
////////

var nav            = $('nav'),                        //object? dom.nav ...
    logo           = $('.nav-logo'),
    modalOverlay   = $('.modal-overlay'),
    modalContainer = $('.modal-container'),
    body           = $('body');


function jsonLoadOnPage(urlJSON, tempEl, idToAppend) {
  $.getJSON(
  urlJSON)
  .done(function(data) {
    var context = data,
        source = $(tempEl).html(),
        template = Handlebars.compile(source),
        html = template(context);
    $(idToAppend).append(html);
    });
};

function getUrlJson(el, dataName, target, partUrl ) {
  var data,
      urlJSON;

  data = target.find(el).data(dataName);
  urlJSON = partUrl + data + ".json";
  return urlJSON;
};

function modalTemplating(urlJSON, idTemplate, idToAdd){
  $.getJSON(
    urlJSON)
    .done(function(data) {
      var context = data[0],
          source = $(idTemplate).html(),
          template = Handlebars.compile(source),
          html = template(context);
      $(idToAdd).html(html);
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



$( document ).ready(function() {


/////////////
//functions/
////////////

//get JSON Url


//AJAX json + modal template




$(window).scroll(function() {

  var wScroll = $(this).scrollTop(),
      wHeight = $("nav").height();

    if (wScroll >= wHeight) {
      nav.addClass('is-fixed');
    } else {
      nav.removeClass('is-fixed');
    };

    if (wScroll >= wHeight + 200) {
      logo.addClass('logo-is-in-position');
    } else {
      logo.removeClass('logo-is-in-position');
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

//load lectors  ///some problem with loading and compilation!!!

$('.lectors').on('click', '.lector', function(){
  var target = $(this);
  var urlJSON =  getUrlJson('.lector-caption', 'name', target, '../assets/json/lectors/');
  modalTemplating(urlJSON, "#lector-template", "#modal-lector");
});

$('.modal').on('click', '.close', function(){
  hideModal();
});


//responsive menu
/////////////////

nav.on('click', '.toggle-menu', function(){
  var target = $(this);
  target.find('svg').toggleClass('is-hidden');
  // target.find('i.fa-times').toggleClass('is-hidden');
  $('.navigation').toggleClass('is-open');
  //$('.navigation').slideToggle();
});

nav.on('click', '.dropdown', function() {
  var wWidth = $(window).width(),
      target = $(this);
    if  ( wWidth <  700) {
      target.find('.ch-down').toggleClass('is-hidden');
      target.find('.ch-up').toggleClass('is-hidden');
      target.find('.submenu').toggleClass('submenu-is-open');
    };
    //event.preventDefault();
});

}); //end of dc ready

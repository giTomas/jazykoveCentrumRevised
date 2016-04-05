$( document ).ready(function() {

var nav = $('nav');
var logo = $('nav .logo-container');

$(window).scroll(function() {

    var wScroll = $(this).scrollTop();
    //var wHeight = $(".banner").height();
    var wHeight = $("nav").height();
    console.log(wScroll + '-' + wHeight);

    if (wScroll >= wHeight) {
            nav.addClass('is-fixed');
            logo.addClass('is-flex');
        } else {
            nav.removeClass('is-fixed');
            logo.removeClass('is-flex');
    };

}); // end of scroll

$('.menu').on('click', function() {
    $('.navigation').toggleClass('is-showing');
    $('.hamburger').toggleClass('is-hidden');
    $('.cross').toggleClass('is-hidden');

    if (!nav.hasClass('is-fixed')){
        nav.addClass('is-fixed');
    };

}); //end of menu function

///////////////////
//smooth scrolling:
////////////////// //https://css-tricks.com/snippets/jquery/smooth-scrolling/


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
});

}); //end of dc ready

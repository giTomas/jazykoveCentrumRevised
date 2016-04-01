$( document ).ready(function() {

var nav = $('nav')

$(window).scroll(function() {

    var wScroll = $(this).scrollTop();
    var wHeight = $(this).height();

    if (wScroll >= wHeight) {
            nav.addClass('is-fixed');
        } else {
            nav.removeClass('is-fixed');
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


  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  });

}); //end of dc ready

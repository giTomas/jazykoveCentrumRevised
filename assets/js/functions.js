$( document ).ready(function() {
    
    
$(window).scroll(function() {
    
    var wScroll = $(this).scrollTop();
    var wHeight = $(this).height();
        
    if (wScroll >= wHeight - 30) {
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

}); //end of dc ready

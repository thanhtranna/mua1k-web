setTimeout(function(){ $('.progress-bar').css("width",
    function() {
        return $(this).attr("aria-valuenow") + "%";
    })
}, 300);

setTimeout(function(){
    var content_height = $('.sidebar_left').height();
    $('.friend-content .friend-tab-content').css('min-height', content_height - 41);
},500);

$(document).ready(function() {
    $('.show-child-menu').click(function() {
        $(this).children('.show-child-menu-btn').toggleClass('active');
        $(this).parent().children('ul').toggleClass('active');
    });

    $(window).scroll(function() {
        if($(this).scrollTop() >= $('._content').offset().top - 100) {
            $('#back-to-top').addClass('active');
        } else {
            $('#back-to-top').removeClass('active');
        }
    });
    $(window).on('load', function() {
        $('.owl-stage').parents('.owl-item').remove();
        $('#back-to-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    });
    $('.show-child-menu').click(function() {
        $(this).children('.show-child-menu-btn').toggleClass('active');
        $(this).parent().children('ul').toggleClass('active');
    });
});


setTimeout(function(){
    var content_height = $('.sidebar_left').height();
    $('.friend-content .friend-tab-content').css('min-height', content_height - 41);
},500);

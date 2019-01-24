!(function ($) {
  $('.menu > div').click(function() {
    var ind = $(this).index();
    if(!$(this).hasClass('selected')){
      $('.menu > div').removeClass('selected');
      $(this).addClass('selected');
      $('.content > div').removeClass('active')
        .eq(ind).addClass('active');
    }
  })
  $('.sub-menu > div').click(function() {
    var ind = $(this).index();
    if(!$(this).hasClass('sub-menu-active')){
      $('.sub-menu > div').removeClass('sub-menu-active');
      $(this).addClass('sub-menu-active');
      $('.sub-content > div').removeClass('sub-content-active')
        .eq(ind).addClass('sub-content-active');
    }
  })
})(jQuery)
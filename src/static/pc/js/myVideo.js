(function($){
  $.fn.MyVideo = function (options) {
    var opts = $.extend({}, defaults, options);
    init(opts);
    // console.log($(this));
  }
  $.fn.MyVideo.prototype = {
    play: function(obj){
      console.log(obj);
    },
    pause: function(obj){

    },
    resize: function(obj){

    }
  }
  function init(obj){
    console.log(obj)
    var player = videojs(obj.id, {
      muted: true,
      controls : true,      
      height:obj.height, 
      width:obj.width,
      loop : false,
    })
    // $(obj.id).append("<video width='"+ obj.width+"'"+"height="+obj.height+">"+
    //                   "<source src='"+ obj.src +"' type='video/mp4'>"+
    //                 +"</video>");
  }
  var defaults = {
    id: undefined,          //视频容器  id
    width: undefined,       //宽
    height: undefined,      //高
    poster: '',      //视频封面
    src: undefined,         //视频源地址
    controls: false,         //视频控件
    fullscreen: false       //全屏
  }
  // window.MyVideo = MyVideo;
  
  $('.play').click(function() {
    $(this)
      .find('button')
      .css({
        'background-position': '-25px 0'
      })
  })
  $('.vol button').click(function() {
    $(this).css({
      'background-position': '-72px 0'
    })
  })

  var tag = false,
    ox = 0,
    left = 0,
    bgleft = 0,
    percent = 0
  $('.progress-btn').mousedown(function(e) {
    ox = e.pageX - left
    tag = true
  })
  $(document).mouseup(function() {
    tag = false
  })
  $('.progress').mousemove(function(e) {
    //鼠标移动
    if (tag) {
      left = e.pageX - ox
      if (left <= 0) {
        left = 0
      } else if (left > 600) {
        left = 600
      }
      $('.progress-btn').css('left', left)
      $('.progress-current').width(left)
      percent = parseInt((left / 600) * 100)
    }
  })
  $('.progress-total').click(function(e) {
    //鼠标点击
    if (!tag) {
      bgleft = $('.progress-total').offset().left
      left = e.pageX - bgleft
      if (left <= 0) {
        left = 0
      } else if (left > 600) {
        left = 600
      }
      $('.progress-btn').animate({ left: left }, 300)
      $('.progress-current').animate({ width: left }, 300)
      percent = parseInt((left / 600) * 100)
    }
  })

  var vtag = false,
    oy = 0,
    height = 0,
    bgheight = 0,
    vpercent = 0
  $('.vol-progress-btn').mousedown(function(e) {
    oy = e.pageY
    vtag = true
  })
  $(document).mouseup(function() {
    vtag = false
  })
  $('.vol-progress').mousemove(function(e) {
    //鼠标移动
    if (vtag) {
      height = oy + 72 - e.pageY
      if (height <= 0) {
        height = 0
      } else if (height > 72) {
        height = 72
      }
      $('.vol-progress-btn').css('bottom', height)
      $('.vol-progress-current').height(height)
      vpercent = parseInt((height / 72) * 100)
    }
  })
  $('.vol-progress-total').click(function(e) {
    //鼠标点击
    if (!vtag) {
      bgheight = $('.vol-progress-total').offset().top
      height = bgheight + 72 - e.pageY
      // console.log(height);
      if (height <= 0) {
        height = 0
      } else if (height > 72) {
        height = 72
      }
      $('.vol-progress-btn').animate({ bottom: height }, 300)
      $('.vol-progress-current').animate({ height: height }, 300)
      vpercent = parseInt((height / 600) * 100)
    }
  })
})(jQuery)
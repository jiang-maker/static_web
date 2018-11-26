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
    $(obj.id).append("<video width='"+ obj.width+"'"+"height="+obj.height+">"+
                      "<source src='"+ obj.src +"' type='video/mp4'>"+
                    +"</video>");
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
})(jQuery)
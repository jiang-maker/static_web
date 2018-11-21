(function($){
  $.fn.MyDialog = function (ele, options) {
    options = $.extend({}, $.fn.combobox.defaults, options || {});
    // 目标
    var target = $(ele);
    target.append("")
  }
  $.fn.MyDialog.defaults = {
    class: 'my-dialog',
    width: undefined,
    height: undefined
  }
})(jQuery)
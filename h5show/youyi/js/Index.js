var etControl = {};
etControl.process = function (config) {
    /*需要放在html中的body标签后面使用本控件*/
    var count = 0;    
    /*更新进度条*/
    this.updateProcess = function (percent) {
        setTimeout(function(){
        	//$('.loading').animate({ width: percent + "%" });  //加载进度条
        	$(".loadnumber").text(percent + "%");
        }, ++count * 800);
        if (percent == 100) {           	/*100%就从页面移除loading标签*/
            setTimeout(function () {
                $('#loading').slideUp(500);
            }, count * 500 + count * 500);
        }        
    };
}


$(function(){

    var Wsection = $(".section").width()*0.88;
    
    $('.p8-divR').css("width",Wsection-102);

    $('.p9-divR').css("width",Wsection-51);


    // 音乐播放控制
   // $(window).one('touchstart',
   // function() {
   //     $('audio').get(0).play()
  //      $('.music').addClass('on music-off');
  //  })

    $('.music').on('touchstart',
    function() {
        if ($(this).hasClass('on')) {
            $('audio').get(0).pause();
            $(this).removeClass('on music-off');
        } else {
            $('audio').get(0).play();
            $(this).addClass('on music-off');
        }
    })


})
import '../css/common.css'
import '../css/front.css'
import 'babel-polyfill'
import $ from 'jquery';
import Modernizr from 'modernizr'
import animateCss from './ie8anime'
import './scroll.page'
const screenHeight = $(window).height()

$(function () {
    $('.mod').height(screenHeight)
    $('.m1-pop').height(screenHeight - 100)
    $('body').css('overflow', 'hidden')
    let curVideo = document.getElementById("bgvid"),
        paused = true,
        pauseButton = $(".video-play-btn");

    if (!Modernizr.cssanimations) {
        pauseButton.hide()
    }

    //页面滚动 视频暂停
    function indexVideoPause(curVideo, pauseButton) {
        if (!curVideo)
            curVideo = document.getElementById("bgvid"), pauseButton = $(".video-play-btn");
        if (Modernizr.cssanimations) {
            if (!curVideo.paused) {
                curVideo.pause();
                $(curVideo).addClass("stopfade");
            }
        } else {
            if (!paused) {
                paused = true
                $(curVideo).addClass("stopfade");
            }
        }
        pauseButton.css('background-image', ('url("../images/play.png")'));
    }

    let winWidth = $(window).width();
    let winHeight = $(window).height();
    curVideo.style.minHeight = winHeight + "px";
    curVideo.style.width = winWidth + "px";
    //curVideo.videoWidth = winWidth + "px";
    $(window).resize(function () {
        let newWinW = $(window).width();
        let newWinH = $(window).height();
        $(".videoDiv").width(newWinW).height(newWinH);
        $("#bgvid").width(newWinW);
        curVideo.style.minHeight = newWinH + "px";
        curVideo.style.width = newWinW + "px";
        // curVideo.videoWidth = newWinW + "px";
    });

    function play() {
        if (Modernizr.cssanimations) {
            curVideo.play();
        }
        paused = false;
        setTimeout(() => $('#mcon').fadeOut(1500), 3000);
        $(curVideo).removeClass("stopfade");
        pauseButton.css('background-image', ('url("../images/pause.png")'));
    }

    pauseButton.click(function () {
        curVideo = document.getElementById("bgvid");
        if (Modernizr.cssanimations) {
            if ("$!isMobile" == "true" && (curVideo.src == undefined || curVideo.src == "")) {
                curVideo.src = "../video/publicize.mp4";
                play();
            } else if (curVideo.paused) {
                play();
            } else {
                indexVideoPause(curVideo, pauseButton);
            }
        } else {
            if (paused) {
                play();
            } else {
                indexVideoPause(curVideo, pauseButton);
            }
        }
    });
})

const downloadIcon = (icon, dialog) => {
    icon.on('click', (e) => {
        e.preventDefault();
        $('#pc_download').hide()
        $('#android_download').hide()
        $('#ios_download').hide()
        if (Modernizr.cssanimations) {
            dialog.show();
        }
        animateCss.animate(dialog[0], {
            animationName: 'slideInUp',
            duration: 500,
            callbacks: [
                function () {}
            ]
        });
    })
    dialog.on('click', '.close', (e) => {
        e.preventDefault();
        animateCss.animate(dialog[0], {
            animationName: 'fadeOut',
            duration: 500,
            callbacks: [
                function () {
                    if (Modernizr.cssanimations) {
                        dialog.hide()
                    }
                }
            ]
        });
    })
}
downloadIcon($('.pc'), $('#pc_download'))
downloadIcon($('.android'), $('#android_download'))
downloadIcon($('.iphone'), $('#ios_download'))

$('.mod2').on('click', '.tab-h > ul > li', (e) => {
    e.preventDefault()
    window.location.hash = $(e.currentTarget).data('loc')
})

$('.tab-h-narrow').on('click', 'ul > li', (e) => {
    e.preventDefault()
    window.location.hash = $(e.currentTarget).data('loc')
})

$('.switch').on('click', function (e) {
    $('.dock').toggleClass('cloze');
    $(this).toggleClass('off');
})
$('.d-im').on('mouseenter', function (e) {
    $(e.currentTarget).addClass('active')
}).on('mouseleave', function (e) {
    $(e.currentTarget).removeClass('active')
})
$('.d-tel').on('mouseenter', function (e) {
    $(e.currentTarget).addClass('active')
}).on('mouseleave', function (e) {
    $(e.currentTarget).removeClass('active')
})
$('.d-wechat').on('mouseenter', function (e) {
    $(e.currentTarget).addClass('active')
}).on('mouseleave', function (e) {
    $(e.currentTarget).removeClass('active')
})

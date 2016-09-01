import '../css/common.css'
import '../css/front.css'
import 'babel-polyfill'
import $ from 'jquery';
import Modernizr from 'modernizr'
import animateCss from './ie8anime'
import './scroll.page'
const screenHeight = $(window).height()
$(function() {
  $('.mod').height(screenHeight)
  $('.m1-pop').height(screenHeight - 100)
  $('body').css('overflow', 'hidden')
})

const downloadIcon = (icon, dialog) => {
    icon.on('click', (e) => {
        e.preventDefault();
        $('#pc_download').hide()
        $('#android_download').hide()
        $('#ios_download').hide()
        if(Modernizr.cssanimations){
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
                  if(Modernizr.cssanimations){
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

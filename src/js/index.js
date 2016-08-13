import '../css/common.css'
import '../css/front.css'
import 'lightslider/dist/css/lightslider.min.css'
import $ from 'jquery';
import 'imports?jQuery=jquery!lightslider';
import 'animate.css'
import animateCss from 'animate.css-js'
import './scroll.page'

$(".light-slider").lightSlider({
    auto: true,
    loop: true,
    controls: false,
    pauseOnHover: true,
    autoWidth: true,
    adaptiveHeight: true,
    pager: false,
    speed: 1000,
    slideMargin: 0
});

const downloadIcon = (icon, dialog) => {
    icon.on('click', (e) => {
        e.preventDefault();
        $('#pc_download').hide()
        $('#android_download').hide()
        $('#ios_download').hide()
        dialog.show();
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
                    dialog.hide()
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

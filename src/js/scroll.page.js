import WheelSwipe from 'wheel-swipe'
import Modernizr from 'modernizr'
import 'lightslider/dist/css/lightslider.min.css'
import $ from 'jquery';
import 'imports?jQuery=jquery!lightslider';
import HashChange from 'hashchange'
import animateCss from './ie8anime'
import _ from 'lodash'

if (Modernizr.cssanimations) {
    new WheelSwipe()
}
let position = 0
let mod3Position = 0
let mod4Position = 0
let mod7Position = 0
let mod8Position = 0
let canScroll = true
const sections = $('.section')
$('.mod8-m img').css("width", `${screen.width}px`)
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

const m1slider = $(".mod8-m1 > ul").lightSlider({
    auto: true,
    mode: 'fade',
    loop: true,
    pauseOnHover: true,
    controls: false,
    autoWidth: true,
    adaptiveHeight: true,
    pager: false,
    speed: 4000,
    pause: 8000,
    slideMargin: 0
});
const m2slider = $(".mod8-m2 > ul").lightSlider({
    auto: true,
    mode: 'fade',
    loop: true,
    pauseOnHover: true,
    controls: false,
    autoWidth: true,
    adaptiveHeight: true,
    pager: false,
    speed: 4000,
    pause: 8000,
    slideMargin: 0,
    onSliderLoad: (el) => {
        $('.mod8-m2').hide()
    }
});
const m3slider = $(".mod8-m3 > ul").lightSlider({
    auto: true,
    mode: 'fade',
    loop: true,
    pauseOnHover: true,
    controls: false,
    autoWidth: true,
    adaptiveHeight: true,
    pager: false,
    speed: 4000,
    pause: 8000,
    slideMargin: 0,
    onSliderLoad: (el) => {
        $('.mod8-m3').hide()
    }
});

$('.d-up').on('click', (e) => {
    $('html, body').stop().animate({
        scrollTop: $(sections.get(0)).offset().top
    }, 3000)
    position = 0
})

$('.d-down').on('click', (e) => {
    $('html, body').stop().animate({
        scrollTop: $(sections.get(sections.length - 1)).offset().top
    }, 3000)
    position = sections.length - 1
})

HashChange.update(function (hash) {
    if (hash !== 'none') {
        go(Number.parseInt(hash))
    }
})

if (Modernizr.cssanimations) {
    window.addEventListener('wheelup', function (e) {
        e.preventDefault()
        next()
        HashChange.updateHash('none') // clean hash
    });

    window.addEventListener('wheeldown', function (e) {
        e.preventDefault()
        pre()
        HashChange.updateHash('none') // clean hash
    });
} else {
    const wheelHandle = (dy) => {
        if (dy >= 1) {
            next()
            HashChange.updateHash('none') // clean hash
            return;
        }
        if (dy <= -1) {
            pre()
            HashChange.updateHash('none') // clean hash
            return;
        }
    }

    addWheelListener(document, (e) => {
        e.preventDefault()
        const dy = e.deltaY
        if (Math.abs(dy) > 0) {
            if (canScroll) {
                canScroll = false
                wheelHandle(dy)
                _.delay(() => {
                    canScroll = true
                }, 1500)
            }
        }
    })
}

$('body').on('keydown', function (e) {
    if (e.which === 40 || e.which === 39) { //down left
        e.preventDefault();
        next();
    }
    if (e.which === 38 || e.which === 37) { //up right
        e.preventDefault();
        pre();
    }
});

$('.mod3 > .menu > li > a').on('click', function (e) {
    e.preventDefault()
    let index = $(e.currentTarget).data('index')
    if (mod3Position === 0) {
        $('.mod3_0').hide()
        if (Modernizr.cssanimations) {
            $('.mod3_1').show()
        }
        animateCss.animate($('.mod3_1').get(0), {
            animationName: 'fadeInLeft',
            duration: 500,
            callbacks: []
        })
    }
    $('.mod3 > .menu > li').removeClass('cur')
    $(`.mod3 > .menu > li:eq(${index-1})`).addClass('cur')
    $(`.mod3_${mod3Position}_1`).hide()
    $(`.mod3_${mod3Position}_2`).hide()
    if (Modernizr.cssanimations) {
        $(`.mod3_${index}_1`).show()
    }
    animateCss.animate($(`.mod3_${index}_1`).get(0), {
        animationName: 'fadeIn',
        duration: 500,
        callbacks: [
            function () {
                $(`.mod3_${index}_2`).show()
                animateCss.animate($(`.mod3_${index}_2`).get(0), {
                    animationName: 'fadeInUp',
                    duration: 500,
                    callbacks: []
                })
            }
        ]
    })

    mod3Position = index
})
$('.mod4 .mn li a').on('click', function (e) {
    e.preventDefault()
    let index = $(e.currentTarget).data('index')
    let currentPos = Number.parseInt(mod4Position)
    $('.mod4 .mn li').removeClass('act')
    $(`.mod4 .mn li:eq(${index-1})`).addClass('act')
    animateCss.animate($(`.mod4-m${currentPos+1}`).get(0), {
        animationName: 'fadeOutRight',
        duration: 500,
        callbacks: [
            function () {
                $(`.mod4-m${currentPos+1}`).hide()
                if (Modernizr.cssanimations) {
                    $(`.mod4-m${index}`).show()
                }
                animateCss.animate($(`.mod4-m${index}`).get(0), {
                    animationName: 'fadeInLeft',
                    duration: 500,
                    callbacks: []
                })
            }
        ]
    })

    mod4Position = index - 1
})

$('.mod7 > .menu > li > a').on('click', function (e) {
    e.preventDefault()
    let index = $(e.currentTarget).data('index')
    let currentPos = Number.parseInt(mod7Position)
    $('.mod7 .menu li').removeClass('cur')
    $(`.mod7 .menu li:eq(${index-1})`).addClass('cur')
    animateCss.animate($(`.mod7-m${currentPos+1}`).get(0), {
        animationName: 'fadeOutRight',
        duration: 500,
        callbacks: [
            function () {
                $(`.mod7-m${currentPos+1}`).hide()
                if (Modernizr.cssanimations) {
                    $(`.mod7-m${index}`).show()
                }
                animateCss.animate($(`.mod7-m${index}`).get(0), {
                    animationName: 'fadeInLeft',
                    duration: 500,
                    callbacks: []
                })
            }
        ]
    })

    mod7Position = index - 1
})
$('.mod8 .mod8-title a').on('mouseover', function (e) {
    e.preventDefault()
    m1slider.pause()
    m2slider.pause()
    m3slider.pause()
    let index = $(e.currentTarget).data('index')
    let currentPos = Number.parseInt(mod8Position)
    $('.mod8 .mod8-title a').removeClass('act')
    $(`.mod8 .mod8-title a:eq(${index-1})`).addClass('act')
    animateCss.animate($(`.mod8-m${currentPos+1}`).get(0), {
        animationName: 'fadeOut',
        duration: 800,
        callbacks: [
            function () {
                $(`.mod8-m${currentPos+1}`).hide()
                if (Modernizr.cssanimations) {
                    $(`.mod8-m${index}`).show()
                }
                animateCss.animate($(`.mod8-m${index}`).get(0), {
                    animationName: 'fadeIn',
                    duration: 2500,
                    callbacks: [
                        () => {
                            switch (index) {
                                case 1:
                                    _.delay(() => m1slider.play(), 1500);
                                    m2slider.pause()
                                    m3slider.pause()
                                    break;
                                case 2:
                                    _.delay(() => m2slider.play(), 1500);
                                    m1slider.pause()
                                    m3slider.pause()
                                    break;
                                case 3:
                                    _.delay(() => m3slider.play(), 1500);
                                    m2slider.pause()
                                    m1slider.pause()
                                    break;
                                default:
                            }
                        }
                    ]
                })
            }
        ]
    })

    mod8Position = index - 1
})
$('.mod4-m1').show()
$('.mod7-m2').hide()
$('.mod7-m3').hide()

function go(pos) {
    $('html, body').stop().animate({
        scrollTop: $(sections.get(pos)).offset().top
    }, 1000)
    position = pos
}

function next() {
    if (position >= (sections.length - 1)) {
        return
    }
    if (position === 2 && mod3next()) {
        return
    }
    if (position === 3 && mod4next()) {
        return
    }
    if (position === 6 && mod7next()) {
        return
    }
    if (position === 7 && mod8next()) {
        return
    }
    $('html, body').stop().animate({
        scrollTop: $(sections.get(position + 1)).offset().top
    }, 1000)
    if (position < sections.length) {
        position++
    }
}

function pre() {
    if (position <= 0) {
        return
    }
    if (position === 2 && mod3pre()) {
        return
    }
    if (position === 3 && mod4pre()) {
        return
    }
    if (position === 6 && mod7pre()) {
        return
    }
    if (position === 7 && mod8pre()) {
        return
    }
    $('html, body').stop().animate({
        scrollTop: $(sections.get(position - 1)).offset().top
    }, 1000)
    if (position > 0) {
        position--
    }
}

function mod3next() {
    if (mod3Position === 0) {
        $('.mod3 .menu li').removeClass('cur')
        $('.mod3 .menu li:eq(0)').addClass('cur')
        $('.mod3_0').hide()
        if (Modernizr.cssanimations) {
            $('.mod3_1').show()
        }
        animateCss.animate($('.mod3_1').get(0), {
            animationName: 'fadeInLeft',
            duration: 500,
            callbacks: [
                function () {
                    if (Modernizr.cssanimations) {
                        $('.mod3_1_1').show()
                    }
                    animateCss.animate($('.mod3_1_1').get(0), {
                        animationName: 'fadeIn',
                        duration: 300,
                        callbacks: [
                            function () {
                                if (Modernizr.cssanimations) {
                                    $('.mod3_1_2').show()
                                }
                                animateCss.animate($('.mod3_1_2').get(0), {
                                    animationName: 'fadeInUp',
                                    duration: 500,
                                    callbacks: []
                                })
                            }
                        ]
                    })
                }
            ]
        })
    }
    if (mod3Position === 1) {
        $('.mod3 > .menu > li').removeClass('cur')
        $('.mod3 > .menu > li:eq(1)').addClass('cur')
        $('.mod3_1_1').hide()
        $('.mod3_1_2').hide()
        if (Modernizr.cssanimations) {
            $('.mod3_2_1').show()
        }
        animateCss.animate($('.mod3_2_1').get(0), {
            animationName: 'fadeIn',
            duration: 300,
            callbacks: [
                function () {
                    if (Modernizr.cssanimations) {
                        $('.mod3_2_2').show()
                    }
                    animateCss.animate($('.mod3_2_2').get(0), {
                        animationName: 'fadeInUp',
                        duration: 500,
                        callbacks: []
                    })
                }
            ]
        })
    }
    if (mod3Position === 2) {
        $('.mod3 > .menu > li').removeClass('cur')
        $('.mod3 > .menu > li:eq(2)').addClass('cur')
        $('.mod3_2_1').hide()
        $('.mod3_2_2').hide()
        if (Modernizr.cssanimations) {
            $('.mod3_3_1').show()
        }
        animateCss.animate($('.mod3_3_1').get(0), {
            animationName: 'fadeIn',
            duration: 300,
            callbacks: [
                function () {
                    if (Modernizr.cssanimations) {
                        $('.mod3_3_2').show()
                    }
                    animateCss.animate($('.mod3_3_2').get(0), {
                        animationName: 'fadeInUp',
                        duration: 500,
                        callbacks: []
                    })
                }
            ]
        })
    }
    if (mod3Position < 3) {
        mod3Position++
        return true
    }
    return false
}

function mod3pre() {
    if (mod3Position === 1) {
        $('.mod3 .menu li').removeClass('cur')
            // $('.mod3 .menu li:eq(0)').addClass('cur')
        animateCss.animate($('.mod3_1_2').get(0), {
            animationName: 'fadeOutDown',
            duration: 300,
            callbacks: [(() => {
                $('.mod3_1_2').hide()
                $('.mod3_1_1').hide()
                $('.mod3_1').hide()
                $('.mod3_0').fadeIn()
            })]
        })
    }
    if (mod3Position === 2) {
        $('.mod3 > .menu > li').removeClass('cur')
        $('.mod3 > .menu > li:eq(0)').addClass('cur')
        $('.mod3_2_1').hide()
        $('.mod3_2_2').hide()
        if (Modernizr.cssanimations) {
            $('.mod3_1_1').show()
        }
        animateCss.animate($('.mod3_1_1').get(0), {
            animationName: 'fadeIn',
            duration: 300,
            callbacks: [
                function () {
                    if (Modernizr.cssanimations) {
                        $('.mod3_1_2').show()
                    }
                    animateCss.animate($('.mod3_1_2').get(0), {
                        animationName: 'fadeInUp',
                        duration: 500,
                        callbacks: []
                    })
                }
            ]
        })
    }
    if (mod3Position === 3) {
        $('.mod3 > .menu > li').removeClass('cur')
        $('.mod3 > .menu > li:eq(1)').addClass('cur')
        $('.mod3_3_1').hide()
        $('.mod3_3_2').hide()
        if (Modernizr.cssanimations) {
            $('.mod3_2_1').show()
        }
        animateCss.animate($('.mod3_2_1').get(0), {
            animationName: 'fadeIn',
            duration: 300,
            callbacks: [
                function () {
                    if (Modernizr.cssanimations) {
                        $('.mod3_2_2').show()
                    }
                    animateCss.animate($('.mod3_2_2').get(0), {
                        animationName: 'fadeInUp',
                        duration: 500,
                        callbacks: []
                    })
                }
            ]
        })
    }
    if (mod3Position > 0) {
        mod3Position--
        return true
    }
    return false
}

function mod4next() {
    if (mod4Position === 0) {
        $('.mod4 .mn li').removeClass('act')
        $('.mod4 .mn li:eq(1)').addClass('act')
        animateCss.animate($('.mod4-m1').get(0), {
            animationName: 'fadeOutRight',
            duration: 500,
            callbacks: [function () {
                $('.mod4-m1').hide()
                if (Modernizr.cssanimations) {
                    $('.mod4-m2').show()
                }
                animateCss.animate($('.mod4-m2').get(0), {
                    animationName: 'fadeInLeft',
                    duration: 500,
                    callbacks: [function () {

                    }]
                })
            }]
        })
    }
    if (mod4Position === 1) {
        $('.mod4 .mn li').removeClass('act')
        $('.mod4 .mn li:eq(2)').addClass('act')
        animateCss.animate($('.mod4-m2').get(0), {
            animationName: 'fadeOutRight',
            duration: 500,
            callbacks: [function () {
                $('.mod4-m2').hide()
                if (Modernizr.cssanimations) {
                    $('.mod4-m3').show()
                }
                animateCss.animate($('.mod4-m3').get(0), {
                    animationName: 'fadeInLeft',
                    duration: 500,
                    callbacks: [function () {

                    }]
                })
            }]
        })
    }
    if (mod4Position < 2) {
        mod4Position++
        return true
    }
    return false
}

function mod4pre() {
    if (mod4Position === 1) {
        $('.mod4 .mn li').removeClass('act')
        $('.mod4 .mn li:eq(0)').addClass('act')
        animateCss.animate($('.mod4-m2').get(0), {
            animationName: 'fadeOutLeft',
            duration: 500,
            callbacks: [function () {
                $('.mod4-m2').hide()
                if (Modernizr.cssanimations) {
                    $('.mod4-m1').show()
                }
                animateCss.animate($('.mod4-m1').get(0), {
                    animationName: 'fadeInRight',
                    duration: 500,
                    callbacks: [function () {

                    }]
                })
            }]
        })
    }
    if (mod4Position === 2) {
        $('.mod4 .mn li').removeClass('act')
        $('.mod4 .mn li:eq(1)').addClass('act')
        animateCss.animate($('.mod4-m3').get(0), {
            animationName: 'fadeOutLeft',
            duration: 500,
            callbacks: [function () {
                $('.mod4-m3').hide
                if (Modernizr.cssanimations) {
                    $('.mod4-m2').show()
                }
                animateCss.animate($('.mod4-m2').get(0), {
                    animationName: 'fadeInRight',
                    duration: 500,
                    callbacks: [function () {

                    }]
                })
            }]
        })
    }
    if (mod4Position > 0) {
        mod4Position--
        return true
    }
    return false
}

function mod7next() {
    if (mod7Position === 0) {
        $('.mod7 .menu li').removeClass('cur')
        $('.mod7 .menu li:eq(1)').addClass('cur')
        animateCss.animate($('.mod7-m1').get(0), {
            animationName: 'fadeOutRight',
            duration: 500,
            callbacks: [function () {
                $('.mod7-m1').hide()
                if (Modernizr.cssanimations) {
                    $('.mod7-m2').show()
                }
                animateCss.animate($('.mod7-m2').get(0), {
                    animationName: 'fadeInLeft',
                    duration: 500,
                    callbacks: [function () {

                    }]
                })
            }]
        })
    }
    if (mod7Position === 1) {
        $('.mod7 .menu li').removeClass('cur')
        $('.mod7 .menu li:eq(2)').addClass('cur')
        animateCss.animate($('.mod7-m2').get(0), {
            animationName: 'fadeOutRight',
            duration: 500,
            callbacks: [function () {
                $('.mod7-m2').hide()
                if (Modernizr.cssanimations) {
                    $('.mod7-m3').show()
                }
                animateCss.animate($('.mod7-m3').get(0), {
                    animationName: 'fadeInLeft',
                    duration: 500,
                    callbacks: [function () {

                    }]
                })
            }]
        })
    }
    if (mod7Position < 2) {
        mod7Position++
        return true
    }
    return false
}

function mod7pre() {
    if (mod7Position === 1) {
        $('.mod7 .menu li').removeClass('cur')
        $('.mod7 .menu li:eq(0)').addClass('cur')
        animateCss.animate($('.mod7-m2').get(0), {
            animationName: 'fadeOutLeft',
            duration: 500,
            callbacks: [function () {
                $('.mod7-m2').hide()
                if (Modernizr.cssanimations) {
                    $('.mod7-m1').show()
                }
                animateCss.animate($('.mod7-m1').get(0), {
                    animationName: 'fadeInRight',
                    duration: 500,
                    callbacks: [function () {

                    }]
                })
            }]
        })
    }
    if (mod7Position === 2) {
        $('.mod7 .menu li').removeClass('cur')
        $('.mod7 .menu li:eq(1)').addClass('cur')
        animateCss.animate($('.mod7-m3').get(0), {
            animationName: 'fadeOutLeft',
            duration: 500,
            callbacks: [function () {
                $('.mod7-m3').hide()
                if (Modernizr.cssanimations) {
                    $('.mod7-m2').show()
                }
                animateCss.animate($('.mod7-m2').get(0), {
                    animationName: 'fadeInRight',
                    duration: 500,
                    callbacks: [function () {

                    }]
                })
            }]
        })
    }
    if (mod7Position > 0) {
        mod7Position--
        return true
    }
    return false
}

function mod8next() {
    if (mod8Position === 0) {
        $('.mod8 .mod8-title a').removeClass('act')
        $('.mod8 .mod8-title a:eq(1)').addClass('act')
        animateCss.animate($('.mod8-m1').get(0), {
            animationName: 'fadeOutRight',
            duration: 500,
            callbacks: [function () {
                $('.mod8-m1').hide()
                if (Modernizr.cssanimations) {
                    $('.mod8-m2').show()
                }
                animateCss.animate($('.mod8-m2').get(0), {
                    animationName: 'fadeInLeft',
                    duration: 500,
                    callbacks: [function () {
                        m1slider.play()
                        m2slider.play()
                        m3slider.pause()
                    }]
                })
            }]
        })
    }
    if (mod8Position === 1) {
        $('.mod8 .mod8-title a').removeClass('act')
        $('.mod8 .mod8-title a:eq(2)').addClass('act')
        animateCss.animate($('.mod8-m2').get(0), {
            animationName: 'fadeOutRight',
            duration: 500,
            callbacks: [function () {
                $('.mod8-m2').hide()
                if (Modernizr.cssanimations) {
                    $('.mod8-m3').show()
                }
                animateCss.animate($('.mod8-m3').get(0), {
                    animationName: 'fadeInLeft',
                    duration: 500,
                    callbacks: [function () {
                        m1slider.pause()
                        m2slider.pause()
                        m3slider.play()
                    }]
                })
            }]
        })
    }
    if (mod8Position < 2) {
        mod8Position++
        return true
    }
    return false
}

function mod8pre() {
    if (mod8Position === 1) {
        $('.mod8 .mod8-title a').removeClass('act')
        $('.mod8 .mod8-title a:eq(0)').addClass('act')
        animateCss.animate($('.mod8-m2').get(0), {
            animationName: 'fadeOutLeft',
            duration: 500,
            callbacks: [function () {
                $('.mod8-m2').hide()
                if (Modernizr.cssanimations) {
                    $('.mod8-m1').show()
                }
                animateCss.animate($('.mod8-m1').get(0), {
                    animationName: 'fadeInRight',
                    duration: 500,
                    callbacks: [function () {
                        m1slider.play()
                        m2slider.pause()
                        m3slider.pause()
                    }]
                })
            }]
        })
    }
    if (mod8Position === 2) {
        $('.mod8 .mod8-title a').removeClass('act')
        $('.mod8 .mod8-title a:eq(1)').addClass('act')
        animateCss.animate($('.mod8-m3').get(0), {
            animationName: 'fadeOutLeft',
            duration: 500,
            callbacks: [function () {
                $('.mod8-m3').hide()
                if (Modernizr.cssanimations) {
                    $('.mod8-m2').show()
                }
                animateCss.animate($('.mod8-m2').get(0), {
                    animationName: 'fadeInRight',
                    duration: 500,
                    callbacks: [function () {
                        m1slider.pause()
                        m2slider.play()
                        m3slider.pause()
                    }]
                })
            }]
        })
    }
    if (mod8Position > 0) {
        mod8Position--
        return true
    }
    return false
}

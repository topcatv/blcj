import Modernizr from 'modernizr'
import $ from 'jquery';
import 'animate.css'
import animateCss from 'animate.css-js'
import _ from 'lodash'
/**
 * This is a proxy for animate.css-js, to adapter ie8
 */

/**
 *
 * @param {Element} el
 * @param {object} opts
 * @property {string} opts.animationName
 * @property {number} [opts.duration]
 * @param {function[]} [opts.callbacks=[]]
 */
var animate = function (el, opts) {
  if(Modernizr.cssanimations){
    animateCss.animate(el, opts);
  }else{
    let {animationName, callbacks, duration} = opts
    if(animationName.indexOf('In') >= 0){
      $(el).fadeIn(duration, function() {
        if(_.isArray(callbacks)){
          _(callbacks).forEach(function(el) {
            el();
          });
        }else{
          callbacks();
        }
      });
    }
    if(animationName.indexOf('Out') >= 0){
      $(el).fadeOut(duration, function() {
        if(_.isArray(callbacks)){
          _(callbacks).forEach(function(el) {
            el();
          });
        }else{
          callbacks();
        }
      });
    }
  }
};

/**
 *
 * @param {Element} el
 * @param {object} [opts]
 * @property {string} [opts.animationName='slideInDown']
 * @property {number} [opts.duration=300]
 * @param {function[]} [opts.callbacks]
 */
var show = function (el, opts) {
  if(Modernizr.cssanimations){
    animateCss.show(el, opts);
  }else{
    $(el).show()
  }
};

/**
 *
 * @param {Element} el
 * @param {object} [opts]
 * @property {string} [opts.animationName='slideInDown']
 * @property {number} [opts.duration=300]
 * @param {function[]} [opts.callbacks]
 */
var hide = function (el, opts) {
  if(Modernizr.cssanimations){
    animateCss.hide(el, opts);
  }else{
    $(el).hide()
  }
};

/**
 * API
 *
 * @type {{animateCSS: Function, show: Function, hide: Function}}
 */
var animations = {
    animate: animate,
    // show and hide convenience functions
    show: show,
    hide: hide
};

module.exports = animations;

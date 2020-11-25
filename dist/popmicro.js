!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Popmicro",[],t):"object"==typeof exports?exports.Popmicro=t():e.Popmicro=t()}(window,(function(){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),o(1);var i=n(o(2));t.default=i.default},function(e,t,o){"use strict";o.r(t)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(3),i=o(4),r=o(6),s={element:".popmicro",sizeType:"none",dropShadow:"xl",bgOpacity:.8,lockScrolling:!0},l=function(){function e(e){void 0===e&&(e=s),this.settings=Object.assign({},s,e),this.triggers=document.querySelectorAll("a"+this.settings.element),this.scaffold={main:n.createClassedElement("div","popmicro__wrapper"),inner:n.createClassedElement("div","popmicro__inner"),close:n.createClassedElement("button","popmicro__close")},this.inlineDomPosition=null,this.mount()}return e.prototype.mount=function(){var e=this.triggers.length;n.handleError(e,"No link triggers have been found of type "+this.settings.element,!0),this.scaffoldHTML(),this.addEvents(),this.hideHookedElements()},e.prototype.open=function(e){var t=this.settings.lockScrolling,o=this.scaffold,i=o.main,s=o.inner,l=n.getHookType(e);switch(t&&r.disableBodyScroll(s),l){case"image":s.innerHTML='<img class="popmicro__direct-image" src="'+e+'" />',this.inlineDomPosition=null;break;case"inline":var c=document.querySelector(e);if(c){var a=n.getSizing(c,this.settings.sizeType),u=a.size,d=a.userContentSize,p=c.parentNode,f=c.nextElementSibling;this.inlineDomPosition={parent:p,sibling:f},c.style.cssText+=d,s.style.cssText=u,s.innerHTML="",s.appendChild(c),c.classList.contains("popmicro__hide")&&c.classList.remove("popmicro__hide")}}document.body.appendChild(i)},e.prototype.close=function(){var e,t,o,n=this.scaffold,i=n.main,s=n.inner,l=this.settings.lockScrolling,c=s.querySelector(":scope > *");l&&r.enableBodyScroll(s),c&&(c.classList.contains("popmicro__direct-image")||c.classList.add("popmicro__hide")),c&&(null===(e=this.inlineDomPosition)||void 0===e?void 0:e.sibling)&&(null===(t=this.inlineDomPosition)||void 0===t?void 0:t.parent)?this.inlineDomPosition.parent.insertBefore(c,this.inlineDomPosition.sibling):c&&(null===(o=this.inlineDomPosition)||void 0===o?void 0:o.parent)?this.inlineDomPosition.parent.appendChild(c):s.innerHTML="",document.body.removeChild(i),s.style.cssText="",this.inlineDomPosition=null},e.prototype.addEvents=function(){var e=this;this.scaffold.close.addEventListener("click",(function(){return e.close()})),this.triggers.length&&this.triggers.forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault();var o=t.currentTarget.getAttribute("href");o&&e.open(o)}))}))},e.prototype.scaffoldHTML=function(){var e=this.scaffold,t=e.main,o=e.inner,r=e.close,s=document.documentElement;n.setShadowType(this.settings.dropShadow),s.style.setProperty("--popmicro-bg-opacity",""+this.settings.bgOpacity),r.innerHTML=i.CloseButton(),t.append(r,o)},e.prototype.hideHookedElements=function(){this.triggers.forEach((function(e){var t=e.hasAttribute("href")&&e.getAttribute("href"),o=n.getHookType(t);if(t&&o&&"image"!==o){var i=document.querySelector(t);null==i||i.classList.add("popmicro__hide")}}))},e}();t.default=l},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getSizing=t.setShadowType=t.getHookType=t.createClassedElement=t.handleError=void 0,t.handleError=function(e,t,o){if(void 0===t&&(t="Something went wrong"),void 0===o&&(o=!1),e)return e;if(o)return console.warn("Popmicro: "+t),null;throw Error("Popmicro: "+t)},t.createClassedElement=function(e,t){var o=document.createElement(e);return"string"==typeof t?o.classList.add(t):"object"==typeof t&&t.length&&t.forEach((function(e){o.classList.add(e)})),o},t.getHookType=function(e){return null!==e.match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/)?"image":e.match(/^\.|\#/)?"inline":null},t.setShadowType=function(e){void 0===e&&(e="xl");var t=document.documentElement,o="0 25px 50px -12px rgba(0, 0, 0, 0.25)";switch(e){case"none":o="none";break;case"sm":o="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";break;case"md":o="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";break;case"lg":o="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";break;case"xl":o="0 25px 50px -12px rgba(0, 0, 0, 0.25)";break;default:o=e}t.style.setProperty("--popmicro-shadow",o)},t.getSizing=function(e,t){var o="",n="min-height: 100%; width: 100%";switch(!0){case"full"===t:o="overflow-y: auto; height: 100%; width: 100%";break;default:case"none"===t:o="",n="";break;case"object"==typeof t&&t.hasOwnProperty("width"):o="width: 100%; max-width: "+t.width+";",t.hasOwnProperty("height")&&(o+="overflow-y: auto; height: 100%; max-height: "+t.height)}return{size:o,userContentSize:n}}},function(e,t,o){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CloseButton=void 0;var i=n(o(5));t.CloseButton=i.default},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){return'<svg class="popmicro__close-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M6.225 4.811c-.1886-.18216-.4412-.28295-.7034-.28067-.26219.00227-.51301.10744-.69842.29285-.1854.18541-.29057.43622-.29285.69842-.00228.2622.09851.5148.28067.7034L10.586 12 4.81 17.775c-.09551.0922-.17169.2026-.2241.3246-.05241.122-.07999.2532-.08115.386-.00115.1328.02415.2645.07443.3874.05028.1229.12454.2345.21843.3284.09389.0939.20554.1681.32844.2184.1229.0503.25457.0756.38735.0745.13278-.0012.264-.0288.38601-.0812.122-.0524.23235-.1286.32459-.2241L12 13.414l5.775 5.775c.1886.1822.4412.283.7034.2807.2622-.0023.513-.1075.6984-.2929s.2906-.4362.2929-.6984c.0023-.2622-.0985-.5148-.2807-.7034L13.414 12l5.775-5.775c.1822-.1886.283-.4412.2807-.7034-.0023-.2622-.1075-.51301-.2929-.69842-.1854-.18541-.4362-.29058-.6984-.29285-.2622-.00228-.5148.09851-.7034.28067L12 10.586 6.225 4.81v.001z"/></svg>'}},function(e,t,o){"use strict";o.r(t),o.d(t,"disableBodyScroll",(function(){return h})),o.d(t,"clearAllBodyScrollLocks",(function(){return g})),o.d(t,"enableBodyScroll",(function(){return m}));var n=!1;if("undefined"!=typeof window){var i={get passive(){n=!0}};window.addEventListener("testPassive",null,i),window.removeEventListener("testPassive",null,i)}var r="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),s=[],l=!1,c=-1,a=void 0,u=void 0,d=function(e){return s.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},p=function(e){var t=e||window.event;return!!d(t.target)||(t.touches.length>1||(t.preventDefault&&t.preventDefault(),!1))},f=function(){void 0!==u&&(document.body.style.paddingRight=u,u=void 0),void 0!==a&&(document.body.style.overflow=a,a=void 0)},h=function(e,t){if(e){if(!s.some((function(t){return t.targetElement===e}))){var o={targetElement:e,options:t||{}};s=[].concat(function(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}(s),[o]),r?(e.ontouchstart=function(e){1===e.targetTouches.length&&(c=e.targetTouches[0].clientY)},e.ontouchmove=function(t){1===t.targetTouches.length&&function(e,t){var o=e.targetTouches[0].clientY-c;!d(e.target)&&(t&&0===t.scrollTop&&o>0||function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight}(t)&&o<0?p(e):e.stopPropagation())}(t,e)},l||(document.addEventListener("touchmove",p,n?{passive:!1}:void 0),l=!0)):function(e){if(void 0===u){var t=!!e&&!0===e.reserveScrollBarGap,o=window.innerWidth-document.documentElement.clientWidth;t&&o>0&&(u=document.body.style.paddingRight,document.body.style.paddingRight=o+"px")}void 0===a&&(a=document.body.style.overflow,document.body.style.overflow="hidden")}(t)}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},g=function(){r?(s.forEach((function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null})),l&&(document.removeEventListener("touchmove",p,n?{passive:!1}:void 0),l=!1),c=-1):f(),s=[]},m=function(e){e?(s=s.filter((function(t){return t.targetElement!==e})),r?(e.ontouchstart=null,e.ontouchmove=null,l&&0===s.length&&(document.removeEventListener("touchmove",p,n?{passive:!1}:void 0),l=!1)):s.length||f()):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")}}]).default}));
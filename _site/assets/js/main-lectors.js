"use strict";$(document).ready(function(){function n(n,i){$(i).html(n)}function i(n,i){var o=n,s=Handlebars.templates[i],e=s(o);return e}function o(n,i,o,s){var e=o.find(n).data(i),t=s+e+".json";return t}function s(o,s,t){$.getJSON(o).then(function(n){return i(n,s)}).then(function(i){n(i,t)}).then(function(){e()})}function e(){a.addClass("is-block"),setTimeout(function(){a.addClass("is-visible")},50),setTimeout(function(){l.addClass("is-in-position")},200)}var t=$("nav"),a=$(".modal-overlay"),l=$(".modal-container"),c=function(){l.removeClass("is-in-position"),setTimeout(function(){a.removeClass("is-visible")},400),setTimeout(function(){a.removeClass("is-block")},600)};$(window).scroll(function(){var n=$(this).scrollTop(),i=t.height(),o=$(".nav-logo"),s=n>=i,e=n>=i+150;s?t.addClass("is-fixed"):t.removeClass("is-fixed"),e?o.addClass("logo-is-in-position"):o.removeClass("logo-is-in-position")});var d=function(){var n=$(this),i=n.parent().parent().find(".navigation"),o=i.find(".submenu"),s=o.hasClass("submenu-is-open"),e=n.find("svg");e.toggleClass("is-hidden"),s&&o.removeClass("submenu-is-open"),i.toggleClass("is-open")},r=function(){var n=$(window).width()<750,i=$(this);n&&i.find(".ch-down").toggleClass("is-hidden").end().find(".ch-up").toggleClass("is-hidden").end().find(".submenu").toggleClass("submenu-is-open")};t.on("click",".toggle-menu",d),t.on("click",".dropdown",r);var u=function(){var n=$(this),i=o(".lector__caption","name",n,"../assets/json/lectors/");s(i,"lectorTemplate","#modal-lector")};$(".lectors__container").on("click",".lector__container",u),$(".modal").on("click",".close",c)});
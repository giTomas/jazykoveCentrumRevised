"use strict";function jsonLoadOnPage(n,o,a){$.getJSON(n).done(function(n){var s=handlebarsTemplating(n,o);displayTmp(s,a)}).fail(function(){alert("Nepodarilo sa nacitat data")})}function modalTemplating(n,o,a){jQuery.getJSON(n).done(function(n){var s=handlebarsTemplating(n[0],o);displayTmp(s,a),showModal()}).fail(function(){alert("HTTP request failed")})}var nav=$("nav"),logo=$(".nav-logo"),modalOverlay=$(".modal-overlay"),modalContainer=$(".modal-container"),body=$("body"),dirLectors="../assets/json/lectors/",dirNews="../assets/json/news/cz/",dirNewsNotices="../assets/json/news/notices.json",dirLang="../assets/json/languages/",lang1=$("#1st"),lang2=$("#2nd"),lang3=$("#3rd");const displayTmp=function(n,o){$(o).html(n)},handlebarsTemplating=function(n,o){var a=n,s=Handlebars.templates[o],i=s(a);return i},getDir=function(n,o,a,s){var i=a.find(n).data(o),e=s+i+".json";return e},showModal=function(){modalOverlay.addClass("is-displaying"),setTimeout(function(){modalOverlay.addClass("is-visible")},150),setTimeout(function(){modalContainer.addClass("is-in-position")},500)},hideModal=function(){modalContainer.removeClass("is-in-position"),setTimeout(function(){modalOverlay.removeClass("is-visible")},450),setTimeout(function(){modalOverlay.removeClass("is-displaying")},800)};$(document).ready(function(){var n=function(){$(window).scroll(function(){var n=$(this).scrollTop(),o=nav.height(),a=n>=o,s=n>=o+150;a?nav.addClass("is-fixed"):nav.removeClass("is-fixed"),s?logo.addClass("logo-is-in-position"):logo.removeClass("logo-is-in-position")})};n();const o=function(){var n=$(this),o=n.parent().parent().find(".navigation"),a=o.find(".submenu"),s=a.hasClass("submenu-is-open");n.find("svg").toggleClass("is-hidden"),s&&a.removeClass("submenu-is-open"),o.toggleClass("is-open")};nav.on("click",".toggle-menu",o);nav.on("click",".dropdown",navDropdownHandler);const a=function(){var n=$(this),o=getDir(".lector__caption","name",n,dirLectors);modalTemplating(o,"lectorTemplate","#modal-lector")};$(".lectors").on("click",".lector",a),$(".modal").on("click",".close",hideModal)});
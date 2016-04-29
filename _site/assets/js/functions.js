"use strict";function jsonLoadOnPage(n,o,s){$.getJSON(n).then(function(n){return handlebarsTemplating(n,o)}).then(function(n){displayTmp(n,s)})}function modalTemplating(n,o,s){$.getJSON(n).then(function(n){return handlebarsTemplating(n[0],o)}).then(function(n){displayTmp(n,s)}).then(function(){showModal()})}var nav=$("nav"),logo=$(".nav-logo"),modalOverlay=$(".modal-overlay"),modalContainer=$(".modal-container"),body=$("body"),dirLectors="../assets/json/lectors/",dirNews="../assets/json/news/cz/",dirNewsNotices="../assets/json/news/notices.json",dirLang="../assets/json/languages/",lang1=$("#1st"),lang2=$("#2nd"),lang3=$("#3rd");const displayTmp=function(n,o){$(o).html(n)},handlebarsTemplating=function(n,o){var s=n,e=Handlebars.templates[o],i=e(s);return i},templateRaw=function(n,o){var s=n,e=$(o).html(),i=Handlebars.compile(e),a=i(s);return a},getDir=function(n,o,s,e){var i=s.find(n).data(o),a=e+i+".json";return a},getDirSimple=function(n,o,s){var e=n.data(o),i=s+e+".json";return i},showModal=function(){modalOverlay.addClass("is-displaying"),setTimeout(function(){modalOverlay.addClass("is-visible")},50),setTimeout(function(){modalContainer.addClass("is-in-position")},250)},hideModal=function(){modalContainer.removeClass("is-in-position"),setTimeout(function(){modalOverlay.removeClass("is-visible")},450),setTimeout(function(){modalOverlay.removeClass("is-displaying")},650)};$(document).ready(function(){$(window).scroll(function(){var n=$(this).scrollTop(),o=nav.height();n>=o?nav.addClass("is-fixed"):nav.removeClass("is-fixed"),n>=o+150?logo.addClass("logo-is-in-position"):logo.removeClass("logo-is-in-position")});const n=function(){var n=$(this),o=n.parent().parent().find(".navigation"),s=o.find(".submenu"),e=s.hasClass("submenu-is-open");n.find("svg").toggleClass("is-hidden"),e&&s.removeClass("submenu-is-open"),o.toggleClass("is-open")};nav.on("click",".toggle-menu",n);const o=function(){var n=$(window).width()<700,o=$(this);n&&o.find(".ch-down").toggleClass("is-hidden").end().find(".ch-up").toggleClass("is-hidden").end().find(".submenu").toggleClass("submenu-is-open")};nav.on("click",".dropdown",o);const s=function(){var n=$(this),o=getDir(".lector__caption","name",n,dirLectors);modalTemplating(o,"lectorTemplate","#modal-lector")};$(".lectors").on("click",".lector",s),$(".modal").on("click",".close",hideModal)});
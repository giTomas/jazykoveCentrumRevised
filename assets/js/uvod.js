$(document).ready(function(){"use strict";function n(n,e,a,s){a.closest(n).find(e).removeClass(s).end().end().addClass(s)}function e(n,e,a){$(n).find(".languages-hidden").removeClass(a),$(e).addClass(a)}jsonLoadOnPage("../assets/json/news/notices.json","noticesTemplate","#news");const a=function(){var n=$(this),e=getDir(".notice-content","date",n,dirNews);modalTemplating(e,"newTemplate","#modal-new")};$("#news").on("click",".notice",a);const s=function(){var a=$(this),s=getDir("h3","category",a,"../assets/json/languages/");n(lang1,".language-item",a,"is-picked"),$.getJSON(s).then(function(n){var e=handlebarsTemplating(n,"languageTemplate");return e}).then(function(n){var a="../assets/json/languages/starobyle.json",l=s===a;l?(displayTmp(n,lang3),e(lang,lang3,"is-flex")):(displayTmp(n,lang2),e(lang,lang2,"is-flex"))})};lang1.on("click",".language-item",s);const l=function(){var e=$(this),a=getDir("h4","category",e,dirLang);n("#2nd",".language-item",e,"is-picked"),$.getJSON(a).then(function(n){var e=handlebarsTemplating(n,"languageTemplate");return e}).then(function(n){lang3.html(n).addClass("is-flex")})};lang2.on("click",".language-item",l);const i=function(){var n=$(".languages-hidden");n.removeClass("is-flex"),lang1.find(".language-item").removeClass("is-picked")},t=function(){var n=lang2.hasClass("is-flex");lang3.removeClass("is-flex"),n?lang2.find(".language-item").removeClass("is-picked"):lang1.find(".language-item").removeClass("is-picked")};lang2.on("click",".languageTemplate__close",i),lang3.on("click",".languageTemplate__close",t)});
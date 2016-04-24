function handlebarsTemplating(n,e,o){var a=n,s=Handlebars.templates[e],i=s(a);jQuery(o).html(i)}function getDir(n,e,o,a){var s=o.find(n).data(e),i=a+s+".json";return i}function getDirSimple(n,e,o){var a=n.data(e),s=o+a+".json";return s}function jsonLoadOnPage(n,e,o){jQuery.getJSON(n).done(function(n){handlebarsTemplating(n,e,o)}).fail(function(){alert("Nepodarilo sa nacitat data")})}function modalTemplating(n,e,o){jQuery.getJSON(n).done(function(n){handlebarsTemplating(n[0],e,o),showModal()}).fail(function(){alert("HTTP request failed")})}function languagesTemplating(n,e,o){jQuery.getJSON(n).done(function(n){handlebarsTemplating(n,e,o)}).fail(function(){alert("HTTP request failed")})}function showModal(){modalOverlay.addClass("is-displaying"),setTimeout(function(){modalOverlay.addClass("is-visible")},150),setTimeout(function(){modalContainer.addClass("is-in-position")},550)}function hideModal(){modalContainer.removeClass("is-in-position"),setTimeout(function(){modalOverlay.removeClass("is-visible")},450),setTimeout(function(){modalOverlay.removeClass("is-displaying")},800)}var nav=jQuery("nav"),logo=jQuery(".nav-logo"),modalOverlay=jQuery(".modal-overlay"),modalContainer=jQuery(".modal-container"),body=jQuery("body"),dirLectors="../assets/json/lectors/",dirNews="../assets/json/news/cz/",dirNewsNotices="../assets/json/news/notices.json",dirLang="../assets/json/languages/",lang1=$("#1st"),lang2=$("#2nd"),lang3=$("#3rd");jQuery(document).ready(function(){jQuery(window).scroll(function(){var n=jQuery(this).scrollTop(),e=nav.height();n>=e?nav.addClass("is-fixed"):nav.removeClass("is-fixed"),n>=e+150?logo.addClass("logo-is-in-position"):logo.removeClass("logo-is-in-position")}),nav.on("click",".toggle-menu",function(){var n=jQuery(this),e=n.parent().parent().find(".navigation"),o=e.find(".submenu"),a=e.hasClass("is-open"),s=o.hasClass("submenu-is-open");n.find("svg").toggleClass("is-hidden"),a&&s?o.removeClass("submenu-is-open"):null,a?e.removeClass("is-open"):e.addClass("is-open")}),nav.on("click",".dropdown",function(){var n=jQuery(window).width()<700;trgt=jQuery(this),n&&trgt.find(".ch-down").toggleClass("is-hidden").end().find(".ch-up").toggleClass("is-hidden").end().find(".submenu").toggleClass("submenu-is-open")}),jQuery(".lectors").on("click",".lector",function(){var n=jQuery(this),e=getDir(".lector-caption","name",n,dirLectors);modalTemplating(e,"lectorTemplate","#modal-lector")}),jQuery(".modal").on("click",".close",function(){hideModal()})});
const addRemoveHiglight=function(e,a,n,l){n.closest(e).find(a).removeClass(l).end().end().addClass(l)},addRemove=function(e,a,n){$(e).find(".languages").removeClass(n),$(a).addClass(n)},firstChoiceHandler=function(){var e=$(this),a=getDir("h3","category",e,dirLang);addRemoveHiglight(lang1,".language-item",e,"is-picked"),$.getJSON(a).then(function(e){var a=templateRaw(e,"#languageTemplate");return a}).then(function(e){var n="../assets/json/languages/starobyle.json",l=a===n;l?(displayTmp(e,lang3),addRemove("#languages",lang3,"is-flex")):(displayTmp(e,lang2),addRemove("#languages",lang2,"is-flex"))})};lang1.on("click",".language-item",firstChoiceHandler);const secondChoiceHandler=function(){var e=$(this),a=getDir("h4","category",e,dirLang);addRemoveHiglight("#2nd",".language-item",e,"is-picked"),$.getJSON(a).then(function(e){var a=templateRaw(e,"#languageTemplate");return a}).then(function(e){lang3.html(e).addClass("is-flex")})};lang2.on("click",".language-item",secondChoiceHandler);const firstCloseHandler=function(){var e=$(".languages");e.removeClass("is-flex"),lang1.find(".language-item").removeClass("is-picked")},secondCloseHandler=function(){var e=lang2.hasClass("is-flex");lang3.removeClass("is-flex"),e?lang2.find(".language-item").removeClass("is-picked"):lang1.find(".language-item").removeClass("is-picked")};lang2.on("click",".languageTemplate__close",firstCloseHandler),lang3.on("click",".languageTemplate__close",secondCloseHandler);
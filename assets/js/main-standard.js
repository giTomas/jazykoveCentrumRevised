"use strict";$(document).ready(function(){var s=$("nav"),n=$(".nav-logo");$(window).scroll(function(){var i=$(this).scrollTop(),o=s.height(),e=i>=o,d=i>=o+150;e?s.addClass("is-fixed"):s.removeClass("is-fixed"),d?n.addClass("logo-is-in-position"):n.removeClass("logo-is-in-position")});var i=function(){var s=$(this),n=s.parent().parent().find(".navigation"),i=n.find(".submenu"),o=i.hasClass("submenu-is-open");s.find("svg").toggleClass("is-hidden"),o&&i.removeClass("submenu-is-open"),n.toggleClass("is-open")},o=function(){var s=$(window).width()<700,n=$(this);s&&n.find(".ch-down").toggleClass("is-hidden").end().find(".ch-up").toggleClass("is-hidden").end().find(".submenu").toggleClass("submenu-is-open")};s.on("click",".toggle-menu",i),s.on("click",".dropdown",o)});
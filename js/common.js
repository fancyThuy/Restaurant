/* GLOBAL */
var viewportW = jQuery(window).width(),
  viewportH = jQuery(window).height(),
  documentH = 0,
  viewportSP = 768,
  opacity = "opacity:0";

$(document).ready(function () {
  //FIX IE
  0 <
    (function () {
      var a = window.navigator.userAgent,
        b = a.indexOf("MSIE");
      return 0 < b
        ? parseInt(a.substring(b + 5, a.indexOf(".", b)))
        : navigator.userAgent.match(/Trident\/7\./)
        ? 11
        : 0;
    })() && $("html").addClass("fixie");
  // OBJECT FIT IE
  $(".fixie .obj-img").each(function () {
    var a = $(this),
      b = a.find("img").prop("src");
    a.find("img").hide();
    b &&
      a.css("backgroundImage", "url(" + b + ")").addClass("custom-object-fit");
  });
  //END FIX IE

  //DETECT
  var userAgent = window.navigator.userAgent;
  userAgent.match(/iPhone/i) && $("body").addClass("ios");
  "6" === iPhoneVersion() && $("body").addClass("iphone6");
  "X" === iPhoneVersion() && $("body").addClass("iphoneX");
  "Plus" === iPhoneVersion() && $("body").addClass("iphonePlus");
  var isChrome = !!window.chrome,
    isFirefox = userAgent.toLowerCase().indexOf("firefox") > -1;
  isSafari = !!window.safari;
  isEdge = userAgent.indexOf("Edge") > -1;
  isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  isChrome && !$("body").hasClass("ios") && $("body").addClass("chrome");
  isSafari && !$("body").hasClass("android") && $("body").addClass("safari");
  isFirefox && !$("body").hasClass("android") && $("body").addClass("firefox");
  if (isEdge && $("body").hasClass("chrome")) {
    $("body").removeClass("chrome");
    $("body").addClass("edge");
  }
  if (isAndroid) {
    $("body").addClass("android");
  }
  //END DETECT
  

  //LOAD FUNCTION
  load_function();
  jQuery(window)
    .resize(function () {
      viewportW = jQuery(window).width();
      viewportH = jQuery(window).height();
    })
    .resize();
  //END LOAD FUNCTION


  //WINDOW SCROLL ADD CLASS
  $(window).scroll(function () {
    var a = $(window).scrollTop();
    150 < a
      ? $("body").addClass("over_150")
      : $("body").removeClass("over_150");
    1400 > $(window).width()
      ? 250 < a
        ? $("body").addClass("over_500")
        : $("body").removeClass("over_500")
      : 250 < a
      ? $("body").addClass("over_500")
      : $("body").removeClass("over_500");
  });
  //END WINDOW SCROLL ADD CLAS

  //HOVER CHANGE IMG
  $(".js-hoverimg > li a")
    .mouseover(function (a) {
      $(this)
        .find("img")
        .attr("src", $(this).find("img").attr("src").replace("_off", "_on"));
    })
    .mouseout(function (a) {
      $(this)
        .find("img")
        .attr("src", $(this).find("img").attr("src").replace("_on", "_off"));
    });
  //END HOVER CHANGE IMG

  //FIX SCROLL WHEN HEADER FIX
  var heightHD = $("header").outerHeight();
  $(".js-archorlink").each(function () {
    $(this).css({
      "padding-top": heightHD + 10,
      "margin-top": -heightHD,
    });
  });
  //END FIX SCROLL WHEN HEADER FIX

  //BACKTO TOP
  if ($(".backtop").length) {
    var scrollTrigger = 300, // px
      // scroll to display and automatic hide BACK TO TOP after (x) second
      hideTimeout = 0,
      backToTop = function (second) {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          if (second && second > 0) {
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(function () {
              $(".backtop").fadeOut();
            }, second * 1000);
          }
          $(".backtop").fadeIn();
        } else {
          $(".backtop").fadeOut();
        }
      };
    backToTop(5);
    $(window).on("scroll", function () {
      backToTop(5);
    });
    $(".backtop").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        700
      );
    });
  }
  //END BACKTO TOP

});

//LOAD FUNCTION ------------------------------------------------
function load_function() {
  accordion();
  linkAnchor();
}

//CREAT FUNCTION ------------------------------------------------

//LINK ANCHOR
function linkAnchor() {
  $("a[href*=#]:not([href=#])").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var a = $(this.hash);
      a = a.length ? a : $("[name=" + this.hash.slice(1) + "]");
      if (a.length)
        return (
          $("html,body").animate(
            {
              scrollTop: a.offset().top,
            },
            300
          ),
          !1
        );
    }
  });
}
//END LINK ANCHOR

//ACCORDION BOX
function accordion() {
  $(".acr_title").on("click", function (a) {
    a.preventDefault();
    a = $(this);
    var b = a.next(".acr_con");
    $(".acr_title").not($(this)).removeClass("open");
    $(".acr_con").not($(this).next()).slideUp("fast");
    a.toggleClass("open");
    b.slideToggle(250);
  });
}
//END ACCORDION BOX

//FIX HEIGHT ELEMENT
//use element.tile(columns)
(function (a) {
  a.fn.tile = function (b) {
    var c,
      e,
      f,
      g,
      h = this.length - 1,
      d;
    b || (b = this.length);
    this.each(function () {
      d = this.style;
      d.removeProperty && d.removeProperty("height");
      d.removeAttribute && d.removeAttribute("height");
    });
    return this.each(function (d) {
      f = d % b;
      0 == f && (c = []);
      c[f] = a(this);
      g = c[f].height();
      if (0 == f || g > e) e = g;
      (d != h && f != b - 1) ||
        a.each(c, function () {
          this.height(e);
        });
    });
  };
})(jQuery);
//END FIX HEIGHT ELEMENT

//DETECT IHONE VERSION
function iPhoneVersion() {
  var a = window.screen.height,
    b = window.screen.width;
  return 320 === b && 480 === a
    ? "4"
    : 320 === b && 568 === a
    ? "5"
    : 375 === b && 667 === a
    ? "6"
    : 414 === b && 736 === a
    ? "Plus"
    : 375 === b && 812 === a
    ? "X"
    : "none";
}
//END DETECT IHONE VERSION

function navmenu(parentClass, type) {
  if (type == "click") {
    var navClass = parentClass + " .megamenu > a";
    if (viewportW > 961) {
      $(navClass).eq(0).addClass("open");
    }
    $(navClass).on("click", function (a) {
      a.preventDefault();
      a = $(this);
      var b = a.next(".js-dropdown");
      $(navClass).not(a).removeClass("open");
      $(".js-dropdown").not(a.next()).slideUp("fast");
      a.toggleClass("open");
      b.slideToggle(250);
    });
  } else if (type == "hover") {
    var navClass = parentClass + " .megamenu";
    $(navClass).on({
      mouseenter: function () {
        var e = $(".header_nav").outerHeight();
        $(this)
          .find(".js-dropdown")
          // .css("top", e)
          // .stop(!0, !0)
          // .delay(100)
          // .slideDown(400),
          $(this).addClass("is-act");
      },
      mouseleave: function () {
        // $(this).find(".js-dropdown").stop(!0, !0).delay(100).slideUp(400),
        $(this).removeClass("is-act");
      },
    });
  }
}

if (viewportW > 751){
	if( $('body').hasClass('navstate_show') ){
		navmenu('.navstate_show .js-navheader', 'hover');
	} else {
		navmenu('.navstate_hide .js-navheader', 'click');
	}
}

if (viewportW < 750){
	navmenu('.js-navheader', 'click');
}

//FIX SQUARE
jQuery(window)
  .resize(function () {
    $(".js-square").each(function () {
      var wbox = $(this).outerWidth();
      $(this).css({ height: wbox });
    });
  })
  .resize();
//END FIX SQUARE

//OPEN POPUP
$("a.clickpop").click(function (e) {
  e.preventDefault();
  var thepopid = $(this).attr("data-for");
  $("#" + thepopid).addClass("showthis");
  $(".btn_close, .cancelbox").click(function (e) {
    e.preventDefault();
    $(".box-modal").removeClass("showthis");
  });
});
$(".modal-content, .clickpop, .btn_close, .hidden_pop").on(
  "click touchend",
  function (e) {
    e.stopPropagation();
  }
);

$(".popup").not('.popup-inner').on(
  "click touchend",
  function (e) {
    e.stopPropagation();
    $(".popup").removeClass("showthis");
  }
);

if (viewportW > 751) {
  $(document).on("click touchend", function (e) {
    $(".modal").removeClass("showthis");
  });
}

//END POPUP

//TAB
if ($(".js-tab-content").length) {
  $(".js-tab-content").hide();
  $("ul.tabslist li:first").addClass("active");
  $(".js-tab-content:first").addClass("active").show();
  $("ul.tabslist li").click(function (a) {
    a.preventDefault();
    $(".js-tab-content").hide();
    $("ul.tabslist li").not($(this)).removeClass("active");
    $(this).hasClass("active") || $(this).addClass("active");
    a = $(this).attr("data-id");
    $("#tab" + a).fadeIn();
    return !1;
  });
}
//END TAB


//test for getting url value from attr
// var img1 = $('.test').attr("data-thumbnail");
// console.log(img1);

//test for iterating over child elements
var langArray = [];

$('.vodiapicker option').each(function(){
  var img = $(this).attr("data-thumbnail");
  var text = this.innerText;
  var value = $(this).val();
  var item = '<li><img src="'+ img +'" alt="" value="'+value+'"/><span>'+ text +'</span></li>';
  langArray.push(item);
})

$('#a').html(langArray);

//Set the button value to the first el of the array
$('.btn-select').html(langArray[0]);
$('.btn-select').attr('value', 'en');

//change button stuff on click
$('#a li').click(function(){
   var img = $(this).find('img').attr("src");
   var value = $(this).find('img').attr('value');
   var text = this.innerText;
   var item = '<li><img src="'+ img +'" alt="" /><span>'+ text +'</span></li>';
  $('.btn-select').html(item);
  $('.btn-select').attr('value', value);
  $(".b").toggle();
  //console.log(value);
});

$(".btn-select").click(function(){
        $(".b").toggle();
    });

//check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang){
  //find an item with value of sessionLang
  var langIndex = langArray.indexOf(sessionLang);
  $('.btn-select').html(langArray[langIndex]);
  $('.btn-select').attr('value', sessionLang);
} else {
   var langIndex = langArray.indexOf('ch');
  console.log(langIndex);
  $('.btn-select').html(langArray[langIndex]);
  //$('.btn-select').attr('value', 'en');
}


var batch = 3;
$(".p-about .block3 .ins").each(function (index) {
  if (index >= batch) {
    $(this).fadeOut("slow").addClass("hide");
  }
});
$(".load-more-btn").on("click", function (e) {
  e.preventDefault();
  $(".p-about .block3 .ins:hidden").slice(0, batch).slideDown();
  if ($(".p-about .block3 .ins:hidden").length == 0) {
    $(this).fadeOut("slow");
  }
});

// if ($(".p-about .block3 .ins:hidden").length == 0) {
//   $(".load-more-btn").fadeOut("slow");
// } else {
//   $(".load-more-btn").fadeIn("slow");
// }


var a = document.getElementById("img1"),
 b = document.getElementById("img2");
    
$(window).on('scroll', function() {
  if($(window).scrollTop() > 500 ){
    console.log("touch");
    b.style.transform = "rotate("+window.pageYOffset*0.5+"deg)";
  }
  else{
    a.style.transform = "rotate("+window.pageYOffset*0.5+"deg)";
  }
});

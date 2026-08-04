/*-----------------------------------------------------------
 * Template Name    : Arshia | Bootstrap 5 Responsive Personal V-Card Resume HTML Template
 * Author           : Retrina Group
 * Version          : 1.0.0
 * Created          : November 2021
 * File Description : Main js file of the template
 *------------------------------------------------------------
 */

// repeated variables
var $window = $(window);
var $root = $('html, body');
var $lastWindowWidth = 0;
var $lastHash = 0;
var $isfirefox= 0;

$(document).ready(function() {

    "use strict";

    deviceScreen();
    date();
    mobileDesign();
    portfolioPopup();

    /* Interactive Portfolio */
interactivePortfolio();

    sidebarMenu();
    mapInit();

    /* Interactive portrait */
    heroImageReveal();

    /* Portfolio chatbot */
    portfolioChatbot();

    /* Interactive Resume */
    interactiveResume();

    /* Interactive Blog / Journal */
interactiveBlog();

    /* Custom cursor */
    mouseMagicCursor();

    ColorPallet();
    themeOption();
});

$window.on("load", function() {
    "use strict";
    $lastWindowWidth = $window.width();
    browserDetect();
    pagePreloader();
    scrollToAnchor();
    customScrollbar();
    portfolioIsotop();
    owlCrousel();
});

/* =========================================================
   RESPONSIVE RESIZE
========================================================= */

var layoutResizeTimer;

var lastDesktopState =
  $window.width() > 991;


$window.on(
  "resize",
  function () {

    "use strict";


    clearTimeout(
      layoutResizeTimer
    );


    layoutResizeTimer =
      setTimeout(
        function () {

          var isDesktop =
            $window.width() >
            991;


          /*
           * Only reload when actually crossing
           * Desktop ↔ Mobile layout mode.
           *
           * Normal laptop resizing does NOT reload.
           */

          if (
            isDesktop !==
            lastDesktopState
          ) {

            location.reload();

            return;

          }


          lastDesktopState =
            isDesktop;


          $lastWindowWidth =
            $window.width();


          refreshPortfolioLayout();

        },
        180
      );

  }
);

$window.on("popstate", function(){
    "use strict";
    if($lastHash ==1){
        $lastHash =0;
    }

    else if($lastHash == 0){
        
        var func = animateRandom();

        var $value = location.hash.replace('#', '');
        var $main = $('#main');
        var $first = '#' + $("#main > section:first-child").attr('id');
        var $last = '#' + $("#main > section:last-child").attr('id');
        var $id = location.hash;
        var $thisId = '#' + $("#main > section.active").attr('id');
        $(".menu > li a").removeClass("active");
        if($value == ''){
            $id = $first;
            $value = $("#main > section:first-child").attr('id');
        }
        if ($('.left-side').hasClass("nav-open")) {
            $("body").removeClass("mobile-menu-open");
            $(".menu-toggle").removeClass("menu-open");
            $(".menu-overlay").addClass("d-none");
            $('.left-side').animate({
                left: "200%"
            }, 300).removeClass("nav-open").addClass("nav-close");
        }
        $('.menu > li a[href$=' + $value + ']').addClass('active');
        if(  ($id == $last && !($thisId == $first)) ||
         ($id == $first && !($thisId == $last))){
            openMenu();
            if($window.width()<992){
                $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
            }
            else{
                $("#main > section.active").removeClass("active");      
                $main.children($id).addClass('active');
            }
            
            $('#main > section.active').css({width: '100%'});
        }
        else if( ($id != $last && $id != $first  && ($thisId == $first || $thisId == $last ))){
            closeMenu();
            if($window.width()<992){
                $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
            }
            else{
                $("#main > section.active").removeClass("active");      
                $main.children($id).addClass('active');
            }
        }
        else if(  ($id == $last && $thisId == $first ) || 
        ($id == $first && $thisId == $last ) ) {
            $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
        }
        else if(  ($id != $last && $thisId != $first ) || 
        ($id != $first && $thisId != $last ) ) {
            $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
        }
        

    }
});

/*-----------------------------------------------------------------------------
                                   FUNCTIONS
-----------------------------------------------------------------------------*/
/*-------------------------  browser Detect  -------------------------*/
function browserDetect() {        
    "use strict";
    if(window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1){
        $isfirefox = 1;
    }
    
}


/*-------------------------  deviceScreen  -------------------------*/
function deviceScreen() {
  "use strict";

  browserDetect();

  // Remove any zoom previously applied to the page.
  $("html").css("zoom", "");

  // Keep the loading line centered on every screen size.
  $(".middle-line").css({
    top: "50%",
    width: "2px",
    left: "50%",
    transform: "translate(-50%, -50%)"
  });
}

/*-------------------------  Date  -------------------------*/
function date() {
    "use strict";
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    //var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    $('#date').html('<span><b>' + newDate.getDate() + '</b></span>' + '<span>' + monthNames[newDate.getMonth()] + '</span> ' + newDate.getFullYear());
}

/*-------------------------  Preloader  -------------------------*/
function pagePreloader() {

    "use strict";
    var preloader = $('#line-loader');
    preloader.addClass('preloaded');

    // setTimeout(function() {
    // }, 800);
    setTimeout(function() {
        preloader.remove();
    }, 1000);
    
}

/*-------------------------  Custom Scrollbar  -------------------------*/
function customScrollbar() {
    "use strict";
    if($window.width()>991){
        $.mCustomScrollbar.defaults.scrollButtons.enable = true;
        $.mCustomScrollbar.defaults.axis = "y";
        $(".section").not('.hero').mCustomScrollbar({
            theme: "light",
            callbacks: {
                whileScrolling: function() {
                    if ($("#main > section.active").attr('id') == 'about') {
                        skills();
                        countup();
                    }
                }
            },
        });
    } else {
        $("#about").on("scroll",function() {
            skills();
            countup();
        });
    }
}

/*-------------------------  Count up  -------------------------*/
function countup() {
    "use strict";
    var hT = $('.count-up').offset().top,
        hH = $('.count-up').outerHeight(),
        wH = $(window).height(),
        wS = $(window).scrollTop();
    if (wS > (hT + hH - wH)) {
        $('.timer').countTo();
        $('.count-number').removeClass('timer');
    }
}

/*-------------------------  Skills  -------------------------*/
function skills() {
    "use strict";
    var hT = $('.skills').offset().top,
        hH = $('.skills').outerHeight(),
        wH = $(window).height(),
        wS = $(window).scrollTop(),
        percent,
        progressEnd,
        skillDP;
    if (wS > (hT + hH - wH)) {
        $('.skill-box:not([data-processed]').each(function() {
            skillDP = $(this).find('.skillbar').attr('data-percent');
            $(this).attr("data-processed", "true");
            $(this).find('.skillbar-bar').animate({
                width: skillDP
            }, 4000);
            progressEnd = parseInt(skillDP);
            percent = $(this).find('.skill-bar-percent span');
            percent.countTo();

        });
        
    }
}

/*-------------------------  Mobile Menu  -------------------------*/
function mobileDesign() {
    "use strict";

    var toggle = document.querySelector(".menu-toggle");
    var drawer = document.querySelector(".left-side");
    var overlay = document.querySelector(".menu-overlay");
    var close = document.getElementById("mobileMenuClose");

    function setOpen(open) {
      if (!drawer || window.innerWidth >= 992) {
        return;
      }

      document.body.classList.toggle("mobile-menu-open", open);
      drawer.classList.toggle("nav-open", open);
      drawer.classList.toggle("nav-close", !open);
      drawer.setAttribute("aria-hidden", open ? "false" : "true");

      drawer.style.removeProperty("left");
      drawer.style.removeProperty("right");
      drawer.style.removeProperty("width");
      drawer.style.removeProperty("padding-top");

      if (toggle) {
        toggle.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      }

      if (overlay) {
        overlay.classList.toggle("d-none", !open);
      }

      document.querySelectorAll(".next-prev-page.d-block.d-lg-none").forEach(function (nav) {
        nav.classList.toggle("d-none", open);
      });
    }

    window.setMobileMenuOpen = setOpen;

    if (toggle) {
      toggle.setAttribute("role", "button");
      toggle.setAttribute("tabindex", "0");
      toggle.setAttribute("aria-label", "Open mobile navigation");
      toggle.setAttribute("aria-expanded", "false");
      toggle.addEventListener("click", function () {
        setOpen(!document.body.classList.contains("mobile-menu-open"));
      });
      toggle.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle.click();
        }
      });
    }

    if (close) {
      close.addEventListener("click", function () { setOpen(false); });
    }

    if (overlay) {
      overlay.addEventListener("click", function () { setOpen(false); });
    }

    document.querySelectorAll(".left-side .menu a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 992) {
          setOpen(false);
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 992) {
        document.body.classList.remove("mobile-menu-open");
        if (overlay) overlay.classList.add("d-none");
        if (toggle) toggle.classList.remove("menu-open");
        drawer.removeAttribute("aria-hidden");
      } else {
        setOpen(false);
      }
    });

    if (window.innerWidth < 992) {
      requestAnimationFrame(function () { setOpen(false); });
    }
}

function menuAnimation() {
    "use strict";
    if (window.setMobileMenuOpen && window.innerWidth < 992) {
      window.setMobileMenuOpen(!document.body.classList.contains("mobile-menu-open"));
    }
}

/*-------------------------  Scroll To Anchor  -------------------------*/
function scrollToAnchor() {
    "use strict";

    //getting the anchor link in the URL and deleting the `#`
    var value = window.location.hash.replace('#', '');
    var firstId = $("#main > section:first-child").attr('id');
    var lastId = $("#main > section:last-child").attr('id');
    if (value.length == 0 || value == firstId) {
        $("#main > section:first-child").addClass('active');
        $('.menu > li:first-child a').addClass('active');
        $('.blog-single-page .menu > li:first-child a').removeClass('active');
        if ($('body.blog-single-page').length > 0)
        {
         closeMenu();
        }
        else{
            openMenu();
        }
    } else if (value == lastId) {
        $("#main > section:last-child").addClass('active');
        $('.menu > li:last-child a').addClass('active');
        openMenu();
    } else {
        var sectionAnchor = '#' + value;
        $("#main > section.active, .menu > li a").removeClass("active");
        $('#main > section' + sectionAnchor).addClass('active');
        $('.menu > li a[href$=' + value + ']').addClass('active');
        closeMenu();
    }
}

/*-------------------------  Open Menu  -------------------------*/

function openMenu() {

  "use strict";

  if ($window.width() < 992) {
    $("body").removeClass("layout-expanded layout-collapsed");
    $(".left-side").removeAttr("style").removeClass("nav-open").addClass("nav-close").attr("aria-hidden", "true");
    $(".left-side .menu-align, .left-side .menu, .left-side .menu .list-group-item, .left-side img, .left-side h1, .left-side a.download-cv").removeAttr("style");
    return;
  }


  var childrenCount =
    $(".left-side .menu .list-group-item").length;


  var windowWidth =
    $window.width();



  /*
   * HOME / CONTACT layout state.
   *
   * #main sizing is now handled entirely by CSS.
   */

  $("body")
    .removeClass("layout-collapsed")
    .addClass("layout-expanded");



  $(".menu-align, .left-side .menu, .left-side, .left-side img, .left-side h1, .left-side a.download-cv")
    .stop(true, true);



  if (windowWidth > 991) {


    /*
     * Expanded 3 × 2 menu.
     */

    $(".menu-align")
      .css({

        position:
          "absolute",

        top:
          "auto",

        left:
          "0",

        right:
          "auto",

        bottom:
          "0",

        height:
          "160px",

        width:
          "300px",

        transform:
          "none"

      });


    $(".left-side .menu")
      .css({

        position:
          "relative",

        display:
          "block",

        height:
          "100%",

        width:
          "100%"

      });

  }

  else {


    $(".menu-align")
      .css({

        position:
          "absolute",

        top:
          "auto",

        left:
          "50%",

        right:
          "auto",

        bottom:
          "0",

        height:
          "46%",

        width:
          "300px",

        transform:
          "translateX(-50%)"

      });

  }



  $(".left-side")
    .animate({

      width:
        "300px",

      paddingTop:
        "40px"

    }, 350);



  $(".left-side img")
    .animate({

      width:
        "180px"

    }, 350);



  $(".left-side h1")
    .animate({

      fontSize:
        "32px"

    }, 350);



  $(".left-side a.download-cv")

    .css({

      display:
        "inline-block",

      borderWidth:
        ""

    })

    .animate({

      opacity:
        "1",

      fontSize:
        "16px",

      paddingTop:
        "10px",

      paddingRight:
        "30px",

      paddingBottom:
        "10px",

      paddingLeft:
        "30px"

    }, 350);



  /*
   * Home / Contact menu = 3 × 2 grid.
   */

  for (
    var i = 0;
    i < childrenCount;
    i++
  ) {

    $(".left-side .menu")
      .children()
      .eq(i)
      .stop(true, true)
      .css({

        position:
          "absolute",

        height:
          "auto",

        flex:
          ""

      })
      .animate({

        left:
          (i % 3) * 100 +
          "px",

        top:
          Math.floor(i / 3) *
          75 +
          "px",

        width:
          "100px"

      }, 350);

  }



  window.setTimeout(

    refreshPortfolioLayout,

    380

  );

}



/*-------------------------  Close Menu  -------------------------*/

function closeMenu() {

  "use strict";

  if ($window.width() < 992) {
    $("body").removeClass("layout-expanded layout-collapsed");
    $(".left-side").removeAttr("style").removeClass("nav-open").addClass("nav-close").attr("aria-hidden", "true");
    $(".left-side .menu-align, .left-side .menu, .left-side .menu .list-group-item, .left-side img, .left-side h1, .left-side a.download-cv").removeAttr("style");
    return;
  }


  var windowWidth =
    $window.width();



  /*
   * ABOUT / RESUME / WORKS / BLOG state.
   */

  $("body")
    .removeClass("layout-expanded")
    .addClass("layout-collapsed");



  $(".menu-align, .left-side .menu, .left-side, .left-side img, .left-side h1, .left-side a.download-cv")
    .stop(true, true);



  if (
    windowWidth >
    991
  ) {


    /*
     * CRITICAL FIX:
     *
     * Explicitly clear the old 160px height
     * inherited from openMenu().
     *
     * top + bottom now define the available
     * vertical menu space.
     */

    $(".menu-align")
      .css({

        position:
          "absolute",

        top:
          "128px",

        right:
          "0",

        bottom:
          "12px",

        left:
          "0",

        width:
          "100%",

        height:
          "auto",

        transform:
          "none"

      });



    /*
     * Let CSS/Flex distribute all six menu items
     * through the available height.
     */

    $(".left-side .menu")
      .css({

        position:
          "relative",

        display:
          "flex",

        flexDirection:
          "column",

        justifyContent:
          "space-evenly",

        alignItems:
          "stretch",

        width:
          "100%",

        height:
          "100%"

      });



    $(".left-side")
      .animate({

        width:
          "88px",

        paddingTop:
          "15px"

      }, 350);



    $(".left-side img")
      .animate({

        width:
          "56px"

      }, 350);



    $(".left-side h1")
      .animate({

        fontSize:
          "12px"

      }, 350);



    $(".left-side a.download-cv")
      .animate({

        opacity:
          "0",

        fontSize:
          "0",

        paddingTop:
          "0",

        paddingRight:
          "0",

        paddingBottom:
          "0",

        paddingLeft:
          "0",

        borderWidth:
          "0"

      },

      350,

      function () {

        $(this).hide();

      }

    );



    /*
     * Remove old:
     *
     * top: i * 60px
     *
     * positioning.
     *
     * Each menu item is now a normal Flex child.
     */

    $(".left-side .menu .list-group-item")
      .stop(true, true)
      .css({

        position:
          "relative",

        left:
          "auto",

        right:
          "auto",

        top:
          "auto",

        bottom:
          "auto",

        width:
          "100%",

        height:
          "auto",

        flex:
          "0 0 auto"

      });

  }

  else {

    openMenu();

  }



  window.setTimeout(

    refreshPortfolioLayout,

    380

  );

}

/* =========================================================
   REFRESH SECTION LAYOUT
========================================================= */

function refreshPortfolioLayout() {

  "use strict";


  /*
   * Every page always fills the current #main frame.
   */

  $("#main > section")
    .css({

      width:
        "100%"

    });



  /*
   * mCustomScrollbar caches dimensions.
   * Update it after menu/frame changes.
   */

  if (
    $window.width() >
    991 &&
    $.fn.mCustomScrollbar
  ) {

    try {

      $(".section")
        .not(".hero")
        .mCustomScrollbar(
          "update"
        );

    }

    catch (error) {

      /*
       * Nothing to do if scrollbar
       * is not initialized yet.
       */

    }

  }



  /*
   * Recalculate Portfolio masonry.
   */

  if (
    $("#portfolio")
      .hasClass("active")
  ) {

    try {

      $(".portfolio-items")
        .isotope(
          "layout"
        );

    }

    catch (error) {

      /*
       * Isotope may not be initialized yet.
       */

    }

  }

}

/*-------------------------  Sidebar Menu  -------------------------*/
function sidebarMenu() {

    "use strict";
    var $menuLink = $(".menu > li a");
    var $main = $('#main');
    var $first = '#' + $("#main > section:first-child").attr('id');
    var $last = '#' + $("#main > section:last-child").attr('id');
    $menuLink.on("click", function() {
        var func = animateRandom();
        var $id = $(this).attr('href');
        var $thisId = '#' + $("#main > section.active").attr('id'); 
        var not_allowed = [$first, $last];

        if (not_allowed.indexOf($id) > -1 || not_allowed.indexOf($thisId) > -1) {

            if (not_allowed.indexOf($thisId) >= 0 && not_allowed.indexOf($id) >= 0) {
                $(".menu > li a").removeClass("active");
                $(this).addClass('active');
                $("#main > section.active").addClass(func[1]).removeClass("active");
                $main.children($id).addClass('active ' + func[0]);
            } 
            else if($window.width()<992){
                $(".menu > li a").removeClass("active");
                $(this).addClass('active');
                $("#main > section.active").addClass(func[1]).removeClass("active");
                $main.children($id).addClass('active ' + func[0]);
            }
            else {
                $(".menu > li a").removeClass('active');
                $("#main > section.active").removeClass('active');
                $(this).addClass('active');
                $main.children($id).addClass('active');
                if (not_allowed.indexOf($thisId) >= 0 && $window.width() > 992) {
                    closeMenu();
                }
                if (not_allowed.indexOf($id) >= 0) {
                    openMenu();
                }
            }
            owlCrousel();

        } else {
            $(".menu > li a").removeClass("active");
            $(this).addClass('active');
            $("#main > section.active").addClass(func[1]).removeClass("active");
            $main.children($id).addClass('active ' + func[0]);
            owlCrousel();

        }
        if ($id == '#portfolio') {
            setTimeout(function() {
                portfolioIsotop();
            }, 1000);
        }
        $lastHash = 1;

        window.setTimeout(

  refreshPortfolioLayout,

  400

);

    });

    // To Contact Button
    $(".to-contact").on('click', function() {
        var func = animateRandom();

        $(".menu > li a").removeClass("active");
        $('.menu > li:last-child a').addClass('active');
        if($window.width()<992){
            $("#main > section.active").addClass(func[1]).removeClass("active");
            $('#main > section:last-child').addClass('active ' + func[0]);
        }
        else{

            $("#main > section.active").removeClass("active");
            $('#main > section:last-child').addClass('active ');
                    openMenu();


        }
        
        $lastHash = 1;


    })

    // Next Page Button
    $(".next-page").on("click", function() {
        $lastHash = 1;
        var func = animateRandom();
        if ($(".menu > li a.active").attr('href') !== $last) {
            $(".menu > li a.active").each(function() {
                $(this).parents('li').next('li').children('a').each(function() {
                    if ($(this).attr('href') !== $first && $(this).attr('href') !== $last && $window.width() > 991) {
                        closeMenu(); //decrease Menu width
                    } else {
                        openMenu(); //increase Menu width
                        $('#main > section:last-child').css({width: '100%'});
                    }
                    if($window.width()<992){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
                    else if ($(".menu > li a.active").attr('href') == $first || $(this).attr('href') == $last){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").removeClass("active");
                        $main.children($id).addClass('active');
                    }
                    else{
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
  
                })
                $(this).removeClass('active');
            });
            owlCrousel();
        } else {
            $("#main > section.active").addClass(func[1]).removeClass("active");
            $(".menu > li a.active").removeClass("active");
            $(".menu > li:first-child a").addClass('active');
            $("main > section:first-child").addClass('active ' + func[0]);
            changeWindowLocation($first);
        }

    });
    // Prev Page Button
    $(".prev-page").on("click", function() {
        $lastHash = 1;
        var func = animateRandom();
        if ($(".menu > li a.active").attr('href') !== $first) {
            $(".menu > li a.active").each(function() {
                $(this).parents('li').prev('li').children('a').each(function() {
                    if ($(this).attr('href') !== $first && $(this).attr('href') !== $last && $window.width() > 992) {
                        closeMenu(); //decrease Menu width
                    } else {
                        openMenu(); //increase Menu width
                        $('#main > section:first-child').css({width: '100%'});
                    }
                    if($window.width()<992){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
                    else if ($(".menu > li a.active").attr('href') == $last || $(this).attr('href') == $first){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("main > section.active").removeClass("active");
                        $main.children($id).addClass('active ');    
                    }
                    else{
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
                })
                $(this).removeClass('active');
            });
            owlCrousel();

        } else {
            $(".menu > li a.active").removeClass("active");
            $("main > section.active").addClass(func[1]).removeClass("active");
            $("main > section:last-child").addClass('active ' + func[0]);
            $(".menu > li:last-child a").addClass('active');
            changeWindowLocation($last);

        }

    });
}

/*-------------------------  Animate Random  -------------------------*/
function animateRandom() {
    const animate = [
        ["animate__backInDown", "animate__backOutDown"],
        ["animate__zoomIn", "animate__zoomOut"],
        ["animate__fadeInDown", "animate__fadeOutDown"],
    ];

    $.each(animate, function(i, v) {
        $("#main > section").removeClass(v[0]);
        $("#main > section").removeClass(v[1]);
    });

    const random = Math.floor(Math.random() * animate.length);
    return animate[random];
}

/*-------------------------  Change Window Location  -------------------------*/
function changeWindowLocation($id) {

    "use strict";
    window.location = $id;
}

/*-------------------------  Testimonial Owlcarousel  -------------------------*/
function owlCrousel() {
    "use strict";
    var counter = 1;
    $(".portfolio-page-carousel.owl-carousel").owlCarousel({
        items: 1,
        padding: 0,
        nav: false,
        autoplay: false,
        loop: true,
        dots: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
    });
    if ($("#main > section.active").attr('id') == 'about') {

        $(".owl-carousel").owlCarousel({
            items: 1,
            padding: 0,
            nav: false,
            autoplay: false,
            loop: true,
            dots: true,
            mouseDrag: true,
            touchDrag: true,
            smartSpeed: 1000,
            autoplayHoverPause: true,
            margin: 20
        });
    }
}

/*-------------------------  ISOTOPE JS  -------------------------*/
/* =========================================================
   PORTFOLIO FILTERING
   Category + Selected / All modes
========================================================= */

function portfolioIsotop() {

  "use strict";

  var $portfolio = $("#portfolio");
  var $grid = $(".portfolio-items");
  var $filter = $("#portfolio-filter");

  if (!$portfolio.length || !$grid.length) {
    return;
  }

  var currentFilter =
    $portfolio.attr("data-current-filter") || "*";

  if (!$grid.data("isotope")) {
    $grid.isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
      transitionDuration: "0.45s"
    });
  }

  function categoryName(filterValue) {
    if (filterValue === "*") {
      return "all";
    }

    return filterValue.replace(".", "");
  }

  function visibleCount() {
    if (currentFilter === "*") {
      return $grid.find(".portfolio-item").length;
    }

    return $grid.find(currentFilter).length;
  }

  function applyPortfolioFilter() {
    $portfolio.attr("data-current-filter", currentFilter);

    $grid.isotope({
      filter: currentFilter
    });

    var label = document.getElementById("portfolioResultLabel");

    if (label) {
      var count = visibleCount();
      var category = categoryName(currentFilter);

      label.textContent =
        currentFilter === "*"
          ? "Showing all " + count + " projects"
          : "Showing " + count + " " + category +
            (count === 1 ? " project" : " projects");
    }

    window.setTimeout(function () {
      $grid.isotope("layout");
    }, 420);
  }

  $filter
    .find("a")
    .off("click.portfolioV2")
    .on("click.portfolioV2", function (event) {
      event.preventDefault();

      currentFilter = $(this).attr("data-filter") || "*";

      $filter.find("a").removeClass("active");
      $(this).addClass("active");

      applyPortfolioFilter();
    });

  applyPortfolioFilter();

}

/*-------------------------  MAGNIFIC POPUP JS  -------------------------*/
function portfolioPopup() {

    "use strict";

   if ($('.portfolio-items').length > 0) {
        $('.portfolio-items').each(function() {
          $(this).magnificPopup({

    delegate:
      "a.portfolio-magnific",

    type:
      "image",

    removalDelay:
      300,

    mainClass:
      "mfp-fade",


    image: {

      titleSrc:
        "title"

    },


    gallery: {

      enabled:
        true,

      navigateByImgClick:
        true,

      preload:
        [0, 2],

      tCounter:
        "%curr% of %total%"

    },
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '<div class="mfp-title mfp-bottom-iframe-title"></div>' + "</div>",
                    patterns: {
                        youtube: {
                            index: "youtube.com/",
                            id: null,
                            src: "%id%?autoplay=1"
                        },
                        vimeo: {
                            index: "vimeo.com/",
                            id: "/",
                            src: "https://player.vimeo.com/video/%id%?autoplay=1"
                        },
                        gmaps: {
                            index: "//maps.google.",
                            src: "%id%&output=embed"
                        },
                    },
                    srcAction: "iframe_src",
                },
            });
        });
    }
}

/*-------------------------  GOOGLE Map  -------------------------*/
function mapInit() {

    "use strict";
    var myMap = $('#my-map');

    if (myMap.length) {
        var lat = myMap.data("location-lat");
        var lng = myMap.data("location-lng");
        var options = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 7,
            mapTypeControl: true,
            gestureHandling: 'cooperative',
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT,
                position: google.maps.ControlPosition.TOP_LEFT
            },
            scaleControl: false,
            styles: [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#576ee9"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d5d5d5"
                }, {
                    "lightness": 21
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#f8f8f8"
                }, {
                    "lightness": 25
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": "#222222"
                }, {
                    "lightness": 30
                }]
            }, {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 10
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }],
        };
        var map = new google.maps.Map(document.getElementById('my-map'), options);
        var marker1 = new google.maps.Marker({
            position: map.getCenter(),
            title: $('title').text(),
            icon: myMap.data("location-icon"),
            animation: google.maps.Animation.BOUNCE
        });
        marker1.setMap(map);
    }
}

/*-------------------------  Mouse Magic Cursor  -------------------------*/
function mouseMagicCursor() {
  "use strict";

  const innerCursor = document.querySelector(".mmc-inner");
  const outerCursor = document.querySelector(".mmc-outer");
  const cursorText = document.querySelector(".cursor-text");

  if (
    !innerCursor ||
    !outerCursor ||
    !cursorText ||
    window.innerWidth <= 991
  ) {
    return;
  }

  const cursorMessages = [
    "HIRE ME 🥺",
    "PLEASE 🥺",
    "I'LL DO MY BEST 🌟",
    "PROMISE 🤞"
  ];

  let currentMessage = 0;

  cursorText.textContent = cursorMessages[currentMessage];

  const messageInterval = setInterval(function () {
    currentMessage = (currentMessage + 1) % cursorMessages.length;
    cursorText.textContent = cursorMessages[currentMessage];
  }, 2000);

  window.addEventListener("mousemove", function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    innerCursor.style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    outerCursor.style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    cursorText.style.transform =
      `translate3d(${mouseX + 20}px, ${mouseY + 16}px, 0)`;
  });

  document
  .querySelectorAll("a, button, .cursor-pointer")
  .forEach(function (element) {
    element.addEventListener("mouseenter", function () {
      innerCursor.classList.add("mmc-hover");
      outerCursor.classList.add("mmc-hover");

      // Hide text when hovering clickable items
      cursorText.style.opacity = "0";
    });

    element.addEventListener("mouseleave", function () {
      innerCursor.classList.remove("mmc-hover");
      outerCursor.classList.remove("mmc-hover");

      // Show text again
      cursorText.style.opacity = "1";
    });
  });

  innerCursor.style.visibility = "visible";
  outerCursor.style.visibility = "visible";
  cursorText.style.visibility = "visible";
  cursorText.style.opacity = "1";

  window.addEventListener("beforeunload", function () {
    clearInterval(messageInterval);
  });
}
/*-------------------------
   Interactive Hero Portrait
-------------------------*/
function heroImageReveal() {
  "use strict";

  const portrait = document.getElementById("heroPortraitReveal");
  const revealImage = document.getElementById("heroPortraitLayer");

  if (
    !portrait ||
    !revealImage ||
    window.innerWidth <= 991
  ) {
    return;
  }

  /*
    These images rotate every time
    the visitor enters the portrait.
  */
  const revealLayers = [
    "assets/img/webdesigner/hero-layers/profile-skeleton.png",
    "assets/img/webdesigner/hero-layers/profile-code.png",
    "assets/img/webdesigner/hero-layers/profile-automation.png",
    "assets/img/webdesigner/hero-layers/profile-data.png",
    "assets/img/webdesigner/hero-layers/profile-marketing.png",
    "assets/img/webdesigner/hero-layers/profile-software.png"
  ];

  /*
    Preload all images so the reveal does not
    flash or lag the first time each one appears.
  */
  revealLayers.forEach(function (src) {
    const image = new Image();
    image.src = src;
  });

  let currentLayer = -1;

  /*
    Move the reveal circle to the mouse position.
  */
  function updateRevealPosition(event) {
    const rect = portrait.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    portrait.style.setProperty(
      "--reveal-x",
      x + "px"
    );

    portrait.style.setProperty(
      "--reveal-y",
      y + "px"
    );
  }

  /*
    Every NEW hover selects the next image.

    Hover 1 = Skeleton
    Hover 2 = Code
    Hover 3 = Automation
    Hover 4 = Data
    Hover 5 = Marketing
    Hover 6 = Software Engineering
    Then repeat.
  */
  portrait.addEventListener(
    "mouseenter",
    function (event) {

      currentLayer =
        (currentLayer + 1) %
        revealLayers.length;

      revealImage.src =
        revealLayers[currentLayer];

      updateRevealPosition(event);

      portrait.classList.add(
        "is-revealing"
      );
    }
  );


  /*
    Follow the cursor while inside
    the portrait.
  */
  portrait.addEventListener(
    "mousemove",
    function (event) {

      updateRevealPosition(event);

    }
  );


  /*
    When the mouse leaves:
    return completely to normal photo.
  */
  portrait.addEventListener(
    "mouseleave",
    function () {

      portrait.classList.remove(
        "is-revealing"
      );

    }
  );
}

/*---------------------------------------------------------
                    PORTFOLIO CHATBOT
---------------------------------------------------------*/

function portfolioChatbot() {

  "use strict";

  const toggle = document.getElementById("chatbotToggle");
  const panel = document.getElementById("chatbotPanel");
  const closeButton = document.getElementById("chatbotClose");
  const form = document.getElementById("chatbotForm");
  const input = document.getElementById("chatbotInput");
  const messages = document.getElementById("chatbotMessages");
  const teaser = document.getElementById("chatbotTeaser");
  const teaserText = document.getElementById("chatbotTeaserText");

  if (!toggle || !panel || !form || !input || !messages) {
    return;
  }

  let teaserIndex = 0;
  let teaserShowTimer = null;
  let teaserHideTimer = null;
  let teaserLoopTimer = null;
  let isReplying = false;
  let aiUnavailable = false;
  let recognition = null;
  let isListening = false;
  let voiceMode = false;
  let voiceDisclosureShown = false;
  let lumoVisualizer = null;
  let lumoVisualizerLabel = null;
  let lumoVisualizerFrame = null;
  let lumoVisualizerState = "idle";
  let lumoVisualizerEnergy = 0.12;
  let lumoVisualizerTargetEnergy = 0.12;
  let lumoTextAnimationTimer = null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const aiEndpointMeta = document.querySelector('meta[name="luke-chatbot-api"]');
  const aiEndpoint =
    window.LUKE_CHATBOT_API_URL ||
    (aiEndpointMeta ? aiEndpointMeta.getAttribute("content") : "") ||
    "/api/chat";
  const conversationHistory = [];

  input.maxLength = 350;

  function homeSection(section) {
    const fileName = window.location.pathname.split("/").pop().toLowerCase();
    const onHomePage = !fileName || fileName === "index.html";
    return (onHomePage ? "" : "index.html") + section;
  }

  function normalizeQuestion(value) {
    return value
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9₱$]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function includesAny(text, phrases) {
    return phrases.some(function (phrase) {
      return text.includes(phrase);
    });
  }

  function rememberMessage(role, content) {
    conversationHistory.push({ role: role, content: content });

    if (conversationHistory.length > 8) {
      conversationHistory.splice(0, conversationHistory.length - 8);
    }
  }

  function installLumoBranding() {
    const header = panel.querySelector(".chatbot-header");
    const profile = panel.querySelector(".chatbot-header-profile");
    const title = profile ? profile.querySelector("strong") : null;
    const profileIcon = profile ? profile.querySelector(".chatbot-mini-robot") : null;

    if (title) {
      title.textContent = "Lumo";
    }

    if (title && title.parentElement) {
      const status = title.parentElement.querySelector("span");

      if (status) {
        status.innerHTML = '<span class="chat-online-indicator"></span> Luke\'s AI assistant';
      }
    }

    if (profileIcon) {
      profileIcon.classList.add("lumo-brand-icon");
      profileIcon.setAttribute("aria-label", "Lumo");
      profileIcon.innerHTML =
        '<span class="lumo-brand-orbit lumo-brand-orbit-one"></span>' +
        '<span class="lumo-brand-orbit lumo-brand-orbit-two"></span>' +
        '<span class="lumo-brand-core">L</span>';
    }

    panel.querySelectorAll(".bot-message .chat-message-avatar:not(.chat-message-avatar-spacer)")
      .forEach(function (avatar) {
        avatar.classList.add("lumo-message-avatar");
        avatar.innerHTML = '<span aria-hidden="true">L</span>';
        avatar.setAttribute("aria-label", "Lumo");
      });

    if (teaser) {
      const teaserAvatar = teaser.querySelector(".chatbot-teaser-avatar");

      if (teaserAvatar) {
        teaserAvatar.classList.add("lumo-teaser-avatar");
        teaserAvatar.textContent = "L";
      }
    }

    if (!header || panel.querySelector(".lumo-visualizer")) {
      return;
    }

    const visualizer = document.createElement("div");
    visualizer.className = "lumo-visualizer";
    visualizer.setAttribute("role", "img");
    visualizer.setAttribute("aria-label", "Lumo voice activity: ready");
    visualizer.innerHTML =
      '<div class="lumo-visualizer-meta">' +
      '<span><i></i> LUMO SIGNAL</span>' +
      '<strong class="lumo-visualizer-state">READY</strong>' +
      '</div>' +
      '<canvas class="lumo-wave-canvas" aria-hidden="true"></canvas>';

    header.insertAdjacentElement("afterend", visualizer);
    lumoVisualizer = visualizer.querySelector(".lumo-wave-canvas");
    lumoVisualizerLabel = visualizer.querySelector(".lumo-visualizer-state");

    startLumoVisualizer();
  }

  function getLumoStateSettings() {
    const settings = {
      idle: { label: "READY", energy: 0.12, speed: 0.00055 },
      listening: { label: "LISTENING", energy: 0.48, speed: 0.00155 },
      thinking: { label: "THINKING", energy: 0.29, speed: 0.0011 },
      speaking: { label: "SPEAKING", energy: 0.58, speed: 0.00185 }
    };

    return settings[lumoVisualizerState] || settings.idle;
  }

  function setLumoVisualizerState(state, energy) {
    const wrapper = lumoVisualizer ? lumoVisualizer.closest(".lumo-visualizer") : null;
    const allowedStates = ["idle", "listening", "thinking", "speaking"];

    lumoVisualizerState = allowedStates.includes(state) ? state : "idle";

    const settings = getLumoStateSettings();
    lumoVisualizerTargetEnergy = typeof energy === "number"
      ? Math.max(0.08, Math.min(0.95, energy))
      : settings.energy;

    if (wrapper) {
      wrapper.setAttribute("data-state", lumoVisualizerState);
      wrapper.setAttribute(
        "aria-label",
        "Lumo voice activity: " + settings.label.toLowerCase()
      );
    }

    if (lumoVisualizerLabel) {
      lumoVisualizerLabel.textContent = settings.label;
    }
  }

  function drawLumoVisualizer(timestamp) {
    if (!lumoVisualizer) {
      return;
    }

    const context = lumoVisualizer.getContext("2d");

    if (!context) {
      return;
    }

    const width = Math.max(1, lumoVisualizer.clientWidth);
    const height = Math.max(1, lumoVisualizer.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    if (
      lumoVisualizer.width !== Math.floor(width * pixelRatio) ||
      lumoVisualizer.height !== Math.floor(height * pixelRatio)
    ) {
      lumoVisualizer.width = Math.floor(width * pixelRatio);
      lumoVisualizer.height = Math.floor(height * pixelRatio);
    }

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    const settings = getLumoStateSettings();
    const baseEnergy = settings.energy;
    const pulse = lumoVisualizerState === "idle"
      ? Math.sin(timestamp * 0.0012) * 0.025
      : Math.sin(timestamp * 0.0065) * 0.07;

    lumoVisualizerTargetEnergy += (baseEnergy - lumoVisualizerTargetEnergy) * 0.018;
    lumoVisualizerEnergy +=
      (lumoVisualizerTargetEnergy + pulse - lumoVisualizerEnergy) * 0.09;

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const colors = isLight
      ? ["rgba(151, 103, 0, .92)", "rgba(213, 157, 20, .52)", "rgba(98, 104, 116, .27)"]
      : ["rgba(255, 206, 79, .96)", "rgba(235, 176, 32, .56)", "rgba(214, 220, 233, .27)"];
    const centerY = height * 0.52;

    colors.forEach(function (color, waveIndex) {
      context.beginPath();
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = waveIndex === 0 ? 2 : 1.35;
      context.strokeStyle = color;

      for (let x = 0; x <= width; x += 2) {
        const progress = x / width;
        const envelope = Math.pow(Math.sin(Math.PI * progress), 1.18);
        const frequency = 2.1 + waveIndex * 0.7;
        const phase = timestamp * settings.speed * (1 + waveIndex * 0.14) + waveIndex * 1.8;
        const modulation = 0.66 + 0.34 * Math.sin(progress * Math.PI * 5 - phase * 0.72);
        const amplitude = height * (0.31 - waveIndex * 0.045) * lumoVisualizerEnergy;
        const y = centerY +
          Math.sin(progress * Math.PI * 2 * frequency + phase) *
          amplitude * envelope * modulation;

        if (x === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.stroke();
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lumoVisualizerFrame = null;
      return;
    }

    lumoVisualizerFrame = window.requestAnimationFrame(drawLumoVisualizer);
  }

  function startLumoVisualizer() {
    if (!lumoVisualizer || lumoVisualizerFrame) {
      return;
    }

    setLumoVisualizerState("idle");
    lumoVisualizerFrame = window.requestAnimationFrame(drawLumoVisualizer);
  }

  function animateLumoTextResponse(text) {
    window.clearTimeout(lumoTextAnimationTimer);

    const punctuationEnergy = (text.match(/[!?]/g) || []).length * 0.035;
    const energy = Math.min(0.78, 0.48 + punctuationEnergy);
    const duration = Math.min(4200, Math.max(1350, text.length * 24));

    setLumoVisualizerState("speaking", energy);
    lumoTextAnimationTimer = window.setTimeout(function () {
      if (!window.speechSynthesis || !window.speechSynthesis.speaking) {
        setLumoVisualizerState("idle");
      }
    }, duration);
  }

  const teaserMessages = [
    "Hi, I’m Lumo!",
    "I can recommend a project.",
    "Ask me what Luke can build.",
    "Web, data, or automation?",
    "Let’s find the right section.",
    "Ready to start a project?"
  ];

  function hideTeaser() {
    if (!teaser) {
      return;
    }

    teaser.classList.remove("show");
    window.clearTimeout(teaserHideTimer);
  }

  function showNextTeaser() {
    if (
      !teaser ||
      !teaserText ||
      panel.classList.contains("show") ||
      document.hidden ||
      document.body.classList.contains("mobile-menu-open")
    ) {
      hideTeaser();
      return;
    }

    teaserText.textContent = teaserMessages[teaserIndex];
    teaserIndex = (teaserIndex + 1) % teaserMessages.length;

    teaser.classList.remove("show");

    window.requestAnimationFrame(function () {
      teaser.classList.add("show");
    });

    window.clearTimeout(teaserHideTimer);
    teaserHideTimer = window.setTimeout(hideTeaser, 3600);
  }

  function startTeaserLoop() {
    window.clearTimeout(teaserShowTimer);
    window.clearInterval(teaserLoopTimer);

    teaserShowTimer = window.setTimeout(showNextTeaser, 2400);
    teaserLoopTimer = window.setInterval(showNextTeaser, 11000);
  }

  function setChatOpen(isOpen) {
    panel.classList.toggle("show", isOpen);
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.classList.toggle("chatbot-open", isOpen);

    hideTeaser();

    if (isOpen) {
      window.setTimeout(function () {
        input.focus();
        messages.scrollTop = messages.scrollHeight;
      }, 220);
    } else {
      window.clearTimeout(lumoTextAnimationTimer);

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      if (recognition && isListening) {
        recognition.stop();
      }

      setLumoVisualizerState("idle");
    }
  }

  function getPreferredVoice() {
    if (!window.speechSynthesis) {
      return null;
    }

    const voices = window.speechSynthesis.getVoices();

    return voices.find(function (voice) {
      return /^en-PH/i.test(voice.lang);
    }) || voices.find(function (voice) {
      return /^en-/i.test(voice.lang) && /natural|google|microsoft/i.test(voice.name);
    }) || voices.find(function (voice) {
      return /^en-/i.test(voice.lang);
    }) || null;
  }

  function speakReply(text) {
    if (!voiceMode || !window.speechSynthesis || !text) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getPreferredVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = "en-PH";
    }

    utterance.rate = 1.02;
    utterance.pitch = 1;
    utterance.addEventListener("start", function () {
      window.clearTimeout(lumoTextAnimationTimer);
      setLumoVisualizerState("speaking", 0.58);
    });
    utterance.addEventListener("boundary", function (event) {
      const phrase = text.slice(event.charIndex, event.charIndex + 24);
      const emphasis = /[!?]/.test(phrase) ? 0.16 : /[,.;:]/.test(phrase) ? -0.05 : 0.04;
      const wordLength = (phrase.split(/\s+/)[0] || "").length;
      setLumoVisualizerState(
        "speaking",
        Math.min(0.9, 0.5 + emphasis + wordLength * 0.018)
      );
    });
    utterance.addEventListener("end", function () {
      setLumoVisualizerState("idle");
    });
    utterance.addEventListener("error", function () {
      setLumoVisualizerState("idle");
    });
    window.speechSynthesis.speak(utterance);
  }

  function installVoiceControls() {
    const sendButton = form.querySelector(".chatbot-send");
    const header = panel.querySelector(".chatbot-header");

    if (!sendButton || form.querySelector(".chatbot-voice-button")) {
      return;
    }

    const voiceButton = document.createElement("button");
    voiceButton.type = "button";
    voiceButton.className = "chatbot-voice-button";
    voiceButton.setAttribute("aria-label", "Speak a question");
    voiceButton.setAttribute("aria-pressed", "false");
    voiceButton.innerHTML = '<i class="bi bi-mic-fill" aria-hidden="true"></i>';
    form.insertBefore(voiceButton, sendButton);

    let soundButton = null;

    function updateVoiceControls() {
      voiceButton.classList.toggle("is-listening", isListening);
      voiceButton.classList.toggle("is-active", voiceMode);
      voiceButton.setAttribute("aria-pressed", isListening ? "true" : "false");
      voiceButton.setAttribute(
        "aria-label",
        isListening ? "Stop listening" : "Speak a question"
      );

      if (soundButton) {
        soundButton.classList.toggle("is-active", voiceMode);
        soundButton.setAttribute("aria-pressed", voiceMode ? "true" : "false");
        soundButton.setAttribute(
          "aria-label",
          voiceMode ? "Turn off spoken replies" : "Turn on spoken replies"
        );
        soundButton.innerHTML = voiceMode
          ? '<i class="bi bi-volume-up-fill" aria-hidden="true"></i>'
          : '<i class="bi bi-volume-mute-fill" aria-hidden="true"></i>';
      }
    }

    function discloseVoice() {
      if (voiceDisclosureShown) {
        return;
      }

      voiceDisclosureShown = true;
      addMessage("I’m in voice mode now. My spoken replies use a computer-generated voice.", "bot", "bot-system-message");
    }

    if (header && closeButton) {
      const headerActions = document.createElement("div");
      headerActions.className = "chatbot-header-actions";

      soundButton = document.createElement("button");
      soundButton.type = "button";
      soundButton.className = "chatbot-sound-button";
      soundButton.setAttribute("aria-pressed", "false");

      header.insertBefore(headerActions, closeButton);
      headerActions.appendChild(soundButton);
      headerActions.appendChild(closeButton);

      soundButton.addEventListener("click", function () {
        voiceMode = !voiceMode;

        if (voiceMode) {
          discloseVoice();
        } else if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }

        updateVoiceControls();
      });
    }

    if (!SpeechRecognition) {
      voiceButton.classList.add("is-unsupported");
      voiceButton.title = "Voice input is not supported by this browser";
      voiceButton.addEventListener("click", function () {
        addMessage(
          "I can’t listen through this browser yet, but you can still type your question.",
          "bot",
          "bot-system-message"
        );
      });
      updateVoiceControls();
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-PH";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.addEventListener("start", function () {
      isListening = true;
      voiceMode = true;
      input.placeholder = "Listening…";
      discloseVoice();
      setLumoVisualizerState("listening");
      updateVoiceControls();
    });

    recognition.addEventListener("result", function (event) {
      let transcript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      input.value = transcript.trim();
      setLumoVisualizerState(
        "listening",
        Math.min(0.86, 0.42 + transcript.trim().length * 0.008)
      );

      if (finalTranscript.trim()) {
        window.setTimeout(function () {
          submitQuestion(finalTranscript);
        }, 120);
      }
    });

    recognition.addEventListener("end", function () {
      isListening = false;
      input.placeholder = "Ask about Luke's work...";
      setLumoVisualizerState(isReplying ? "thinking" : "idle");
      updateVoiceControls();
    });

    recognition.addEventListener("error", function (event) {
      isListening = false;
      input.placeholder = "Ask about Luke's work...";
      setLumoVisualizerState("idle");
      updateVoiceControls();

      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        addMessage(
          "I couldn’t access your microphone. Allow microphone permission or type your question instead.",
          "bot",
          "bot-system-message"
        );
      }
    });

    voiceButton.addEventListener("click", function () {
      if (isListening) {
        recognition.stop();
        return;
      }

      setChatOpen(true);

      try {
        recognition.start();
      } catch (error) {
        isListening = false;
        updateVoiceControls();
      }
    });

    updateVoiceControls();
  }

  function scrollMessages() {
    messages.scrollTop = messages.scrollHeight;
  }

  function addMessage(text, type, extraClass) {
    const message = document.createElement("div");
    message.className =
      "chat-message " +
      (type === "user" ? "user-message" : "bot-message") +
      (extraClass ? " " + extraClass : "");

    if (type !== "user") {
      const avatar = document.createElement("div");
      avatar.className = "chat-message-avatar lumo-message-avatar";
      avatar.innerHTML = '<span aria-hidden="true">L</span>';
      avatar.setAttribute("aria-label", "Lumo");
      message.appendChild(avatar);
    }

    const bubble = document.createElement("div");
    bubble.className = "chat-message-bubble";
    bubble.textContent = text;
    message.appendChild(bubble);

    messages.appendChild(message);
    scrollMessages();

    return message;
  }

  function addTypingIndicator() {
    window.clearTimeout(lumoTextAnimationTimer);

    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const typing = document.createElement("div");
    typing.className = "chat-message bot-message chatbot-typing-message";
    typing.innerHTML =
      '<div class="chat-message-avatar lumo-message-avatar" aria-label="Lumo"><span aria-hidden="true">L</span></div>' +
      '<div class="chat-message-bubble chatbot-typing" aria-label="Lumo is thinking">' +
      '<span></span><span></span><span></span></div>';

    messages.appendChild(typing);
    scrollMessages();
    setLumoVisualizerState("thinking");

    return typing;
  }

  function addAction(action) {
    if (!action || !action.label || !action.href) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "chatbot-inline-action";

    const link = document.createElement("a");
    link.href = action.href;
    link.className = "chatbot-action-link";
    link.innerHTML =
      '<span>' + action.label + '</span><i class="bi bi-arrow-right"></i>';

    if (action.external) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.addEventListener("click", function () {
        setChatOpen(false);
      });
    }

    wrapper.appendChild(link);
    messages.appendChild(wrapper);
    scrollMessages();
  }

  function getBotReply(question) {
    const text = normalizeQuestion(question);

    if (
      includesAny(text, [
        "who is luke",
        "who luke is",
        "tell me about luke",
        "about luke",
        "introduce luke"
      ])
    ) {
      return {
        messages: [
          "Luke Mark Leona is a Philippines-based web developer and digital partner who also works in data analytics, SEO, automation, design, and technical support.",
          "He combines practical development experience with business-focused problem solving."
        ],
        action: {
          label: "Meet Luke",
          href: homeSection("#about")
        }
      };
    }

    if (
      text.includes("coffee") ||
      includesAny(text, ["date with luke", "luke single", "is he single"])
    ) {
      return {
        messages: [
          "Luke is single and coffee-friendly. ☕ His professional rate starts at $6 per hour—so if that still sounds like a good coffee date, why not send him a message?"
        ],
        action: {
          label: "Ask Luke over coffee",
          href: homeSection("#contact")
        }
      };
    }

    if (
      includesAny(text, [
        "website cost",
        "website price",
        "website rate",
        "cost for a website",
        "cost of a website",
        "how much website",
        "how much each website",
        "price of site",
        "web design cost",
        "web development cost",
        "budget for website",
        "₱"
      ]) ||
      ((text.includes("cost") || text.includes("price") || text.includes("rate")) &&
        (text.includes("website") || text.includes("site")))
    ) {
      return {
        messages: [
          "Luke’s website projects generally range from ₱3,000 to ₱10,000, depending on the number of pages, design complexity, forms, integrations, content, and turnaround time.",
          "Share the type of website you need and Luke can give you a clearer estimate."
        ],
        action: {
          label: "Request a website quote",
          href: homeSection("#contact")
        }
      };
    }

    if (
      includesAny(text, [
        "hourly rate",
        "rate per hour",
        "per hour",
        "how much to hire luke",
        "luke rate",
        "luke charge"
      ])
    ) {
      return {
        messages: [
          "Luke’s professional rate starts at $6 per hour. A fixed project quote may be more suitable for websites or clearly defined deliverables.",
          "Send the scope, timeline, and budget through the Contact form for a precise quote."
        ],
        action: {
          label: "Discuss your project",
          href: homeSection("#contact")
        }
      };
    }

    if (
      includesAny(text, [
        "web development",
        "web developer",
        "develop website",
        "build website",
        "make website",
        "create website",
        "frontend",
        "front end",
        "wordpress"
      ])
    ) {
      return {
        messages: [
          "Luke can design and build responsive portfolio, business, landing-page, travel, construction, and event websites.",
          "His web work covers frontend development, UI implementation, mobile responsiveness, forms, basic integrations, performance, maintenance, and SEO foundations."
        ],
        action: {
          label: "View web projects",
          href: homeSection("#portfolio")
        }
      };
    }

    if (
      text.includes("hello") ||
      text.includes("hey") ||
      text === "hi" ||
      text.startsWith("hi ")
    ) {
      return {
        messages: [
          "Hi! I’m Lumo, Luke’s AI assistant. Great to meet you. 👋",
          "I can help you explore Luke’s projects, capabilities, rates, experience, or contact options."
        ]
      };
    }

    if (
      text.includes("which project") ||
      text.includes("project should") ||
      text.includes("recommend") ||
      text.includes("view first")
    ) {
      return {
        messages: [
          "For web work, start with Slow Pour, Lakbay Baguio, LayoutLetter, Cloud Chaser, or MeBS Construction.",
          "For analytics, the LET and Spending Behavior case studies show Luke’s data workflow and interpretation."
        ],
        action: {
          label: "Explore all projects",
          href: homeSection("#portfolio")
        }
      };
    }

    if (
      text.includes("lakbay") ||
      text.includes("baguio")
    ) {
      return {
        messages: [
          "Lakbay Baguio is a travel-planning web experience for discovering local places and creating a Baguio itinerary.",
          "It also includes a friendly emotional-support style guide that adds personality to the trip-planning experience."
        ],
        action: {
          label: "Open Lakbay Baguio",
          href: "preview/lakbaybaguio.com/index.html",
          external: true
        }
      };
    }

    if (text.includes("mebs") || text.includes("construction")) {
      return {
        messages: [
          "MeBS Construction is a modern company website built around engineering credibility, completed work, and clear client actions."
        ],
        action: {
          label: "Open MeBS Construction",
          href: "preview/mebsconstruction.com/index.html",
          external: true
        }
      };
    }

    if (text.includes("cloud") || text.includes("travel agency")) {
      return {
        messages: [
          "Cloud Chaser is a travel-agency website for browsing curated Philippine and Asian trips, itineraries, and trip requests."
        ],
        action: {
          label: "Open Cloud Chaser",
          href: "preview/cloudchaser.com/trips.html",
          external: true
        }
      };
    }

    if (text.includes("iskolar") || text.includes("student platform")) {
      return {
        messages: [
          "IskolarLink is a student information and coordination platform designed to simplify academic communication and digital workflows."
        ],
        action: {
          label: "Open IskolarLink",
          href: "preview/IskolarLink.com/IskolarLink-main/#/",
          external: true
        }
      };
    }

    if (
      text.includes("build") ||
      text.includes("capabilit") ||
      text.includes("capable") ||
      text.includes("service") ||
      text.includes("offer") ||
      text.includes("help me")
    ) {
      return {
        messages: [
          "Luke can help with web development, UI implementation, SEO, data analytics, automation, and ongoing technical support.",
          "The Resume section is interactive—tap Web, Design, SEO, Data, Automation, or Support to see a live example of each capability."
        ],
        action: {
          label: "Explore capabilities",
          href: homeSection("#resume")
        }
      };
    }

    if (
      text.includes("skill") ||
      text.includes("technology") ||
      text.includes("tech stack") ||
      text.includes("tool")
    ) {
      return {
        messages: [
          "Luke works with HTML, CSS, JavaScript, React, PHP, WordPress, Python, SQL, PL/SQL, Power BI, Tableau, SEO tools, and automation platforms.",
          "His strength is connecting those tools around one practical problem rather than treating them as separate skills."
        ],
        action: {
          label: "See the interactive resume",
          href: homeSection("#resume")
        }
      };
    }

    if (
      text.includes("data") ||
      text.includes("analytics") ||
      text.includes("dashboard") ||
      text.includes("report")
    ) {
      return {
        messages: [
          "Luke works with SQL, Python, Excel, Tableau, Power BI, reporting, dashboards, segmentation, forecasting, and practical business analysis.",
          "The LET and Spending Behavior projects are the best places to see that work."
        ],
        action: {
          label: "View data projects",
          href: homeSection("#portfolio")
        }
      };
    }

    if (
      text.includes("automation") ||
      text.includes("integration") ||
      text.includes("workflow")
    ) {
      return {
        messages: [
          "Luke builds and supports workflows that connect websites, data, marketing tools, and recurring business processes.",
          "Open the Automation capability in the Resume section to see the interactive demo."
        ],
        action: {
          label: "Open automation demo",
          href: homeSection("#resume")
        }
      };
    }

    if (
      text.includes("experience") ||
      text.includes("background") ||
      text.includes("career")
    ) {
      return {
        messages: [
          "Luke combines software-engineering work in warehouse systems with freelance web development, data analytics, technical VA work, and community leadership.",
          "That mix helps him understand both technical details and the real business goal behind a task."
        ],
        action: {
          label: "See experience",
          href: homeSection("#resume")
        }
      };
    }

    if (
      text.includes("hire") ||
      text.includes("start a project") ||
      text.includes("available") ||
      text.includes("freelance") ||
      text.includes("contact") ||
      text.includes("email")
    ) {
      return {
        messages: [
          "Luke is open to discussing freelance web, data, software, automation, and technical-support work.",
          "Share the goal, timeline, and current problem in the Contact section so he can respond with the right next step."
        ],
        action: {
          label: "Contact Luke",
          href: homeSection("#contact")
        }
      };
    }

    if (text.includes("resume") || text.includes("cv")) {
      return {
        messages: [
          "Luke’s downloadable CV is available from the main navigation and the mobile homepage."
        ],
        action: {
          label: "Open resume section",
          href: homeSection("#resume")
        }
      };
    }

    if (
      text.includes("work") ||
      text.includes("portfolio") ||
      text.includes("project") ||
      text.includes("sample")
    ) {
      return {
        messages: [
          "Luke’s portfolio includes six web projects, two data case studies, two content experiences, and a creative collection.",
          "All projects are visible by default, and you can still filter them by category."
        ],
        action: {
          label: "Explore the portfolio",
          href: homeSection("#portfolio")
        }
      };
    }

    return null;
  }

  function getSafeFallbackReply() {
    return {
      messages: [
        "I can help you with Luke’s services, project rates, web and data capabilities, portfolio, availability, and contact details.",
        "If you need something more specific, I can point you to Luke’s Contact form so he can answer personally."
      ],
      action: {
        label: "Contact Luke",
        href: homeSection("#contact")
      }
    };
  }

  async function getGeneratedReply(question) {
    if (
      aiUnavailable ||
      !window.fetch ||
      !aiEndpoint ||
      window.location.protocol === "file:"
    ) {
      return null;
    }

    const controller = window.AbortController ? new AbortController() : null;
    const timeout = window.setTimeout(function () {
      if (controller) {
        controller.abort();
      }
    }, 8000);

    try {
      const response = await window.fetch(aiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question,
          history: conversationHistory.slice(0, -1),
          page: window.location.pathname.split("/").pop() || "index.html"
        }),
        signal: controller ? controller.signal : undefined
      });

      if (!response.ok) {
        if (response.status === 404 || response.status === 405) {
          aiUnavailable = true;
        }

        return null;
      }

      const data = await response.json();
      const reply = typeof data.reply === "string" ? data.reply.trim() : "";

      if (!reply) {
        return null;
      }

      const generatedReply = {
        messages: [reply.slice(0, 600)],
        generated: true
      };

      if (/contact|quote|hire|message luke|coffee/i.test(reply)) {
        generatedReply.action = {
          label: "Contact Luke",
          href: homeSection("#contact")
        };
      }

      return generatedReply;
    } catch (error) {
      return null;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function deliverReply(reply) {
    const responseMessages = reply.messages || [];
    let delay = 0;

    responseMessages.forEach(function (messageText, index) {
      window.setTimeout(function () {
        addMessage(messageText, "bot", index > 0 ? "bot-follow-up" : "");
      }, delay);

      delay += 420;
    });

    if (reply.action) {
      window.setTimeout(function () {
        addAction(reply.action);
        if (voiceMode) {
          speakReply(responseMessages.join(" "));
        } else {
          animateLumoTextResponse(responseMessages.join(" "));
        }
        isReplying = false;
      }, delay + 80);
    } else {
      window.setTimeout(function () {
        if (voiceMode) {
          speakReply(responseMessages.join(" "));
        } else {
          animateLumoTextResponse(responseMessages.join(" "));
        }
        isReplying = false;
      }, delay);
    }
  }

  async function submitQuestion(question) {
    const cleanQuestion = question.trim();

    if (!cleanQuestion || isReplying) {
      return;
    }

    isReplying = true;
    addMessage(cleanQuestion, "user");
    rememberMessage("user", cleanQuestion);
    input.value = "";

    const typing = addTypingIndicator();
    const startedAt = Date.now();
    let reply = getBotReply(cleanQuestion);

    if (!reply) {
      reply = await getGeneratedReply(cleanQuestion);
    }

    if (!reply) {
      reply = getSafeFallbackReply();
    }

    const remainingDelay = Math.max(0, 520 - (Date.now() - startedAt));

    window.setTimeout(function () {
      typing.remove();
      rememberMessage("assistant", (reply.messages || []).join(" "));
      deliverReply(reply);
    }, remainingDelay);
  }

  toggle.addEventListener("click", function (event) {
    event.stopPropagation();
    setChatOpen(!panel.classList.contains("show"));
  });

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      setChatOpen(false);
    });
  }

  panel.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function () {
    if (panel.classList.contains("show")) {
      setChatOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panel.classList.contains("show")) {
      setChatOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      hideTeaser();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitQuestion(input.value);
  });

  document.querySelectorAll(".chatbot-quick-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      submitQuestion(this.getAttribute("data-question") || "");
    });
  });

  installLumoBranding();
  installVoiceControls();
  startTeaserLoop();

}

/*-------------------------  Color Panllet  -------------------------*/
function ColorPallet() {

    "use strict";

    $("ul.pattern .color1").click(function () {
        return $("#option-color").attr("href", "assets/colors/green.css")
    });
    $("ul.pattern .color2").click(function () {
        return $("#option-color").attr("href", "assets/colors/yellow.css")
    });
    $("ul.pattern .color3").click(function () {
        return $("#option-color").attr("href", "assets/colors/golden.css")
    });
    $("ul.pattern .color4").click(function () {
        return $("#option-color").attr("href", "assets/colors/sky-blue.css")
    });
    $("ul.pattern .color5").click(function () {
        return $("#option-color").attr("href", "assets/colors/blue.css")
    });
    $("ul.pattern .color6").click(function () {
        return $("#option-color").attr("href", "assets/colors/purple.css")
    });
    $("ul.pattern .color7").click(function () {
        return $("#option-color").attr("href", "assets/colors/orange.css")
    });
    $("ul.pattern .color8").click(function () {
        return $("#option-color").attr("href", "assets/colors/pink.css")
    });
    $("ul.pattern .color9").click(function () {
        return $("#option-color").attr("href", "assets/colors/red.css")
    });
    $("#color-switcher .pallet-button").click(function () {
        $("#color-switcher .color-pallet").toggleClass('show')
    })
}

/*-------------------------  Theme Option  -------------------------*/
function themeOption() {

    "use strict";

    var storageKey = "lukas-theme-preference-v2";
    var root = document.documentElement;
    var body = document.body;
    var themeSwitch = document.getElementById("themeModeSwitch");
    var isAnimating = false;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function storedTheme() {
      try {
        var saved = window.localStorage.getItem(storageKey);
        return saved === "light" || saved === "dark" ? saved : null;
      } catch (error) {
        return null;
      }
    }

    function saveTheme(theme) {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch (error) {
        // The switch still works when browser storage is unavailable.
      }
    }

    function updateControl(theme) {
      if (!themeSwitch) return;

      var isLight = theme === "light";
      themeSwitch.classList.toggle("is-light", isLight);
      themeSwitch.classList.toggle("is-dark", !isLight);
      themeSwitch.setAttribute("aria-checked", isLight ? "true" : "false");
      themeSwitch.setAttribute(
        "aria-label",
        isLight ? "Light mode active. Switch to dark mode" : "Dark mode active. Switch to light mode"
      );
    }

    function commitTheme(theme, persist) {
      root.setAttribute("data-theme", theme);
      body.setAttribute("data-theme", theme);
      body.classList.toggle("dark-arshia", theme === "dark");
      body.classList.toggle("light-arshia", theme === "light");
      updateControl(theme);
      if (persist) saveTheme(theme);
    }

    function transitionTheme(nextTheme) {
      if (isAnimating) return;

      var currentTheme = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      if (currentTheme === nextTheme) return;

      if (reduceMotion || !themeSwitch || typeof Element.prototype.animate !== "function") {
        commitTheme(nextTheme, true);
        return;
      }

      isAnimating = true;
      themeSwitch.classList.add("is-rolling");
      updateControl(nextTheme);

      var rect = themeSwitch.getBoundingClientRect();
      var originX = rect.left + rect.width / 2;
      var originY = rect.top + rect.height / 2;
      var farX = Math.max(originX, window.innerWidth - originX);
      var farY = Math.max(originY, window.innerHeight - originY);
      var radius = Math.ceil(Math.sqrt(farX * farX + farY * farY)) + 24;

      var curtain = document.createElement("div");
      curtain.className = "theme-transition-curtain theme-transition-to-" + nextTheme;
      curtain.style.setProperty("--theme-origin-x", originX + "px");
      curtain.style.setProperty("--theme-origin-y", originY + "px");
      document.body.appendChild(curtain);

      var reveal = curtain.animate(
        [
          { clipPath: "circle(0px at " + originX + "px " + originY + "px)", opacity: 1 },
          { clipPath: "circle(" + radius + "px at " + originX + "px " + originY + "px)", opacity: 1 }
        ],
        { duration: 760, easing: "cubic-bezier(.65,0,.25,1)", fill: "forwards" }
      );

      window.setTimeout(function () {
        commitTheme(nextTheme, true);
      }, 330);

      reveal.finished.then(function () {
        return curtain.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 220, easing: "ease", fill: "forwards" }
        ).finished;
      }).then(function () {
        curtain.remove();
        themeSwitch.classList.remove("is-rolling");
        isAnimating = false;
      }).catch(function () {
        commitTheme(nextTheme, true);
        curtain.remove();
        themeSwitch.classList.remove("is-rolling");
        isAnimating = false;
      });
    }

    var initialTheme = storedTheme() || "dark";
    commitTheme(initialTheme, false);

    if (themeSwitch) {
      themeSwitch.addEventListener("click", function () {
        var currentTheme = root.getAttribute("data-theme") === "light" ? "light" : "dark";
        transitionTheme(currentTheme === "light" ? "dark" : "light");
      });

      themeSwitch.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          transitionTheme("light");
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          transitionTheme("dark");
        }
      });
    }
}


/* =========================================================
   ABOUT SECTION
   Scroll reveal + animated metrics
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const aboutSection = document.querySelector("#about");

  if (!aboutSection) {
    return;
  }


  /* -----------------------------------------
     Respect reduced-motion preference
  ----------------------------------------- */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  const revealItems = aboutSection.querySelectorAll(
    ".about-reveal"
  );


  const metricNumbers = aboutSection.querySelectorAll(
    ".about-metric-number"
  );


  let metricsAnimated = false;



  /* -----------------------------------------
     Finalize counters immediately
     when motion is disabled
  ----------------------------------------- */

  function setFinalMetricValues() {

    metricNumbers.forEach(function (element) {

      const target = Number(
        element.dataset.target || 0
      );

      const suffix =
        element.dataset.suffix || "";

      element.textContent =
        target + suffix;

    });

  }


  if (reduceMotion) {

    revealItems.forEach(function (item) {

      item.classList.add(
        "is-visible"
      );

    });


    setFinalMetricValues();

    return;

  }



  /* Enable animation styles only after JS exists */

  aboutSection.classList.add(
    "about-animate-ready"
  );



  /* -----------------------------------------
     Counter animation
  ----------------------------------------- */

  function animateMetric(element) {

    const target = Number(
      element.dataset.target || 0
    );

    const suffix =
      element.dataset.suffix || "";

    const duration = 1200;

    const start =
      performance.now();


    function update(currentTime) {

      const progress = Math.min(
        (currentTime - start) / duration,
        1
      );


      /*
       * Ease-out cubic:
       * fast start, smooth finish
       */

      const eased =
        1 - Math.pow(
          1 - progress,
          3
        );


      const currentValue =
        Math.floor(
          target * eased
        );


      element.textContent =
        currentValue + suffix;


      if (progress < 1) {

        requestAnimationFrame(
          update
        );

      } else {

        element.textContent =
          target + suffix;

      }

    }


    requestAnimationFrame(
      update
    );

  }



  function animateAllMetrics() {

    if (metricsAnimated) {
      return;
    }


    metricsAnimated = true;


    metricNumbers.forEach(
      function (element, index) {

        window.setTimeout(
          function () {

            animateMetric(
              element
            );

          },

          index * 120
        );

      }
    );

  }



  /* -----------------------------------------
     Intersection observer
  ----------------------------------------- */

  if (
    !("IntersectionObserver" in window)
  ) {

    revealItems.forEach(
      function (item) {

        item.classList.add(
          "is-visible"
        );

      }
    );


    animateAllMetrics();

    return;

  }



  const revealObserver =
    new IntersectionObserver(

      function (entries, observer) {

        entries.forEach(
          function (entry) {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target.classList.add(
              "is-visible"
            );


            /*
             * Start metrics only when
             * the metrics row enters view
             */

            if (
              entry.target.classList.contains(
                "about-v2-metrics"
              )
            ) {

              animateAllMetrics();

            }


            observer.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -30px 0px"
      }

    );



  revealItems.forEach(
    function (item) {

      revealObserver.observe(
        item
      );

    }
  );

});

/* =========================================================
   INTERACTIVE RESUME
========================================================= */

function interactiveResume() {

    "use strict";


    var resumeSection =
        document.querySelector("#resume");

    if (!resumeSection) {
        return;
    }



    /* =====================================================
       1. CAPABILITY TABS
    ===================================================== */

    var serviceButtons =
        resumeSection.querySelectorAll(
            ".resume-capability-tab"
        );

    var servicePanels =
        resumeSection.querySelectorAll(
            ".resume-service-panel"
        );

    var interactionGuide =
        resumeSection.querySelector(
            "#resumeInteractionGuide"
        );

    var hasInteracted = false;

    function markResumeInteraction() {

        if (hasInteracted) {
            return;
        }

        hasInteracted = true;
        resumeSection.classList.add("resume-has-interacted");

        if (interactionGuide) {
            interactionGuide.classList.add("is-complete");

            window.setTimeout(function() {
                interactionGuide.setAttribute(
                    "aria-label",
                    "Capability selected. Choose another capability at any time."
                );
            }, 350);
        }

    }


    function activateService(serviceName, focusActiveTab) {

        serviceButtons.forEach(function(button) {

            var isActive =
                button.dataset.service === serviceName;

            button.classList.toggle(
                "active",
                isActive
            );

            button.setAttribute(
                "aria-selected",
                isActive ? "true" : "false"
            );

            button.setAttribute(
                "tabindex",
                isActive ? "0" : "-1"
            );

            if (isActive && focusActiveTab) {
                button.focus();
            }

        });


        servicePanels.forEach(function(panel) {

            var isActive =
                panel.dataset.servicePanel === serviceName;

            panel.classList.toggle(
                "active",
                isActive
            );

            panel.setAttribute(
                "aria-hidden",
                isActive ? "false" : "true"
            );

        });

    }


    serviceButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                markResumeInteraction();

                activateService(
                    button.dataset.service,
                    false
                );

            }
        );

    });



    serviceButtons.forEach(function(button, buttonIndex) {

        button.addEventListener(
            "keydown",
            function(event) {

                var targetIndex = null;

                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    targetIndex = (buttonIndex + 1) % serviceButtons.length;
                }

                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    targetIndex = (buttonIndex - 1 + serviceButtons.length) % serviceButtons.length;
                }

                if (event.key === "Home") {
                    targetIndex = 0;
                }

                if (event.key === "End") {
                    targetIndex = serviceButtons.length - 1;
                }

                if (targetIndex === null) {
                    return;
                }

                event.preventDefault();
                markResumeInteraction();

                activateService(
                    serviceButtons[targetIndex].dataset.service,
                    true
                );

            }
        );

    });



    /* =====================================================
       2. RESPONSIVE WEBSITE DEMO
    ===================================================== */

    var deviceButtons =
        resumeSection.querySelectorAll(
            ".resume-device-btn"
        );

    var browserDemo =
        resumeSection.querySelector(
            ".resume-browser"
        );


    if (browserDemo) {

        deviceButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    deviceButtons.forEach(
                        function(item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    browserDemo.classList.remove(
                        "device-desktop",
                        "device-tablet",
                        "device-mobile"
                    );


                    browserDemo.classList.add(
                        "device-" +
                        button.dataset.device
                    );

                }
            );

        });

    }



    /* =====================================================
       3. DESIGN BEFORE / AFTER
    ===================================================== */

    var designSlider =
        resumeSection.querySelector(
            ".resume-design-slider"
        );

    var designCompare =
        resumeSection.querySelector(
            ".resume-design-compare"
        );


    if (
        designSlider &&
        designCompare
    ) {

        function updateDesignComparison() {

            designCompare.style.setProperty(
                "--design-reveal",
                designSlider.value + "%"
            );

        }


        designSlider.addEventListener(
            "input",
            updateDesignComparison
        );


        updateDesignComparison();

    }



    /* =====================================================
       4. DATA DASHBOARD DEMO — DATA CAPABILITY ONLY
    ===================================================== */

    var dataDashboard = document.getElementById("resumeDataDashboard");
    var chartButtons = resumeSection.querySelectorAll(".data-demo-btn");

    var dashboardViews = {
      sales: {
        context: "Sales performance • monthly signal",
        labels: ["Revenue", "Orders", "Growth"],
        values: ["₱482K", "1,284", "18%"],
        trends: ["+18.4%", "+12.1%", "vs. previous period"],
        lineLabel: "REVENUE TREND",
        lineValue: "₱482K",
        linePeriod: "Jan — Jul",
        line: [132,116,126,82,94,50,62],
        bars: [34,52,44,71,62,86,76],
        barNames: ["Web","SEO","Email","Social","Direct","Paid","Referral"],
        barsLabel: "CHANNEL MIX",
        barsValue: "Conversion contribution",
        scatterLabel: "CUSTOMER CLUSTERS",
        scatterValue: "4 behavior groups",
        percentage: 76,
        percentageLabel: "Retention",
        insightTitle: "Returning customers drive stable growth.",
        insightText: "The strongest period combines repeat purchases with higher-value acquisition channels.",
        tags: ["EDA", "Trend analysis", "Dashboard"],
        legend: ["Loyal", "Growing", "At risk", "New"]
      },
      customers: {
        context: "Customer behavior • segment signal",
        labels: ["Customers", "Returning", "Retention"],
        values: ["1,284", "42%", "76%"],
        trends: ["+9.8%", "+6.2%", "+4.1 pts"],
        lineLabel: "ACTIVE CUSTOMERS",
        lineValue: "1,284",
        linePeriod: "7-month cohort",
        line: [138,124,101,110,76,66,42],
        bars: [62,48,72,55,84,69,91],
        barNames: ["New","Repeat","VIP","Dormant","Mobile","Web","Referral"],
        barsLabel: "SEGMENT SHARE",
        barsValue: "Behavior distribution",
        scatterLabel: "K-MEANS CLUSTERS",
        scatterValue: "High value vs. frequency",
        percentage: 68,
        percentageLabel: "Repeat rate",
        insightTitle: "A smaller loyal group contributes disproportionate value.",
        insightText: "Frequency and order value reveal four actionable customer segments for retention and targeting.",
        tags: ["K-Means", "Segmentation", "Cohorts"],
        legend: ["Champions", "Regular", "Occasional", "At risk"]
      },
      regions: {
        context: "Regional performance • geographic signal",
        labels: ["Regions", "Top Market", "Coverage"],
        values: ["8", "NCR", "74%"],
        trends: ["+2 areas", "31% share", "+8.0 pts"],
        lineLabel: "REGIONAL INDEX",
        lineValue: "74%",
        linePeriod: "coverage trend",
        line: [142,130,112,92,104,68,48],
        bars: [82,58,36,72,48,64,89],
        barNames: ["NCR","CAR","III","IV-A","VII","XI","XII"],
        barsLabel: "REGION SCORE",
        barsValue: "Relative performance",
        scatterLabel: "GEOGRAPHIC SIGNALS",
        scatterValue: "performance + reach",
        percentage: 74,
        percentageLabel: "Coverage",
        insightTitle: "Strong regions combine reach with consistent performance.",
        insightText: "Regional comparison exposes concentration, under-served areas, and where the next opportunity may be.",
        tags: ["Geographic analysis", "Comparisons", "Insights"],
        legend: ["High reach", "High value", "Emerging", "Opportunity"]
      }
    };

    var dataX = [18,82,146,210,274,338,402];

    function setText(id, value) {
      var element = document.getElementById(id);
      if (element) element.textContent = value;
    }

    function renderDataDashboard(viewName) {
      if (!dataDashboard || !dashboardViews[viewName]) return;

      var data = dashboardViews[viewName];
      dataDashboard.classList.remove("is-updating");
      void dataDashboard.offsetWidth;
      dataDashboard.classList.add("is-updating");

      setText("dataDashboardContext", data.context);
      setText("demoMetricOneLabel", data.labels[0]);
      setText("demoMetricTwoLabel", data.labels[1]);
      setText("demoMetricThreeLabel", data.labels[2]);
      setText("demoMetricOne", data.values[0]);
      setText("demoMetricTwo", data.values[1]);
      setText("demoMetricThree", data.values[2]);
      setText("demoMetricOneTrend", data.trends[0]);
      setText("demoMetricTwoTrend", data.trends[1]);
      setText("demoMetricThreeTrend", data.trends[2]);
      setText("dataLineLabel", data.lineLabel);
      setText("dataLineValue", data.lineValue);
      setText("dataLinePeriod", data.linePeriod);
      setText("dataBarsLabel", data.barsLabel);
      setText("dataBarsValue", data.barsValue);
      setText("dataScatterLabel", data.scatterLabel);
      setText("dataScatterValue", data.scatterValue);
      setText("dataPercentageValue", data.percentage + "%");
      setText("dataPercentageLabel", data.percentageLabel);
      setText("dataInsightTitle", data.insightTitle);
      setText("dataInsightText", data.insightText);

      var ring = document.getElementById("dataPercentageRing");
      if (ring) ring.style.setProperty("--percentage", data.percentage);

      var line = document.getElementById("dataDemoLine");
      var area = document.getElementById("dataDemoArea");
      var dots = document.getElementById("dataDemoDots");
      var points = data.line.map(function (y, index) {
        return dataX[index] + "," + y;
      }).join(" ");

      if (line) line.setAttribute("points", points);
      if (area) area.setAttribute("points", "18,164 " + points + " 402,164");
      if (dots) {
        dots.innerHTML = data.line.map(function (y, index) {
          return '<circle cx="' + dataX[index] + '" cy="' + y + '" r="5"></circle>';
        }).join("");
      }

      var bars = document.querySelectorAll("#dataDemoBars > span");
      bars.forEach(function (bar, index) {
        bar.style.setProperty("--bar-height", data.bars[index] + "%");
        var label = bar.querySelector("em");
        if (label) label.textContent = data.barNames[index];
      });

      var tags = document.getElementById("dataProjectLabels");
      if (tags) {
        tags.innerHTML = data.tags.map(function (tag) {
          return "<span>" + tag + "</span>";
        }).join("");
      }

      var legend = document.querySelectorAll("#dataScatterLegend span");
      legend.forEach(function (item, index) {
        var dot = item.querySelector("i");
        item.textContent = "";
        if (dot) item.appendChild(dot);
        item.appendChild(document.createTextNode(" " + data.legend[index]));
      });
    }

    chartButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        chartButtons.forEach(function (item) {
          var active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", active ? "true" : "false");
        });
        renderDataDashboard(button.dataset.chartView || "sales");
      });
    });

    renderDataDashboard("sales");


    /* =====================================================
       5. WEB VA TASK DEMO
    ===================================================== */

    var taskDemoButton =
        resumeSection.querySelector(
            ".resume-task-demo-btn"
        );

    var taskItems =
        resumeSection.querySelectorAll(
            ".support-task"
        );


    var taskDemoRunning = false;


    if (taskDemoButton) {

        taskDemoButton.addEventListener(
            "click",
            function() {

                if (taskDemoRunning) {
                    return;
                }


                taskDemoRunning = true;


                taskItems.forEach(
                    function(item) {

                        item.classList.remove(
                            "done"
                        );

                    }
                );


                taskDemoButton.innerHTML =
                    'Working... <i class="bi bi-arrow-repeat"></i>';


                taskItems.forEach(
                    function(item, index) {

                        window.setTimeout(
                            function() {

                                item.classList.add(
                                    "done"
                                );


                                if (
                                    index ===
                                    taskItems.length - 1
                                ) {

                                    window.setTimeout(
                                        function() {

                                            taskDemoButton.innerHTML =
                                                'Run Again <i class="bi bi-arrow-repeat"></i>';

                                            taskDemoRunning =
                                                false;

                                        },
                                        450
                                    );

                                }

                            },
                            index * 450
                        );

                    }
                );

            }
        );

    }



    /* =====================================================
       6. CLIENT PROBLEM SELECTOR
    ===================================================== */

    var problemButtons =
        resumeSection.querySelectorAll(
            ".resume-problem-btn"
        );


    var recommendationIcon =
        document.getElementById(
            "recommendationIcon"
        );

    var recommendationTitle =
        document.getElementById(
            "recommendationTitle"
        );

    var recommendationText =
        document.getElementById(
            "recommendationText"
        );

    var recommendationTags =
        document.getElementById(
            "recommendationTags"
        );


    var problemData = {

        website: {

            service: "web",

            icon: "bi-window",

            title:
                "Build a strong digital foundation",

            text:
                "Start with Web Development, then connect design, SEO, analytics and ongoing optimization based on what the business needs.",

            tags:
                [
                    "Web Development",
                    "Design",
                    "SEO"
                ]

        },


        visibility: {

            service: "seo",

            icon: "bi-search",

            title:
                "Make it easier for the right audience to find you",

            text:
                "Combine SEO, content structure, technical optimization and analytics to improve discoverability and understand what is working.",

            tags:
                [
                    "SEO",
                    "Content",
                    "Analytics"
                ]

        },


        data: {

            service: "data",

            icon: "bi-bar-chart",

            title:
                "Turn scattered information into clearer decisions",

            text:
                "Start with data cleaning and analysis, then build reporting or dashboards around the questions that matter most.",

            tags:
                [
                    "Data Analysis",
                    "Dashboards",
                    "Reporting"
                ]

        },


        automation: {

            service: "automation",

            icon: "bi-diagram-3",

            title:
                "Reduce repetitive work and connect the process",

            text:
                "Map the workflow first, identify unnecessary manual steps, then connect systems and automate where it creates practical value.",

            tags:
                [
                    "Automation",
                    "Integration",
                    "Workflow"
                ]

        },


        branding: {

            service: "design",

            icon: "bi-palette",

            title:
                "Create a clearer and more consistent digital identity",

            text:
                "Use design, brand consistency, website visuals and content structure to make the business easier to recognize and understand.",

            tags:
                [
                    "Design",
                    "Branding",
                    "Content"
                ]

        },


        support: {

            service: "support",

            icon: "bi-person-workspace",

            title:
                "Create one reliable workflow for ongoing digital needs",

            text:
                "Combine website updates, content, reporting, SEO, creative support and troubleshooting instead of managing every task separately.",

            tags:
                [
                    "Web Support",
                    "Content",
                    "Operations"
                ]

        }

    };


    function updateRecommendation(problemName) {

        var data =
            problemData[problemName];

        if (!data) {
            return;
        }


        activateService(
            data.service
        );


        if (recommendationIcon) {

            recommendationIcon.className =
                "bi " + data.icon;

        }


        if (recommendationTitle) {

            recommendationTitle.textContent =
                data.title;

        }


        if (recommendationText) {

            recommendationText.textContent =
                data.text;

        }


        if (recommendationTags) {

            recommendationTags.innerHTML =
                "";


            data.tags.forEach(
                function(tag) {

                    var span =
                        document.createElement(
                            "span"
                        );

                    span.textContent =
                        tag;


                    recommendationTags.appendChild(
                        span
                    );

                }
            );

        }

    }


    problemButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                problemButtons.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                updateRecommendation(
                    button.dataset.problem
                );

            }
        );

    });



    /* =====================================================
       7. EXPERIENCE TIMELINE
    ===================================================== */

    var careerButtons =
        resumeSection.querySelectorAll(
            ".career-point"
        );

    var careerPanels =
        resumeSection.querySelectorAll(
            ".career-detail"
        );


    careerButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                var careerName =
                    button.dataset.career;


                careerButtons.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                careerPanels.forEach(
                    function(panel) {

                        panel.classList.toggle(
                            "active",
                            panel.dataset.careerPanel ===
                            careerName
                        );

                    }
                );


                button.classList.add(
                    "active"
                );

            }
        );

    });



    /* =====================================================
       8. SCROLL REVEAL
    ===================================================== */

    var revealItems =
        resumeSection.querySelectorAll(
            ".resume-v2-reveal"
        );


    var reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reduceMotion) {

        revealItems.forEach(
            function(item) {

                item.classList.add(
                    "is-visible"
                );

            }
        );

        return;

    }


    resumeSection.classList.add(
        "resume-animate-ready"
    );


    if (
        !("IntersectionObserver" in window)
    ) {

        revealItems.forEach(
            function(item) {

                item.classList.add(
                    "is-visible"
                );

            }
        );

        return;

    }


    var revealObserver =
        new IntersectionObserver(

            function(entries, observer) {

                entries.forEach(
                    function(entry) {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {

                threshold: .08,

                rootMargin:
                    "0px 0px -20px 0px"

            }

        );


    revealItems.forEach(
        function(item) {

            revealObserver.observe(
                item
            );

        }
    );

}


/* =========================================================
   INTERACTIVE PORTFOLIO
========================================================= */

function interactivePortfolio() {

  "use strict";


  var portfolio =
    document.getElementById(
      "portfolio"
    );


  if (!portfolio) {

    return;

  }



  /* =====================================================
     PROJECT DATA FOR QUICK VIEW
  ===================================================== */

  var projects = {
    slowpour:{category:"WEB • 3D SCROLL EXPERIENCE",title:"Slow Pour — 3D Coffee Experience",summary:"An artistic coffee landing page where scrolling controls the visual progression of the drink and reveals a changing editorial story.",contribution:["Scroll-scrubbed coffee animation","Responsive desktop, tablet, and mobile layouts","Alternating editorial text choreography","Smooth motion and transition design"],stack:["HTML","CSS","JavaScript","Scroll Animation","Responsive UI"],links:[{label:"Open Experience",url:"/preview/CoffeeCup/index.html",external:true}]},
    fire:{category:"WEB • LMS • SEO",title:"Fire & Rescue Academy",summary:"A professional digital training platform for emergency-services education, course delivery, and online discoverability.",contribution:["Responsive website development","LMS course structure and delivery","SEO and content optimization","Technical troubleshooting"],stack:["WordPress","Tutor LMS","CSS","SEO"],links:[{label:"Visit Live",url:"https://fireandrescueacademy.com/",external:true}]},
    iskolar:{category:"WEB • PLATFORM",title:"IskolarLink",summary:"A student information and coordination platform that brings academic communication and workflows into one clearer environment.",contribution:["React front-end development","Information architecture","Responsive implementation","Academic workflow presentation"],stack:["React","JavaScript","UI Structure"],links:[{label:"Open Project",url:"preview/IskolarLink.com/IskolarLink-main/#/",external:true}]},
    corporate:{category:"WEB • CORPORATE",title:"Disaster Response & Training",summary:"A professional corporate website for a disaster-response and training organization.",contribution:["Website design and development","Responsive implementation","Content structure","Digital presence improvements"],stack:["WordPress","Responsive","Content"],links:[{label:"Visit Live",url:"https://conquerorscc.com/",external:true}]},
    lakbay:{category:"WEB • TRAVEL APP",title:"Lakbay Baguio",summary:"A Baguio itinerary experience with local discovery, trip planning, and a conversational emotional-support concept.",contribution:["Travel-focused UI","Interactive itinerary flow","Responsive front end","Conversational support concept"],stack:["HTML","CSS","JavaScript"],links:[{label:"Open Project",url:"preview/lakbaybaguio.com/index.html",external:true}]},
    mebs:{category:"WEB • CONSTRUCTION",title:"MeBS Construction",summary:"A modern construction-company website focused on engineering credibility and project presentation.",contribution:["Website repurposing","Industry-specific content adaptation","Responsive UI refinement","Brand interaction improvements"],stack:["HTML","CSS","JavaScript","UI/UX"],links:[{label:"Open Project",url:"preview/mebsconstruction.com/index.html",external:true}]},
    cloudchaser:{category:"WEB • TRAVEL",title:"Cloud Chaser",summary:"A polished travel-agency experience for curated Philippine and Asian trips.",contribution:["Travel website repurposing","Itinerary content structure","Responsive refinement","Conversion improvements"],stack:["HTML","CSS","JavaScript","Travel UX"],links:[{label:"Open Trips",url:"preview/cloudchaser.com/trips.html",external:true}]},
    layoutletter:{category:"AUTOMATION • CREATOR TOOL",title:"LayoutLetter",summary:"A visual newsletter builder for creators and businesses that makes campaign assembly faster and more approachable.",contribution:["Product interface concept","Visual builder workflow","Responsive front-end experience","Automation-oriented interaction design"],stack:["Automation","Newsletter","Builder","UI/UX"],links:[{label:"Open Project",url:"preview/LayoutLetter.com/index.html",external:true}]},
    mountain:{category:"WEB • TOURISM",title:"Discover Mountain Province",summary:"A destination website for exploring Mountain Province through places, stories, and trip ideas.",contribution:["Tourism content structure","Destination-focused visual system","Responsive implementation","Discovery pathways"],stack:["HTML","CSS","JavaScript","Tourism UX"],links:[{label:"Open Project",url:"preview/DiscoverMountainProvince.com/index.html",external:true}]},
    readystation:{category:"AUTOMATION • LMS",title:"ReadyStation LMS",summary:"A training platform built for first responders and the realities of fireground preparation.",contribution:["LMS product presentation","First-responder workflow framing","Responsive interface","Training-focused user experience"],stack:["LMS","Training","Automation","First Responders"],links:[{label:"Open Project",url:"preview/ReadyStation.com/index.html",external:true}]},
    let:{category:"DATA • EDUCATION ANALYTICS",title:"LET Performance Trends",summary:"An interactive analysis of LET performance, institutions, geography, demographics, and examination ratings.",contribution:["Data preparation","Trend and geographic analysis","Visualization","Interactive case study"],stack:["Python","Analytics","Visualization","Statistics"],links:[{label:"Explore Analysis",url:"let-performance-analysis.html",external:false}]},
    spending:{category:"DATA • CUSTOMER BEHAVIOR",title:"Spending Behavior Analysis",summary:"Customer segmentation, purchasing relationships, and future transaction forecasting.",contribution:["Exploratory analysis","K-Means segmentation","Apriori association analysis","ARIMA forecasting"],stack:["Python","Pandas","K-Means","Apriori","ARIMA"],links:[{label:"Explore Analysis",url:"customer-spending-analysis.html",external:false}]},
    campaign1:{category:"CONTENT • CAMPAIGN",title:"Campaign Landing Experience",summary:"A conversion-focused campaign experience combining content, implementation, and visual hierarchy.",contribution:["Front-end implementation","Campaign layout","Responsive styling","Content presentation"],stack:["HTML","CSS","JavaScript","Content"],links:[{label:"View Campaign",url:"http://paidmediasandbox.3jzvudtzb5-dv13xg0776gq.p.temp-site.link/luke/mood/v2-20off/v2startup.html",external:true}]},
    campaign2:{category:"CONTENT • INTERACTIVE",title:"Interactive Campaign Blog",summary:"A visual storytelling experience for interactive promotional content.",contribution:["Page development","Interactive behavior","Responsive styling","Campaign storytelling"],stack:["HTML","CSS","JavaScript"],links:[{label:"View Campaign",url:"https://va-0097.github.io/Mood/",external:true}]}
  };


  Object.assign(projects, {
    forma:{category:"WEB • ARCHITECTURE • MOTION",title:"FORMA — Architecture Studio",summary:"A cinematic architecture-studio experience where a residence assembles through scroll, supported by material-led storytelling and selected work.",contribution:["Scroll-led architectural storytelling","Video-scrubbed hero experience","Responsive gallery and studio presentation","Motion and interaction design"],stack:["HTML","CSS","JavaScript","Video","Motion"],links:[{label:"Open Project",url:"preview/FORMA-Architecture/index.html",external:true}]},
    amore:{category:"WEB • WEDDING INVITATION",title:"Terra Amore — Wedding Invitation",summary:"An editorial wedding invitation with ceremony details, RSVP, gallery moments, and a warm coastal visual story.",contribution:["Invitation experience design","Responsive ceremony and RSVP flow","Editorial gallery presentation","Custom motion and interaction details"],stack:["HTML","CSS","JavaScript","Responsive UI"],links:[{label:"Open Invitation",url:"preview/WeddingSite/Amore/index.html",external:true}]}
  });



  /* =====================================================
     QUICK VIEW DRAWER
  ===================================================== */

  var drawer =
    document.getElementById(
      "portfolioProjectDrawer"
    );


  var backdrop =
    document.getElementById(
      "portfolioDrawerBackdrop"
    );


  var closeButton =
    document.getElementById(
      "portfolioDrawerClose"
    );


  var category =
    document.getElementById(
      "portfolioDrawerCategory"
    );


  var title =
    document.getElementById(
      "portfolioDrawerTitle"
    );


  var summary =
    document.getElementById(
      "portfolioDrawerSummary"
    );


  var contribution =
    document.getElementById(
      "portfolioDrawerContribution"
    );


  var stack =
    document.getElementById(
      "portfolioDrawerStack"
    );


  var actions =
    document.getElementById(
      "portfolioDrawerActions"
    );

    /* =====================================================
   MOVE PROJECT DETAILS UI TO <body>
===================================================== */

/*
 * #portfolio lives inside the custom-scrolling
 * section system.
 *
 * Fixed elements inside transformed/custom-scroll
 * containers can create their own stacking context.
 *
 * Moving the drawer and backdrop directly under <body>
 * guarantees that they sit above:
 *
 * - right sidebar
 * - chatbot
 * - navigation arrows
 * - portfolio content
 */

if (
  backdrop &&
  backdrop.parentNode !== document.body
) {

  document.body.appendChild(
    backdrop
  );

}


if (
  drawer &&
  drawer.parentNode !== document.body
) {

  document.body.appendChild(
    drawer
  );

}


  function openPortfolioDrawer(
    projectKey
  ) {

    var project =
      projects[projectKey];


    if (
      !project ||
      !drawer
    ) {

      return;

    }


    category.textContent =
      project.category;


    title.textContent =
      project.title;


    summary.textContent =
      project.summary;



    /* Contribution */

    contribution.innerHTML =
      "";


    project.contribution.forEach(
      function (item) {

        var row =
          document.createElement(
            "div"
          );


        row.textContent =
          item;


        contribution.appendChild(
          row
        );

      }
    );



    /* Stack */

    stack.innerHTML =
      "";


    project.stack.forEach(
      function (item) {

        var tag =
          document.createElement(
            "span"
          );


        tag.textContent =
          item;


        stack.appendChild(
          tag
        );

      }
    );



    /* Actions */

    actions.innerHTML =
      "";


    project.links.forEach(
      function (link) {

        var anchor =
          document.createElement(
            "a"
          );


        anchor.href =
          link.url;


        anchor.innerHTML =
          link.label +
          ' <i class="bi bi-arrow-up-right"></i>';


        if (
          link.external
        ) {

          anchor.target =
            "_blank";

          anchor.rel =
            "noopener noreferrer";

        }


        actions.appendChild(
          anchor
        );

      }
    );


    document.body.classList.add(
  "portfolio-details-open"
);


    drawer.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style
      .overflow =
      "hidden";

  }



  function closePortfolioDrawer() {

    document.body.classList.remove(
  "portfolio-details-open"
);


    if (drawer) {

      drawer.setAttribute(
        "aria-hidden",
        "true"
      );

    }


    document.body.style
      .overflow =
      "";

  }



  portfolio
    .querySelectorAll(
      ".portfolio-quick-view-btn"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            openPortfolioDrawer(
              button.dataset.project
            );

          }
        );

      }
    );



  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closePortfolioDrawer
    );

  }


  if (backdrop) {

    backdrop.addEventListener(
      "click",
      closePortfolioDrawer
    );

  }


  document.addEventListener(
    "keydown",
    function (event) {

      if (
  event.key === "Escape" &&
  document.body.classList.contains(
    "portfolio-details-open"
  )
) {

        closePortfolioDrawer();

      }

    }
  );


/* =====================================================
   CLICKABLE PROJECT MEDIA + FOLLOW-CURSOR LABEL
===================================================== */

portfolio
  .querySelectorAll(
    ".portfolio-v2-media"
  )
  .forEach(
    function (media) {

      var label =
        media.querySelector(
          ".portfolio-hover-label"
        );


      /*
       * Find the real project link that already exists
       * inside the project's card.
       *
       * Web projects:
       *   .portfolio-card-icon-link
       *
       * Featured project:
       *   .portfolio-browser-live / .portfolio-live-btn
       */
      var projectContainer =
        media.closest(
          ".portfolio-v2-card, .portfolio-featured"
        );


      var projectLink =
        projectContainer
          ? projectContainer.querySelector(
              ".portfolio-card-icon-link, " +
              ".portfolio-browser-live, " +
              ".portfolio-live-btn"
            )
          : null;



      /* -----------------------------------------
         Make the whole visual behave like a link
      ----------------------------------------- */

      if (projectLink) {

        media.setAttribute(
          "role",
          "link"
        );

        media.setAttribute(
          "tabindex",
          "0"
        );

        media.setAttribute(
          "aria-label",
          projectLink.getAttribute(
            "aria-label"
          ) || "Open project"
        );


        function openProject() {

          /*
           * Use the existing anchor so:
           *
           * target="_blank" stays respected
           * internal case-study links work normally
           */
          projectLink.click();

        }


        media.addEventListener(
          "click",
          function (event) {

            /*
             * Do not trigger twice if the visitor
             * clicked an actual link/button inside.
             */
            if (
              event.target.closest(
                "a, button"
              )
            ) {

              return;

            }


            openProject();

          }
        );


        media.addEventListener(
          "keydown",
          function (event) {

            if (
              event.key === "Enter" ||
              event.key === " "
            ) {

              event.preventDefault();

              openProject();

            }

          }
        );

      }



      /* -----------------------------------------
         Follow-cursor label
      ----------------------------------------- */

      if (!label) {

        return;

      }


      media.addEventListener(
        "mousemove",
        function (event) {

          var rect =
            media.getBoundingClientRect();


          var x =
            event.clientX -
            rect.left;


          var y =
            event.clientY -
            rect.top;


          label.style.left =
            x + "px";


          label.style.top =
            y + "px";

        }
      );

    }
  );

  /* =====================================================
     FEATURED PROJECT SUBTLE 3D TILT
  ===================================================== */

  var featuredVisual =
    portfolio.querySelector(
      ".portfolio-featured-visual"
    );


  var featuredBrowser =
    portfolio.querySelector(
      ".portfolio-browser-shell"
    );


  if (
    featuredVisual &&
    featuredBrowser &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    featuredVisual.addEventListener(
      "mousemove",
      function (event) {

        var rect =
          featuredVisual
            .getBoundingClientRect();


        var x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;


        var y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;


        var rotateY =
          (x - .5) * 3;


        var rotateX =
          (.5 - y) * 3;


        featuredBrowser.style
          .transform =
          "rotateX(" +
          rotateX +
          "deg) rotateY(" +
          rotateY +
          "deg)";

      }
    );


    featuredVisual.addEventListener(
      "mouseleave",
      function () {

        featuredBrowser.style
          .transform =
          "rotateX(0deg) rotateY(0deg)";

      }
    );

  }
/* =====================================================
   FULL CREATIVE GALLERY
   12 WORKS INCLUDING MOTION
===================================================== */

var creativeGalleryButton =
  document.getElementById(
    "openCreativeGallery"
  );


var creativeGalleryTriggers =
  portfolio.querySelectorAll(
    ".creative-gallery-trigger"
  );


/*
 * Complete Creative Collection
 *
 * 01 = GIF
 * 02 = MP4 motion
 * 03-09 = Graphics
 * 10-12 = Additional visual work
 */

var creativeGalleryItems = [

  {
    src:
      "assets/img/webdesigner/graphic1.gif",

    type:
      "image",

    title:
      "Creative Work 01"
  },


  {
    src:
      "#creativeVideo02",

    type:
      "inline",

    title:
      "Creative Work 02 — Motion"
  },


  {
    src:
      "assets/img/webdesigner/graphic3.png",

    type:
      "image",

    title:
      "Creative Work 03"
  },


  {
    src:
      "assets/img/webdesigner/graphic4.png",

    type:
      "image",

    title:
      "Creative Work 04"
  },


  {
    src:
      "assets/img/webdesigner/graphic5.png",

    type:
      "image",

    title:
      "Creative Work 05"
  },


  {
    src:
      "assets/img/webdesigner/graphic6.png",

    type:
      "image",

    title:
      "Creative Work 06"
  },


  {
    src:
      "assets/img/webdesigner/graphic7.png",

    type:
      "image",

    title:
      "Creative Work 07"
  },


  {
    src:
      "assets/img/webdesigner/graphic8.png",

    type:
      "image",

    title:
      "Creative Work 08"
  },


  {
    src:
      "assets/img/webdesigner/graphic9.png",

    type:
      "image",

    title:
      "Creative Work 09"
  },


  {
    src:
      "assets/img/webdesigner/img1.png",

    type:
      "image",

    title:
      "Creative Work 10"
  },


  {
    src:
      "assets/img/webdesigner/img2.png",

    type:
      "image",

    title:
      "Creative Work 11"
  },


  {
    src:
      "assets/img/webdesigner/img3.png",

    type:
      "image",

    title:
      "Creative Work 12"
  },

  {
    src:
      "#creativeVideoCafely",

    type:
      "inline",

    title:
      "Cafely Promo Video — AI Generated"
  }

];



function pauseCreativeVideos() {

  document
    .querySelectorAll(
      ".creative-video-popup video"
    )
    .forEach(
      function (video) {

        video.pause();

      }
    );

}



function openCreativeGallery(
  startIndex
) {

  $.magnificPopup.open(

    {

      items:
        creativeGalleryItems,


      gallery: {

        enabled:
          true,

        navigateByImgClick:
          true,

        preload:
          [0, 2],

        tPrev:
          "Previous work",

        tNext:
          "Next work",

        tCounter:
          "%curr% of %total%"

      },


      image: {

        titleSrc:
          function (item) {

            return (
              item.data.title ||
              ""
            );

          }

      },


      mainClass:
        "mfp-fade creative-gallery-popup",


      removalDelay:
        250,


      callbacks: {

        change:
          function () {

            pauseCreativeVideos();

          },


        close:
          function () {

            pauseCreativeVideos();

          }

      }

    },

    startIndex || 0

  );

}



/* Main CTA */

if (creativeGalleryButton) {

  creativeGalleryButton.addEventListener(
    "click",
    function () {

      openCreativeGallery(
        0
      );

    }
  );

}



/* Mosaic preview items */

creativeGalleryTriggers.forEach(
  function (trigger) {

    trigger.addEventListener(
      "click",
      function () {

        var index =
          Number(
            trigger.dataset
              .galleryIndex || 0
          );


        openCreativeGallery(
          index
        );

      }
    );

  }
);
}


/* =========================================================
   INTERACTIVE BLOG / JOURNAL
========================================================= */

function interactiveBlog() {

  "use strict";


  var blog =
    document.getElementById(
      "blog"
    );


  if (!blog) {

    return;

  }



  /* =====================================================
     ELEMENTS
  ===================================================== */

  var filterButtons =
    blog.querySelectorAll(
      ".blog-filter-btn"
    );


  var featuredArticle =
    blog.querySelector(
      ".blog-featured-article"
    );


  var articleCards =
    blog.querySelectorAll(
      ".blog-v2-card"
    );


  var interestButtons =
    blog.querySelectorAll(
      ".blog-interest-item"
    );


  var resultLabel =
    document.getElementById(
      "blogResultsLabel"
    );



  /* =====================================================
     FILTER
  ===================================================== */

  function applyBlogFilter(
    category
  ) {


    /* -----------------------------------------
       Filter buttons
    ----------------------------------------- */

    filterButtons.forEach(
      function (button) {

        button.classList.toggle(

          "active",

          button.dataset.blogFilter ===
            category

        );

      }
    );



    /* -----------------------------------------
       Featured article
    ----------------------------------------- */

    if (featuredArticle) {

      var featuredCategory =
        featuredArticle.dataset
          .blogCategory;


      var showFeatured =
        category === "all" ||
        category ===
          featuredCategory;


      featuredArticle.classList.toggle(

        "blog-filter-hidden",

        !showFeatured

      );


      if (showFeatured) {

        featuredArticle.classList.remove(
          "blog-filter-showing"
        );


        /*
         * Force a reflow so animation
         * can replay.
         */

        void featuredArticle
          .offsetWidth;


        featuredArticle.classList.add(
          "blog-filter-showing"
        );

      }

    }



    /* -----------------------------------------
       Journal cards
    ----------------------------------------- */

    var visibleCount =
      featuredArticle &&
      (
        category === "all" ||
        category === "web"
      )
        ? 1
        : 0;


    articleCards.forEach(
      function (card) {

        var cardCategory =
          card.dataset
            .blogCategory;


        var showCard =
          category === "all" ||
          cardCategory === category;


        card.classList.toggle(

          "blog-filter-hidden",

          !showCard

        );


        if (showCard) {

          visibleCount++;


          card.classList.remove(
            "blog-filter-showing"
          );


          void card.offsetWidth;


          card.classList.add(
            "blog-filter-showing"
          );

        }

      }
    );



    /* -----------------------------------------
       Result label
    ----------------------------------------- */

    if (resultLabel) {

      if (
        category === "all"
      ) {

        resultLabel.textContent =
          "Showing all 4 insights";

      } else {

        var categoryLabels = {

          web:
            "web & digital strategy",

          data:
            "data & analytics",

          seo:
            "SEO & digital growth",

          career:
            "career & community"

        };


        resultLabel.textContent =
          "Showing " +
          visibleCount +
          " insight about " +
          categoryLabels[category];

      }

    }

  }



  /* =====================================================
     FILTER BUTTON EVENTS
  ===================================================== */

  filterButtons.forEach(
    function (button) {

      button.addEventListener(

        "click",

        function () {

          applyBlogFilter(
            button.dataset.blogFilter
          );

        }

      );

    }
  );



  /* =====================================================
     EXPLORE BY INTEREST
  ===================================================== */

  interestButtons.forEach(
    function (button) {

      button.addEventListener(

        "click",

        function () {

          var category =
            button.dataset.blogInterest;


          applyBlogFilter(
            category
          );


          /*
           * Bring the visitor back
           * to the filtered journal.
           */

          var filterArea =
            blog.querySelector(
              ".blog-v2-filter-wrap"
            );


          if (filterArea) {

            filterArea.scrollIntoView({

              behavior:
                "smooth",

              block:
                "start"

            });

          }

        }

      );

    }
  );



  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  var revealItems =
    blog.querySelectorAll(
      ".blog-v2-reveal"
    );


  var reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reduceMotion) {

    revealItems.forEach(
      function (item) {

        item.classList.add(
          "is-visible"
        );

      }
    );


    return;

  }



  blog.classList.add(
    "blog-animate-ready"
  );



  if (
    !(
      "IntersectionObserver"
      in window
    )
  ) {

    revealItems.forEach(
      function (item) {

        item.classList.add(
          "is-visible"
        );

      }
    );


    return;

  }



  var observer =
    new IntersectionObserver(

      function (
        entries,
        revealObserver
      ) {

        entries.forEach(
          function (entry) {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target
              .classList.add(
                "is-visible"
              );


            revealObserver
              .unobserve(
                entry.target
              );

          }
        );

      },

      {

        threshold:
          .08,

        rootMargin:
          "0px 0px -20px 0px"

      }

    );



  revealItems.forEach(
    function (item) {

      observer.observe(
        item
      );

    }
  );



  /* Initial state */

  applyBlogFilter(
    "all"
  );

}

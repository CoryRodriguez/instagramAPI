//POPULAR;
var popularFeed = new Instafeed({
  get: "user",
  // Cory User
  // userId: "291620298",
  // Nathan User
  userId: "187893483",
  //clientId: "abbb3e57a4bd4046a18aa5fac34b4699",
  clientId: "a8662e1269904ed8a840e977b03de83f",
  limit: 12,
  resolution: "standard_resolution",
  // Old Access
  // accessToken: "291620298.1677ed0.d40e37107a6b4e23b8f21aae39cf09f7",
  // New Access
  accessToken: "187893483.1677ed0.b995334459bf4a48bf15d08de8cf264f",
  sortBy: "most-liked",
  template: `<div class="col-md-3 col-sm-6 instaimg">
              <a href="{{image}}" title="{{caption}}" target="_blank">
                <img src="{{image}}" alt="{{caption}}" class="img-fluid"/>
              </a>
            </div>`
});
popularFeed.run();

$(".gallery").magnificPopup({
  type: "image",
  delegate: "a",
  gallery: {
    enabled: true
  }
});

// Smooth Scroll
/*
* Fixed Navbar Scrolling
* Github: https://github.com/ts-de/bootstrap4-fixed-navbar
*/

// init nav object from dom
var nav = $("nav");
// get heigth of the nav
var navHeight = nav.outerHeight();

// click-trigger
$('a[href*="#"]:not([href="#"])').click(function(event) {
  scrollToSection(this);
  event.preventDefault();
});

// scroll-trigger
$(document).scroll(function() {
  activateCurrentSection();
});

// get target position and scrolls to it
function scrollToSection(self) {
  // get the target href
  var href = $(self).attr("href");

  // get the target position
  var targetPos = $(href).offset().top - navHeight + 5;

  // scroll to target
  $("html, body").animate(
    {
      scrollTop: targetPos
    },
    400
  );
}

/*
* Updates active section on scroll
*/
// scroll-trigger
$(document).scroll(function() {
  activateCurrentSection();
});

/*
* Updates active section on scroll
*/
function activateCurrentSection() {
  var id; // init the id of the element that will be activated

  // get all sections
  var sections = $(".section");

  // store current position on the page when scroll is triggered
  var pos = $(document).scrollTop();

  /*
  * Exception: if last section is <100% of the screen height
  * make it active when 50% of it is visible.
  * Otherwise the last section would never activate.
  */
  var lastSection = sections[sections.length - 1]; // get last section
  var lastSectionTooSmall = $(lastSection).height() < $(window).height();

  if (lastSectionTooSmall) {
    var lastSectionTopPos = $(lastSection).offset().top;
    // lastSectionTriggerPos is true if 50% of the last section is visible
    var lastSectionTriggerPos =
      $(window).height() +
      $(document).scrollTop() -
      $(lastSection).height() / 2;
    var lastSectionInView = lastSectionTriggerPos > lastSectionTopPos;
  }

  if (lastSectionTooSmall && lastSectionInView) {
    id = $(lastSection).attr("id");
  } else {
    // else last section is >= 100% of the view check all sections to find the top one
    sections.each(function() {
      var top = $(this).offset().top - navHeight; // get the top & bottom position of the section
      var bottom = top + $(this).outerHeight();

      /*
      * if the current position is higher (deeper on the page) than the top of the section
      * and it is smaller (heiger on the page) than the bottom of the section
      * it is the active section.
      */
      if (pos >= top && pos <= bottom) {
        id = $(this).attr("id"); // store the id of this section
      }
    });
  }

  /*
   if an id was set before, activate the section in the nav
   */
  if (id) {
    nav.find("a").removeClass("active");
    nav.find('a[href="#' + id + '"]').addClass("active");
  }
}

// Close navbar on click
$(function() {
  var navMain = $(".navbar-collapse"); // avoid dependency on #id
  // "a:not([data-toggle])" - to avoid issues caused
  // when you have dropdown inside navbar
  navMain.on("click", "a:not([data-toggle])", null, function() {
    navMain.collapse("hide");
  });
});

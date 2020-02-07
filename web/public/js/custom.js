jQuery(document).ready(function($) {
  //For Pretty Photo Validation
  $("a[data-rel]").each(function() {
    $(this).attr("rel", $(this).data("rel"));
  });

  //HOME BANNER SLIDER
  if ($("#home-banner").length) {
    $("#home-banner").bxSlider({
      infiniteLoop: false,
      auto: true,
      hideControlOnEnd: true,
      speed: 3000,
      pause: 10000
    });
  }

  //Audio
  if ($("audio").length) {
    $("audio").audioPlayer();
  }

  $("#search-box-form").hide();
  //Search Area Function on Header
  $("a.btn-search").click(function() {
    $("#search-box-form").toggle("slide");
  });
  $("a.crose").click(function() {
    $("#search-box-form").toggle("slide");
  });
  //Next Event Countdown on Heared
  const endDate = async () => {
    try {
      const timer = await fetch(
        "https://admin.molitvabg.org/timer/endDate",
        {}
      );
      const timerResponse = await timer.json();
      return {
        date: timerResponse.date,
        time: timerResponse.time
      };
    } catch (error) {
      console.log(error);
    }
  };

  const date = async () => {
    const days = await endDate();
    const time = days.time.split(":");
    const day = days.date.split("-");
    //const day = new Date(days.date).getUTCDate();
    const newDate = new Date(day[0], day[1] - 1, day[2], time[0], time[1]);

    if ($(".countdown").length) {
      $(".countdown").final_countdown({
        start: parseInt(new Date().getTime() / 1000),
        end: parseInt(newDate / 1000),
        now: parseInt(new Date().getTime() / 1000)
      });
    }
  };
  date();

  //Parallax Effect
  $(window).stellar();

  //Latest Event Contdown
  if ($(".defaultCountdown").length) {
    var austDay = new Date();
    austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
    $(".defaultCountdown").countdown({
      until: austDay
    });
    $("#year").text(austDay.getFullYear());
  }

  //Home Timelines Slider
  if ($("#timelines-slider").length) {
    $("#timelines-slider").bxSlider({
      pagerCustom: "#bx-pager"
    });
  }

  if ($("#footer-tweet").length) {
    $("#footer-tweet").bxSlider({
      mode: "fade",
      auto: true,
      captions: true
    });
  }

  //Timeline Page Slider
  if ($(".timeline-page-slider").length) {
    $(".timeline-page-slider").bxSlider({
      pagerCustom: "#bx-pager"
    });
  }

  //Blog Post Page Slider
  if ($("#post-slider").length) {
    $("#post-slider").bxSlider({
      mode: "fade",
      autoControls: true
    });
  }

  //Content Slider Home page
  if ($("#slider1").length) {
    var image_array = new Array();
    image_array = [
      {
        image: "content/our_team/1.jpg",
        link_url: "content/our_team/1big.jpg"
        //link_rel: 'prettyPhoto'
      },
      // image for the first layer, goes with the text from id="sw0"
      {
        image: "content/our_team/2.jpg",
        link_url: "content/our_team/2big.jpg"
        //link_rel: 'prettyPhoto'
      },
      // image for the second layer, goes with the text from id="sw1"
      {
        image: "content/our_team/3.jpg",
        link_url: "content/our_team/3big.jpg"
        //link_rel: 'prettyPhoto'
      },
      // image for the third layer, goes with the text from id="sw2"
      {
        image: "content/our_team/4.jpg",
        link_url: "content/our_team/4big.jpg"
        //link_rel: 'prettyPhoto'
      },
      // ...
      {
        image: "content/our_team/5.jpg",
        link_url: "content/our_team/5big.jpg"
        //link_rel: 'prettyPhoto'
      },
      {
        image: "content/our_team/6.jpg",
        link_url: "content/our_team/6big.jpg",
        link_rel: "prettyPhoto"
      },
      {
        image: "content/our_team/7.jpg",
        link_url: "content/our_team/7big.jpg"
        //link_rel: 'prettyPhoto'
      }
    ];
    $("#slider1").content_slider({
      // bind plugin to div id="slider1"
      map: image_array, // pointer to the image map
      max_shown_items: 7, // number of visible circles
      hv_switch: 0, // 0 = horizontal slider, 1 = vertical
      active_item: 0, // layer that will be shown at start, 0=first, 1=second...
      wrapper_text_max_height: 450, // height of widget, displayed in pixels
      middle_click: 1, // when main circle is clicked: 1 = slider will go to the previous layer/circle, 2 = to the next
      under_600_max_height: 1200, // if resolution is below 600 px, set max height of content
      border_radius: -1, // -1 = circle, 0 and other = radius
      automatic_height_resize: 1,
      border_on_off: 0,
      allow_shadow: 0
    });
  }

  //Pretty Photo
  if ($(".gallery").length) {
    $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({
      animation_speed: "normal",
      theme: "light_square",
      slideshow: 3000,
      autoplay_slideshow: true
    });
    $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({
      animation_speed: "fast",
      slideshow: 10000,
      hideflash: true
    });
  }
  //Masonry Gallery
  if ($("#container").length) {
    $("#container").BlocksIt({
      numOfCol: 4,
      offsetX: 15,
      offsetY: 15
    });
  }

  //Color Switcher
  if ($(".slide-out-div").length) {
    $(".slide-out-div").tabSlideOut({
      tabHandle: ".handle", //class of the element that will be your tab
      pathToTabImage: "images/gear.png", //path to the image for the tab (optionaly can be set using css)
      imageHeight: "40px", //height of tab image
      imageWidth: "40px", //width of tab image
      tabLocation: "left", //side of screen where tab lives, top, right, bottom, or left
      speed: 300, //speed of animation
      action: "click", //options: 'click' or 'hover', action to trigger animation
      topPos: "189px", //position from the top
      fixedPosition: false //options: true makes it stick(fixed position) on scroll
    });
  }
  //Google Map on Event Page
  if ($("#map_contact_1").length) {
    var map;
    var myLatLng = new google.maps.LatLng(48.85661, 2.35222);
    //Initialize MAP
    var myOptions = {
      zoom: 12,
      center: myLatLng,
      //disableDefaultUI: true,
      zoomControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      styles: [
        {
          saturation: -100,
          lightness: 10
        }
      ]
    };
    map = new google.maps.Map(
      document.getElementById("map_contact_1"),
      myOptions
    );
    //End Initialize MAP
    //Set Marker
    var marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      icon: "images/map-icon.png"
    });
    marker.getPosition();
    //End marker

    //Set info window
    var infowindow = new google.maps.InfoWindow({
      content: "",
      position: myLatLng
    });
    infowindow.open(map);
  }

  //Tab Active Function
  if ($(".accordion-body").length) {
    $(".accordion-body").on("show", function(e) {
      $(e.currentTarget)
        .parent()
        .find(".accordion-heading")
        .addClass("active");
    });

    $(".accordion-body").on("hide", function(e) {
      $(e.currentTarget)
        .parent()
        .find(".accordion-heading")
        .removeClass("active");
    });
  }

  //Flexslider forOru Project
  if ($("#flexiselDemo1").length) {
    $("#flexiselDemo1").flexisel({
      visibleItems: 3,
      animationSpeed: 1000,
      autoPlay: false,
      autoPlaySpeed: 3000,
      pauseOnHover: true,
      enableResponsiveBreakpoints: true,
      responsiveBreakpoints: {
        portrait: {
          changePoint: 480,
          visibleItems: 1
        },
        landscape: {
          changePoint: 640,
          visibleItems: 2
        },
        tablet: {
          changePoint: 768,
          visibleItems: 3
        }
      }
    });
  }

  //Event Timer Home Page
  if ($("#DateCountdown").length) {
    $("#DateCountdown").TimeCircles();
  }

  //Function End
});

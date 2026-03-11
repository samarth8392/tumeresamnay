// Simple accordion functionality
function toggleAccordion(id) {
  const content = document.getElementById(id);
  const allContents = document.querySelectorAll('.accordion-content');

  // Close all other accordion items
  allContents.forEach(item => {
    if (item.id !== id) {
      item.classList.add('hidden');
    }
  });

  // Toggle current item
  content.classList.toggle('hidden');
}

(function ($) {

  "use strict";

  //search pop
  var searchPopup = function() { 
    // open search box
    $('#header-nav').on('click', '.search-button', function(e) {
      $('.search-popup').toggleClass('is-visible');
    });

    $('#header-nav').on('click', '.btn-close-search', function(e) {
      $('.search-popup').toggleClass('is-visible');
    });
    
    $(".search-popup-trigger").on("click", function(b) {
        b.preventDefault();
        $(".search-popup").addClass("is-visible"),
        setTimeout(function() {
            $(".search-popup").find("#search-popup").focus()
        }, 350)
    }),
    $(".search-popup").on("click", function(b) {
        ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
        $(this).removeClass("is-visible"))
    }),
    $(document).keyup(function(b) {
        "27" === b.which && $(".search-popup").removeClass("is-visible")
    })
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }
  
  $(document).ready(function () {

    searchPopup();    
    initChocolat();
    
    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      //autoplay: true,
      loop: true,
      spaceBetween: 20,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,
    });

    var large_slider = new Swiper(".product-large-slider", {
      //autoplay: true,
      loop: true,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });

    $(".youtube").colorbox({
      iframe: true,
      innerWidth: 960,
      innerHeight: 585
    });

    /* Video */
    // var $videoSrc;  
    //   $('.play-btn').click(function() {
    //     $videoSrc = $(this).data( "src" );
    //   });

    //   $('#myModal').on('shown.bs.modal', function (e) {

    //   $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
    // })

    // $('#myModal').on('hide.bs.modal', function (e) {
    //   $("#video").attr('src',$videoSrc); 
    // })
    


  });

  window.addEventListener("load", (event) => {
    // Initialize Isotope
    var $container = $('.isotope-container').isotope({
      // options
      itemSelector: '.item',
      layoutMode: 'masonry'
    });

    //active button
    $('.filter-button').click(function () {
      $('.filter-button').removeClass('active');
      $(this).addClass('active');
    });

    // Filter items on button click
    $('.filter-button').click(function () {
      var filterValue = $(this).attr('data-filter');
      if (filterValue === '*') {
        // Show all items
        $container.isotope({ filter: '*' });
      } else {
        // Show filtered items
        $container.isotope({ filter: filterValue });
      }
    });

  });

})(jQuery);

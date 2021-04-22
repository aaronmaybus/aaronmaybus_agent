//collapse the navbar upon selection from hamburger menu
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});
function makeNavSticky(){
  if ($(document).scrollTop() > 200) { 
    $('.navbar-default').addClass('smaller');

  } else {
    $('.navbar-default').removeClass('smaller');
  } 
}
function hoverPackages(){
  if($(window).width() > 991){
    $('.package_link').hover(
      function() {
        $(".package_link").not(this).addClass("fade_out");
      },
       function() {
        $(".package_link").not(this).removeClass("fade_out");
      },
    );
  }
}
function selectPackages(){
  $('.package_link').click(function(){
      $(this).addClass('make_center');
      $(".package_link").not(this).addClass("fade_out_permanent");
      $(".package_link").not(this).removeClass("make_center");
  });
}
function bindVelocity(){
  // bind click event to all internal page anchors
  $('a[href*="#"]').on('click', function (e) {
  var target = $(this).attr('href');
  // If the target is not empty
    if(target != '#'){
    e.preventDefault();
    e.stopPropagation();
    // set target to anchor's "href" attribute
    if(target == "#package-dj") {
        $("#message").val("Hi, I'm interested in the DJ package. ");    
        target = "#contact";  
        setTimeout(function(){
          $( "#name" ).focus();
        }, 1200);  
    }
    if(target == "#package-sax") {
        $("#message").val("Hi, I'm interested in the DJ + Sax package. ");    
        target = "#contact";  
        setTimeout(function(){
          $( "#name" ).focus();
        }, 1200);  
    }
    if(target == "#package-singer") {
        $("#message").val("Hi, I'm interested in the DJ + Singer package. ");    
        target = "#contact";  
        setTimeout(function(){
          $( "#name" ).focus();
        }, 1200);  
    }
    // scroll to each target
      $(target).velocity("scroll", { 
        duration: 1000,
        offset: -55
      });
    }
  });
}
function truncateInstagramPostString(){
  var html_before_tags;
  $('.j-message p').each(function(){
    html_before_tags = $(this).html().split('<br>•')[0];
    $(this).html(html_before_tags);
  });
}
function listenForJuicerClick(){
  $('.j-paginate').click(function(){
    // Poll Instagram posts load to remove text every 100ms
    var poll_load = setInterval(function(){
      truncateInstagramPostString();
      // Re-attach the event listener to any new elements
      listenForJuicerClick();
    }, 100);
    // Stop interval polling after 1.5 seconds
    setTimeout(function(){
      clearTimeout(poll_load);
    }, 1500)
  });
  $(document).click(function(){
    setTimeout(function(){
      truncateInstagramPostString();
    }, 10)
  });
}

function bubbleButtonAnim(){
  var ofs, x, y;
  $('.btn-animated').on('mouseenter', function(e){
    ofs = $(this).offset();
    x = (e.pageX - ofs.left);
    y = (e.pageY - ofs.top);
    var name = $(this).text().toLowerCase().split(' ')[0];
      
    $(this).append('<div class="blob ' + name + '" style="left:' + x + 'px; top: ' + y + 'px;"></div>');
      
    var blob = $(this).find('.blob');
    setTimeout(function(){
        blob.addClass("expand");
    },20);
  });
  $('.btn-animated').on('mouseleave', function(e){
    ofs = $(this).offset();
    x = (e.pageX - ofs.left);
    y = (e.pageY - ofs.top);
    var blob = $(this).find('.blob');
    blob.css({'left':x, 'top':y});
    blob.removeClass("expand");
    setTimeout(function(){
        blob.remove();
    },800);
  });
}
$(window).scroll(function() {
  makeNavSticky();
});
$(window).resize(function () {
  // Remove the fade_out class from any of the package links
  // in case they were hovered when the resize occurred
  $(".package_link").removeClass("fade_out");
});
Pace.restart();
Pace.on("done", function(){

  // Allow scrolling
  $('body').removeClass('no_scroll');
  var y = $(window).scrollTop();  //your current y position on the page
  $('.pace').addClass('disappear');
  $('.loading').addClass("disappear");

  // Only show main text banner after loading complete
  $('.title-main').css('display', 'block');
});
$(document).ready(function () {
  bindVelocity();
  hoverPackages();
  selectPackages();
  makeNavSticky();
  bubbleButtonAnim();
  $('.center').slick({
    centerPadding: '60px',
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: false
    autoplay: true,
    autoplaySpeed: 4000
  });


  $('body').scrollspy({
    target: '#topnav',
    offset: 50
  });
  setTimeout(function(){
    truncateInstagramPostString();
  }, 400);
  setTimeout(function(){
    $('.parallax').paroller({
      factor: '0.2',
      type: 'foreground',
      direction: 'vertical'
    }); 
    truncateInstagramPostString();
    listenForJuicerClick();
  }, 2000);
  
  var theDate = new Date(); 
  $(".year").text(theDate.getFullYear());
});
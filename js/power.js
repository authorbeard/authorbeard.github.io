var body=$('body')
var titleBar = $('.title-group, .post-title')
var navBar = $('nav')

/*====================================
=            DOM IS READY            =
====================================*/
$(function() {
    $('.pagination .active a').click(function() {
        return false;
    });

    centerLanding();
});


/*========================================
=            WINDOW IS LOADED            =
========================================*/
$(window).load(function() {

  if (body.attr('class') == 'category-blog'){   
    setPostTop()
    $('h1 a').attr('href', '/hamwater')
  }

  if (body.attr('class') == 'code'){
    $('.version-details i').click(function(){
      $(this).toggleClass('fa-plus-square-o fa-minus-square-o')
      $(this).parent().siblings().first().slideToggle()
    })

    $('.nav-arrow').click(function(){
      $('.title-group').slideToggle("slow", function(){
        $('body').animate({scrollTop: 0}, 0)
        $('nav.navbar').show()
        $('.code-portfolio').css('margin-top', '45px')
      })
    })
  }

  if (body.attr('class') == 'resume'){
// debugger;

    $('.print').click(function(){
      // $(body)
      //   .css('font-size', '1.25em')
      //   .css('margin', 0);
      // $('.col-xs-2').css('width', '15%');
      // $('.col-xs-10').css('width', '85%');
debugger;
      
      window.print();
    })
  }
});


/*=========================================
=            WINDOW IS RESIZED            =
=========================================*/
$(window).resize(function() {
  centerLanding()

});


/*==========================================
=            WINDOW IS SCROLLED            =
==========================================*/
$(window).scroll(function() {

  if (body.hasClass('category-blog')){
    if (body.scrollTop() >= 25){
      setHamwater()
    }
    if (document.body.scrollTop === 0){
      titleBar.each(function(){ 
        this.style = ''
      })
    }
  }
});


function centerLanding (){
  if (body.hasClass('landing')){
      var mainTop = Math.floor(($(window).height() - $('.landing-nav').height()) / 2)
      $('main').css('top', mainTop)
    }
}

var setPostTop = function(){
  var topperHeight = $('.topper').height();
  var pdHeight = $('.post-details').height();
  var containerPost = $('.container.post');

  containerPost.css("top", (pdHeight-topperHeight));
};

var setHamwater=function(){
    titleBar.first().css({'top':'-37px', 'position':'fixed', 'width':'100%'})
    titleBar.last().css('margin-top', '100px')
} 

/*==========================================
=      CODE PROJECT TECH LIST TOGGLE       =
==========================================*/





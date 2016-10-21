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



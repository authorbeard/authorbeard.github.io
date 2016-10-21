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
  console.log(body.scrollTop())

  if (body.hasClass('category-blog')){
    if (body.scrollTop() >= 25){
      console.log("whut")
      setHamwater()
    }
    if (document.body.scrollTop === 0){
      debugger;
    //   titleBar.each(function(){ 
    //     this.style.cssText=""
    //   })
    //   navBar.style.cssText=""
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
    navBar.css('z-index', 0)

  // titleBar[0].style.cssText="top: -37px; position: fixed; width:100%; z-index:1100"
  // titleBar[1].style.cssText="margin-top: 100px;"
  // navBar.style.cssText="opacity: 0; transition: ease-in-out;"
} 



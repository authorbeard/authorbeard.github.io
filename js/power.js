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

  var titleBar = $('.title-group, .post-title')
  switch ($('body').attr('class')){   
    case 'blog':
      $('.title-group, .post-title').children('aside').remove() 
      break;
    case 'category-blog':
      setPostTop()
      break;

  }

  // setPostTop()
  // setHamwater()

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

  if ($('body').hasClass('category-blog')){
    if (document.body.scrollTop >= 25){
      setHamwater()
    }
    if (document.body.scrollTop === 0){
      titleBar.forEach(function(div){ 
        div.style.cssText=""
      })
      navBar.style.cssText=""
    }
  }

});


function centerLanding (){
  if ($('body').hasClass('landing')){
      var mainTop = Math.floor(($(window).height() - $('.landing-nav').height()) / 2)
      $('main').css('top', mainTop)
    }
}

var setPostTop = function(){
debugger;
  var navBar = $('nav')
  var topperHeight = $('.topper').height();
  var pdHeight = $('.post-details').height();
  var containerPost = $('.container.post');



  console.log("topperHeight:" + topperHeight);
  console.log("pdHeight:" + pdHeight);
  containerPost.css("top", (pdHeight-topperHeight));
};

var setHamwater=function(){

  // titleBar[0].style.cssText="top: -37px; position: fixed; width:100%; z-index:1100"
  // titleBar[1].style.cssText="margin-top: 100px;"
  // navBar.style.cssText="opacity: 0; transition: ease-in-out;"
} 



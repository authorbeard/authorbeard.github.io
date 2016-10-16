/*====================================
=            DOM IS READY            =
====================================*/
$(function() {
    $('.pagination .active a').click(function() {
        return false;
    });
});


/*========================================
=            WINDOW IS LOADED            =
========================================*/
$(window).load(function() {
  var aside = document.querySelector('aside')
  var titleBar = document.querySelectorAll('.title-group, .post-title')
  var navBar = document.querySelector('nav')
  var tgHeight = document.querySelector('.title-group').clientHeight
  var pdHeight = document.querySelector('.post-details').clientHeight
  var containerPost = document.querySelector('.container.post')
  function setPostTop(){
    containerPost.style.cssText = "top: " + (tgHeight+pdHeight-30) + "px;"
  }
  setPostTop()


  var setHamwater=function(){
    // debugger;
    titleBar[0].style.cssText="top: -37px; position: fixed; width:100%; z-index:1100"
    titleBar[1].style.cssText="margin-top: 100px;"
    navBar.style.cssText="opacity: 0; transition: ease-in-out;"
  } 

  window.setTimeout(function(){ 
    if (document.body.className==' category-blog'){
      titleBar[0].removeChild(aside)
    }
  })

  document.addEventListener('scroll', function(){
    if (document.body.className==' category-blog'){
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
  })
});


/*=========================================
=            WINDOW IS RESIZED            =
=========================================*/
$(window).resize(function() {

});


/*==========================================
=            WINDOW IS SCROLLED            =
==========================================*/
$(window).scroll(function() {

});




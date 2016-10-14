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
  var titleBar = document.querySelector('.title-group')
  var setHamwater=function(){
    titleBar.style.cssText="top: -37px; position: fixed; width:100%; z-index:1100"
  } 

  window.setTimeout(function(){ 
    if (document.body.className==' category-blog'){
      titleBar.removeChild(aside)
    }
  })

  document.addEventListener('scroll', function(){
    if (document.body.className==' category-blog'){
      if (document.body.scrollTop != 0){
        setHamwater()
      }
      if (document.body.scrollTop === 0){
        titleBar.style.cssText=""
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




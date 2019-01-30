

//materialize javascript effects
$(document).ready(function(){
  $('.tap-target').tapTarget('open');
  
  $('.dropdown-trigger').dropdown();
  
  $('textarea#textarea2').characterCounter();
  
  $('textarea#description').characterCounter();
  
  $('textarea#company_description').characterCounter();
  
  $('select').formSelect();

    $('.all-category').click(function(){
      $(".hidden-category").toggle();
    })

    $('.collapsible').collapsible();

    $('.sidenav').sidenav();

});


  

   


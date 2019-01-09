$('.dropdown-trigger').dropdown();

$(document).ready(function(){
  $('.tap-target').tapTarget('open');
});

   $(document).ready(function() {
    $('textarea#textarea2').characterCounter();
  });
  
  $(document).ready(function() {
    $('textarea#description').characterCounter();
  });
  
  $(document).ready(function() {
    $('textarea#company_description').characterCounter();
  });
  $(document).ready(function(){
    $('select').formSelect();
  });

   
  $('.all-category').click(function(){
    $(".hidden-category").toggle();
  })

  $(document).ready(function(){
    $('.collapsible').collapsible();
  });

//  $(document).ready(function() {
//   $('select').material_select();

//   // for HTML5 "required" attribute
//   $("select[required]").css({
//     display: "inline",
//     height: 0,
//     padding: 0,
//     width: 0
//   });
// });


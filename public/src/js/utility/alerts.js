$(document).ready(function(){
  
$('#alert_close').click(function(){
    $( "#alert_box" ).hide();
  });

  $(' .dropdown-content').on('click', function(event) {
    event.stopPropagation();
  });


    $('.tooltipped').tooltip();
  });
        
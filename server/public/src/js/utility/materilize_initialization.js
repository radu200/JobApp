

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
    

  
  
    var year = new Date("01, 01, 1980 00:00:00")
    
    $('.datepicker').datepicker({
      closeOnSelect: true,
      firstDay: 1,
      yearRange: 40,
      minDate:new Date("01, 01, 1980 00:00:00"),
      maxDate:new Date(),
      i18n: {
        cancel: 'Anuleaza',
        done: 'Ok',
        previousMonth: '‹',
        nextMonth: '›',
        months: [
          'Ian',
          'Feb',
          'Mart',
          'Apr',
          'Mai',
          'Iun',
          'Iul',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec'
        ],
        monthsShort: [
          'Ian',
          'Feb',
          'Mart',
          'Apr',
          'Mai',
          'Iun',
          'Iul',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec'
        ],
        weekdays: ['Duminica', 'Luni', 'Marti', 'Miercuri', 'JOi', 'Vineri', 'Sambata'],
        weekdaysShort: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa'],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
      },
    });
  
   

  
});


  

   


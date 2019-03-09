

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
    

  
  
    $('.datepicker').datepicker({
      closeOnSelect: true,
      format: "dd/mm/yyyy",  
      firstDay: 1,
      maxYear: new Date().getFullYear(),
      yearRange: 39,
   
      i18n: {
        cancel: 'Anuleaza',
        done: 'Ok',
        previousMonth: '‹',
        nextMonth: '›',
        months: [
          'Ianuarie',
          'Februarie',
          'Martie',
          'Aprilie',
          'Mai',
          'Iunie',
          'Iulie',
          'August',
          'Septembrie',
          'Octombrie',
          'Noiembrie',
          'Decembrie'
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


  

   


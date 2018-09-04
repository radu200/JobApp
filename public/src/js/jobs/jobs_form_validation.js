
//category
$('#job_add_form').on('submit', function (event) {
    event.stopPropagation();
    if($('input[name=category]:checked').length<=0)
    {
        $('.category-error').text('Te rog alege categoria')
        return false;
    }else{
        return true;
    }
})

//employment type
$('#job_add_form').on('submit', function (event) {
    event.stopPropagation();
    if($('input[name=employment_type]:checked').length<=0)
    {
        $('.employement_type-error ').text('Te rog alege tipul de angajare')
        return false;
    }else{
        return true;
    }
})

//experience
$('#job_add_form').on('submit', function (event) {
    event.stopPropagation();
    if($('input[name=experience]:checked').length<=0)
    {
        $('.experience-error ').text('Te rog alege experienta')
        return false;
    }else{
        return true;
    }
})

//position
$('#job_add_form').on('submit', function (event) {
    event.stopPropagation();
    let position = $('#position').val().replace(/\s{2,}/g, ' ');;
    console.log(position)
    if (position === "") {
        $('.position-error').text('Te rog  compleateaza inputul pozitie')
        return false
    } else if (!/^[a-zA-Z]*$/g.test(position) ){
        $('.position-error').text('Te rog nu include cifre,mail sau url')
         return false;
    } else {
        return true;
    }

})




//description
$('#job_add_form').on('submit', function (event) {
    event.stopPropagation();
    let description = $('#description').val().replace(/\s{2,}/g, ' ');

    console.log(description)
    if (description === "") {
        $('.description-error').text('Te rog  compleateaza descrierea')
        return false;
        ///validation no numbers
    } else if (!/^[a-zA-Z]*$/g.test(description) ){
        $('.description-error').text('Te rog nu include cifre,mail sau url ')
        return false;
    } else {
        return true;
    }

})


//city
$('#job_add_form').on('submit', function (event) {
    event.stopPropagation();
    let city = $('#city').val();
    if (city === "") {
        $('.city-error').text('Te rog  unde este localizat jobul')
        return false
    } else {
        return true;
    }

})

//salary
$('#job_add_form').on('submit', function (event) {
    event.stopPropagation();

     let salary = $('#salary').val();
     console.log(salary.length)
      if(salary.length > 8){
          $('.error-salary').text('Salariu nu poate fi mai mare de 8 cifre')
          return false;
      }else{
          return true;
      }

})




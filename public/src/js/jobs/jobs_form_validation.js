import { retry } from "rxjs/operator/retry";

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
    let position = $('#position').val();
    if (position === "") {
        $('.position-error').text('Te rog  compleateaza inputul pozitie')
        return false
    } else {
        return true;
    }

})

//description
$('#job_add_form').on('submit', function (event) {
    event.stopPropagation();
    let description = $('#description').val();
    if (description === "") {
        $('.description-error').text('Te rog  compleateaza descrierea')
        return false
    } else {
        return true;
    }

})

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

// $('#job_add_form').on('submit', function (event) {
//     event.stopPropagation();

//      let salary = $('#salary').val();
//     if (salary != "" ){

//         $('.currency-error').text('Te rog  alege valuta')
//         return false;
      
//     }  

// })


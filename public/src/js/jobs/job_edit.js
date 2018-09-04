
// //category
$('#job_edit_form').on('submit', function (event) {
    event.stopPropagation();
    if($('#category_edit').is(':checked').length<=0)
    {
        $('.category_error_edit').text('Te rog alege categoria')
        return false;
    }else{
        return true;
    }
})

//employment type
$('#job_edit_form').on('submit', function (event) {
    event.stopPropagation();
    if($('#employment_type_edit').is('checked').length <=0 )
    {
        $('.employement_type_error_edit ').text('Te rog alege tipul de angajare')
        return false;
    }else{
        return true;
    }
})

//experience
$('#job_edit_form').on('submit', function (event) {
    event.stopPropagation();
    if($('#experience_edit').is(':checked').length<=0)
    {
        $('.experience-error-edit ').text('Te rog alege experienta')
        return false;
    }else{
        return true;
    }
})

//position
$('#job_edit_form').on('submit', function (event) {
    event.stopPropagation();
    let position = $('#position_edit').val().replace(/\s{2,}/g, ' ');;
    console.log(position)
    if (position === "") {
        $('.position-error_edit').text('Te rog  compleateaza inputul pozitie')
        return false
    } else if (!/^[a-zA-Z]*$/g.test(position) ){
        $('.position-error_edit').text('Te rog nu include cifre,mail sau url')
         return false;
    } else {
        return true;
    }

})




//description
$('#job_edit_form').on('submit', function (event) {
    event.stopPropagation();
    let description = $('#description_edit').val().replace(/\s{2,}/g, ' ');

    console.log(description)
    if (description === "") {
        $('.description_error_edit').text('Te rog  compleateaza descrierea')
        return false;
        ///validation no numbers
    } 
    
    
    //   else if (!/^[a-zA-Z]*$/g.test(description) ){
    //     $('.description-error').text('Te rog nu include cifre,mail sau url ')
    //     return false;
    // }
    
    else {
        return true;
    }
})



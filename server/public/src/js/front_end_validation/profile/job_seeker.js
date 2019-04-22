$('#employee_info_form').on('submit', function (event) {
    event.stopPropagation();
    if ($('.categoryExperience').val() === '') {
        $('.categoryExperience-error').text('Alegeti categoria jobului .')
        return false;
    }
})

///edit experience validation form
$('#employee_edit_experience').on('submit', function(event){
    event.stopPropagation();
    if($('.startDate').val() === ''){
        $('.startDateError').text('Va rugam sa alege-ti data')
        return false;
    }
})

$('#employee_edit_experience').on('submit', function(event){
    event.stopPropagation();
    if($('.endDate').val() === ''){
        $('.endDateError').text('Va rugam sa alege-ti data')
        return false;
    }
})


///Add experience validation form
$('#employee_add_experience').on('submit', function(event){
    event.stopPropagation();
    if($('.startDate').val() === ''){
        $('.startDateError').text('Va rugam sa alege-ti data')
        return false;
    }
})

$('#employee_add_experience').on('submit', function(event){
    event.stopPropagation();
    if($('.endDate').val() === ''){
        $('.endDateError').text('Va rugam sa alege-ti data')
        return false;
    }
})

$('#employee_add_experience').on('submit', function(event){
    event.stopPropagation();
    if($('.startDate').val() > $('.startDate').val()){
        $('.endDateError').text('Va rugam sa alege-ti data corecta')
        return false;
    }
})
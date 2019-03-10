$('#employee_info_form').on('submit', function (event) {
    event.stopPropagation();
    if ($('.categoryExperience').val() === '') {
        $('.categoryExperience-error').text('Alegeti categoria jobului .')
        return false;
    }
})

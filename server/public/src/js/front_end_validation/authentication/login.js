$('#login-form').on('submit', function (event) {
    event.stopPropagation();
    let email = $('#email-login').val();

    if (email === '') {
        $('.errorEmailLogin').text('Va rugam sa introduce-ti emailul .')
        return false;
    }
})

$('#login-form').on('submit', function (event) {
    event.stopPropagation();
    let password = $('#password-login').val();

    if (password === '') {
        $('.errorPasswordLogin').text('Va rugam sa introduce-ti parola .')
        return false;
    } else if( password.length > 50){
        $('.errorPasswordLogin').text('Ati depasit lungimea  parolei.')
        return false;
    }
})
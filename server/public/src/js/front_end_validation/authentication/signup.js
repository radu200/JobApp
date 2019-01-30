$(document).ready(function(){
    //employer signup
$('.password').keyup(function(){

    if($('#psw-employer-signup').val() == $('#confirm-psw-employer').val()){
       $('#cmd-employer').css({color:'green'})
       $('#cmd-employer').html("Parolele se potrivesc")
    }else {
        $('#cmd-employer').css({color:'red'})
       $('#cmd-employer').html("Parolele nu se potrivesc")
    }
})
$('#signup-employer').on('submit', function (event) {

if (grecaptcha.getResponse() == ""){
    $('.captchError').text('Te rog selecteaza Captcha de mai jos.')
    return false;
     } 
  })


  //signup jobseeker
  $('.password').keyup(function(){

    if($('#psw-jobseeker-signup').val() == $('#confirm-psw-jobseeker').val()){
       $('#cmd-jobseeker').css({color:'green'})
       $('#cmd-jobseeker').html("Parolele se potrivesc")
    }else {
        $('#cmd-jobseeker').css({color:'red'})
       $('#cmd-jobseeker').html("Parolele nu se potrivesc")
    }
})
$('#signup-jobseeker').on('submit', function (event) {

if (grecaptcha.getResponse() == ""){
    $('.captchError').text('Te rog selecteaza Captcha de mai jos.')
    return false;
     } 
  })
 })
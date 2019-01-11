
	
	
function _(el){
	return document.getElementById(el);
}

$("#job_image_edit_form").on("submit",function(event){
	event.preventDefault();
    // alert('hello')
	var jobForm = $('#job_image_edit_form');
	var jobId =  jobForm.attr('data_job_id');
	
	//console.log(file.name+" | "+file.size+" | "+file.type)
	// //  alert(file.name+" | "+file.size+" | "+file.type);
   
	var formdata = new FormData();
	
	let imageInput =  $('#job_image_edit');
	if(imageInput.val() === ''){
		$('.job_image_edit_error').text('Te rog alege imagine')
		return false;
	}
	
	//size validation
	 let file = _("job_image_edit").files[0];
       if(file.size > 5e+6 ){
			//alert("image is too big")
	     $(".job_image_edit_error").text('Imagine nu trebuie sa fie mai mare de 5mb');
		
		return false;
      }
		
		//append input
    formdata.append("job_image_edit", file );
	 
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST",` /job_image/edit/${jobId}`, true);
	xhr.upload.addEventListener("progress", progressHandlerImageEdit, false)
	xhr.addEventListener("load", completeHandlerImageEdit, false);
	xhr.addEventListener("error", errorHandlerImageEdit, false);
	xhr.addEventListener("abort", abortHandlerImageEdit, false);

	xhr.send(formdata);
	

});
function progressHandlerImageEdit(event){
	// _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
	 let percent = (event.loaded / event.total) * 100;
	 console.log(percent)
      _("progressBarEdit").style.width = percent + "%";
	 // _("statusd").innerHTML = Math.round(percent)+"% uploaded";
	
}
function completeHandlerImageEdit(event){
	window.location.href="/my_jobs" 
    
	 // _("statusd").innerHTML = event.target.responseText;
	 //_('post_job').reset();
	
}
function errorHandlerImageEdit(event){

	//  _("status").innerHTML = "Upload Failed";
}
function abortHandlerImageEdit(event){
	//  _("status").innerHTML = "Upload Aborted";
}







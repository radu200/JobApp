(function(){
	
	
function _(el){
	return document.getElementById(el);
}

_("job_image_edit_form").addEventListener("submit",function(event){
	event.preventDefault();
    // alert('hello')
   var jobForm = _('job_image_edit_form');
   var jobId =  jobForm.getAttribute('data-job_id');
   var file = _("job_image_edit").files[0];
     
     //console.log(file.name+" | "+file.size+" | "+file.type)
    // //  alert(file.name+" | "+file.size+" | "+file.type);

  var formdata = new FormData();

	//file input validation
	if(file === undefined){
	   file = 0;
	} 
	else if(file.size > 5e+6 ){
		//alert("image is too big")
		_("job_image_error").innerHTML = 'image too big, max 5 mb';
	  
		return false;
	}
	
    //append input
	formdata.append("job_image_edit", file );
	let xhr = new XMLHttpRequest();
	xhr.upload.addEventListener("progress", progressHandlerImageEdit, false)
	xhr.addEventListener("load", completeHandlerImageEdit, false);
	xhr.addEventListener("error", errorHandlerImageEdit, false);
	xhr.addEventListener("abort", abortHandlerImageEdit, false);
	xhr.open("POST",` /job_image/edit/${jobId}`);
	//var contentType = "multipart/form-data";
    //xhr.setRequestHeader("Content-Type", contentType);

	xhr.send(formdata);
	

});
function progressHandlerImageEdit(event){
	// _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
	var percent = (event.loaded / event.total) * 100;
      _("progressBarEdit").style.width = percent + "%";
	 // _("statusd").innerHTML = Math.round(percent)+"% uploaded";
}
function completeHandlerImageEdit(event){
	 // _("statusd").innerHTML = event.target.responseText;
	 //_('post_job').reset();
	   location.href="/jobs"
	
}
function errorHandlerImageEdit(event){

	//  _("status").innerHTML = "Upload Failed";
}
function abortHandlerImageEdit(event){
	//  _("status").innerHTML = "Upload Aborted";
}

})();
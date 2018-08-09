(function(){
function _(el){
	return document.getElementById(el);
}
document.getElementById("post_job").addEventListener("submit",function(event){
	 event.preventDefault();
	var file = _("job_image").files[0];
	// alert(file.name+" | "+file.size+" | "+file.type);
	// var language = _('language').value;
	var position = _("position").value;
	 console.log(position)
	
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
	
	// if(name === ''){
	// 	//alert('fill up name')
	// 	_('name_error').innerHTML = 'please fill up name field';
	// 	return false;
	// }
	

	formdata.append("job_image", file );
	// formdata.append("language", language );
	formdata.append("position", position);

	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandlerJobAdd, false)
	ajax.addEventListener("load", completeHandlerJobAdd, false);
	ajax.addEventListener("error", errorHandlerJobAdd, false);
	ajax.addEventListener("abort", abortHandlerJobAdd, false);
	ajax.open("POST", "/jobs/add");
	// ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	//  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	ajax.send(formdata);
	return false;

	
})
function progressHandlerJobAdd(event){
	//_("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
	 var percent = (event.loaded / event.total) * 100;
     _("progressBar").style.width = percent + "%";
	// _("status").innerHTML = Math.round(percent)+"% uploaded";
}
function completeHandlerJobAdd(event){
	// _("status").innerHTML = event.target.responseText;
	//  _('post_job').reset();
	 //  location.href="/jobs"
	
}
function errorHandlerJobAdd(event){

	// _("status").innerHTML = "Upload Failed";
}
function abortHandlerJobAdd(event){
	// _("status").innerHTML = "Upload Aborted";
}
})();
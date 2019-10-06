
	
	
// function _(el){
// 	return document.getElementById(el);
// }


// $("#avatarForm").on("submit",function(event){
// 	 event.preventDefault();
// 	alert('hello')
	

// });
// 	console.log(file.name+" | "+file.size+" | "+file.type)
// 	//  alert(file.name+" | "+file.size+" | "+file.type);
   
// let formdata = new FormData();
	
// 	let avatarInput =  $('#avatar');
// 	if(avatarInput.val() === ''){
// 		$('.avatar_error').text('Te rog alege imagine')x
// 		return false;
// 	}
	
// 	// //size vappplidation
// 	  let file = _("avatar").files[0];
	   
// 	  if(file.size > 5e+6 ){
// 			//alert("image is too big")
// 		$('.avatar_error').text('Imagine nu trebuie sa fie mai mare de 5mb');
		
// 		return false;
//       }
		
// 		//append input
//     formdata.append("avatar", file );
	 
// 	console.log(file)
// 	let xhr = new XMLHttpRequest();
// 	xhr.upload.addEventListener("progress", progressHandlerImageEdit, false)
// 	xhr.addEventListener("load", completeHandlerImageEdit, false);
// 	xhr.addEventListener("error", errorHandlerImageEdit, false);
// 	xhr.addEventListener("abort", abortHandlerImageEdit, false);
// 	xhr.open("POST",` /api/profile/avatar`);
// 	//var contentType = "multipart/form-data";
//     //xhr.setRequestHeader("Content-Type", contentType);

// 	xhr.send(formdata);
	


// function progressHandlerImageEdit(event){
// 	// _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
// 	 let percent = (event.loaded / event.total) * 100;
//       _("progressBarAavatar").style.width = percent + "%";
// 	 // _("statusd").innerHTML = Math.round(percent)+"% uploaded";
	
// }
// function completeHandlerImageEdit(event){
// 	window.location.href="/api/profile" 
    
// 	 // _("statusd").innerHTML = event.target.responseText;
// 	 //_('post_job').reset();
	
// }
// function errorHandlerImageEdit(event){
// 	//  _("status").innerHTML = "Upload Failed";
// }
// function abortHandlerImageEdit(event){
// 	//  _("status").innerHTML = "Upload Aborted";
// }




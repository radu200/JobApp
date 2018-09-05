 import ImageEdit from './job_image_edit';
//  import JobAdd from './job_add';
import jobForm from './jobs_form_validation'
import  JobEdit from  './job_edit'



axios.get('http://localhost:5000/my_jobs')
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
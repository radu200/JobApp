



     $(document).ready(function () {
         $.ajax({
             url: `job/details/${id}`,
             type: "GET",
             dataType: 'json',
             success: function (result) {
    
                 if (data.code === 99) {
                     console.log('loghezate')
                    $('.JobDetailContainer').html('Te rog logheazate  <a  href="/login">aici</a> ')
                    
                  
    
                } else {
               
                 
                        
                        // if(job.image){
                        //   var jobImage = job.image;
                        // }else {
                        //     var jobImage = '/images/no_job_image.png' 
                        // }
    
                        // if(job.salary){
                        //     var salary = `${job.salary} ${'LEI'} |`
                        // } else {
                        //     var salary = ''
                        // }
                        
                        // if(job.start_time){
                        //     var startTime = job.startTime
                        // } else {
                        //     var startTime = ''
                        // }
                       
                        console.log('result',result)
                        // $('.JobDetailContainer').html(
                    
                        //         `<div class="col s12 m12 l6">
                        //         <div class="card">
                        //         <div class="card-image waves-effect waves-block waves-light">
                        //         <img src="/images/no_job_image.png">
                        //         </div>
                        //     </div>
                        //     <form action="">
                        //         <button type="submit" class="btn full-width-btn">Aplica acum</button>
                        //     </form>
                        //     <div class="card-content">
                        //     <h4 class="break_text">${result.position}</h4>
                        //     <p class="text-opacity">${result.category}</p>
                        //     <p>${result.description}</p>

                        //     <p>Experienta: <span class="font_weight_bold">${result.experience}</span></p>
                            
                        
                        //     <p>Limbi: <span class="font_weight_bold">${result.language}</span></p>
                        
                            
                        //     <p>Tipul de angajare: <span class="font_weight_bold">${result.employment_type}</span></p>
                            
                            
                        //     <p>Salariu: <span class="font_weight_bold">${result.salary}LEI </span></p>
                        
                        
                        //     <p>Timpul de începere: <span class="font_weight_bold yellow-backgr ">${result.start_time}</span></p>
                        
                        //     <p> <i class="material-icons">place</i> <span class="font_weight_bold">${result.city}</span></p>
                        //     <div class="divider"></div>
                        //     </div>
                        // </div>`
                          
                        // )
                
    
                }

            }
        })
    })
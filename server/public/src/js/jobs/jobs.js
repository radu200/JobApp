

// $.ajaxSetup({
//     beforeSend: function (xhr) {
//         xhr.setRequestHeader("jobs-list", "true");
//     }
// });
$(document).ready(function () {
    $.ajax({
        url: '/jobs',
        type: "GET",
        dataType: 'json',
        success: function (data) {
                var $output = $('.jobcontainer');
                // $('#status').html( JSON.stringify(data.description))
                var jobsNum = data.length
                $.each(data, function (index, job) {
                    
                    if(job.image){
                      var jobImage = job.image;
                    }else {
                        var jobImage = '/images/no_job_image.png' 
                    }

                    if(job.salary){
                        var salary = `${job.salary} ${'LEI'} |`
                    } else {
                        var salary = ''
                    }
                    
                    if(job.start_time){
                        var startTime = job.startTime
                    } else {
                        var startTime = ''
                    }
                   
                    $output.append(
                        
                        `
                                <div class="col s12 m6 l4">
                                    <a href="/job/details/${job.id}" target="_blank" class="black-text">
                                        <div class="card hoverable ">
                                            <div class="card-image  ">
                                             
                                                <img src="${jobImage}" alt="">
        
                                                 <span class="card-title yellow-text text-lighten-1 start-time">${startTime}</span>
                     
                                            </div>

                                            <div class="card-content card-content-jobs">
                                                <p>
                                                    <b>
                                                   
                                                        <span class="salary-card blue-text">${salary}  </span>
                                                
                                                        <span>${job.employment_type}</span>
                                                    </b>
                                                </p>

                                                <p class="card-position"> <b>${job.position}</b> </p>
                                                <p class="truncate description text-opacity">${job.description}</p>


                                                <p class="text-opacity"><i class="material-icons">room</i>${job.city}</p>

                                            </div>

                                            <div class="card-action">
                                                <a href="/job/details/${job.id}" class=" btn blue white-text text-lighten-1 waves-effect waves-light full-width-btn">
                                                    Vezi Mai mult</a>

                                            </div>
                                        </div>
                                 </div>
                                </a>
                           </div>
                      `
                    )
                });

            
                var page = 2;
                $('#getMore').click(function(){
                    page += 2
                     console.log('page',page)
                    $.ajax({
                        url: '/job/get-more',
                        type: "POST",
                        data:{limit:page},
                        success: function (data) {
                            console.log(data)
                            // page += 3;
                        }
                    })
                })

        }
    })




    $("#searchJobForm").submit(function(event) {

        /* stop form from submitting normally */
        event.preventDefault();
         var $searchVal =  $('#searchJobInput').val()
        
         
          $.ajax({
            url: `/search?searchJob=${$searchVal}`,
            type: "GET",
            success: function (data) {

                var $output = $('.jobcontainer');
                 console.log('data', data.length)

                $.each(data, function (index, job) {
                    console.log('job', job)
                    if(job.image){
                      var jobImage = job.image;
                    }else {
                        var jobImage = '/images/no_job_image.png' 
                    }

                    if(job.salary){
                        var salary = `${job.salary} ${'LEI'} |`
                    } else {
                        var salary = ''
                    }
                    
                    if(job.start_time){
                        var startTime = job.startTime
                    } else {
                        var startTime = ''
                    }
                   
                    $output.append(
                        
                        `
                                <div class="col s12 m6 l4">
                                    <a href="/job/details/${job.id}" target="_blank" class="black-text">
                                        <div class="card hoverable ">
                                            <div class="card-image  ">
                                             
                                                <img src="${jobImage}" alt="">
        
                                                 <span class="card-title yellow-text text-lighten-1 start-time">${startTime}</span>
                     
                                            </div>

                                            <div class="card-content card-content-jobs">
                                                <p>
                                                    <b>
                                                   
                                                        <span class="salary-card blue-text">${salary}  </span>
                                                
                                                        <span>${job.employment_type}</span>
                                                    </b>
                                                </p>

                                                <p class="card-position"> <b>${job.position}</b> </p>
                                                <p class="truncate description text-opacity">${job.description}</p>


                                                <p class="text-opacity"><i class="material-icons">room</i>${job.city}</p>

                                            </div>

                                            <div class="card-action">
                                                <a href="/job/details/${job.id}" class=" btn blue white-text text-lighten-1 waves-effect waves-light full-width-btn">
                                                    Vezi Mai mult</a>

                                            </div>
                                        </div>
                                 </div>
                                </a>
                           </div>
                      `
                    )
                });
            }


        })
     
    });



  

})
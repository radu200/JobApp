

$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader("jobs-list", "true");
    }
});
$(document).ready(function () {
    $.ajax({
        url: '/jobs',
        type: "GET",
        dataType: 'json',
        success: function (data) {

            if (data.code === 99) {
                console.log('loghezate')
                $('.jobcontainer').html('Te rog logheazate  <a  href="/login">aici</a> ')


            } else {
                var $output = $('.jobcontainer');
                // $('#status').html( JSON.stringify(data.description))
             
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
                   
                    console.log(job.salary)
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


        }
    })




    $("#loadMore").on('click',function(){ 
        var loadMoreBtn = $('#loadMore');
        var ajaxLimit = 2;
            $.ajax({
                url: '/jobs',
                method: 'get',
                dataType: 'application/json',
                data:{ajaxLimit:ajaxLimit},
                success: function(response){ 
                console.log("limit changed")
                }
            });

            var offsetValue = 0;
            var loadmoreposts = function () {
         $.ajax( '/jobs', { offset: offsetValue} ).done(function( data ) {
             console.log(data)
        //    $('#status').html( JSON.stringify(data))
           offsetValue += 3;
         }); 
       }
    });




})
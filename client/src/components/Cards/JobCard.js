import React from 'react'

const JobCard = (props) => {

      return props.jobs.map((job) => {
           return(
               <div key={job.id}>
               <li>{job.id}</li>
               <li>{job.position}</li>
               <li>{job.category}</li>
                <img alt="" src={job.image}/>
           </div>
           )
      } )

}

export default JobCard;
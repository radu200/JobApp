import React from 'react'

const JobCard = (props) => {

    if(props.candidates.length > 0){
      return props.candidates.map((candidate) => {
           return(
               <div key={candidate.userID}>
               <li>{candidate.first_name}</li>
               <li>{candidate.last_name}</li>
               <li>{candidate.total_years}</li>
           </div>
           )
      } )
  } else {
       return <h1>Nu am gasit nici un job</h1>
  }
   
}

export default JobCard;
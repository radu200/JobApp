import React from 'react'

const JobCard = (props) => {

      return props.candidates.map((candidate) => {
           return(
               <div key={candidate.userID}>
               <li>{candidate.first_name}</li>
               <li>{candidate.last_name}</li>
               <li>{candidate.total_years}</li>
               <img alt="" src={candidate.avatar}/>

           </div>
           )
      } ) 
}

export default JobCard;
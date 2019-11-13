import React, { Component } from "react";
import AdminReported from '../../components/adminDashboard/Admin/AdminReportedUsers'
import axios from "axios";
import {removeById } from './helpers'

class ReportedUsers extends Component {
   constructor(){
     super()
       this.state = {
          reports:[],
          blackListBtn:null,
          offset:0,
          msg:''
       }
     
   }

   
   async componentDidMount(){
     const { offset } = this.state;
     const url = `/api/admin/reported?offset=${offset}`
     try {
       const res =  await axios.get(url)
       this.setState({
         reports:res.data, 
         blackListBtn:true,
         offset: offset + 12
        })
        
      } catch(err){
        console.log(err)
      }
    }
    
    
    
  getMore = async () => {
    const { reports, offset } = this.state;
    const url = `/api/admin/reported?offset=${offset}`
    try {
      const response = await axios.get(url);
      
      const data = response.data;
      this.setState({
        reports: [...reports, ...data],
        offset: offset + 12
      });
    } catch (error) {
      console.error(error);
    }
  };



  async handleBlock (userId, reportId) {
    try{
      const res =  await axios.post('/api/admin/black-list',{
        data:{
           id:userId,
           statusType:'reported'
        }
      })

      const msg = res.data.msg.success
      if(msg){
        const { reports } = this.state;
        const newReports = removeById(reports, reportId)
     
        this.setState({
          msg:msg,
          reports:newReports
        })
      }
    } catch(err){
      console.log(err)
    }
 
  }

 render () {
   const { reports, blackListBtn, msg } = this.state
   const { getMore, handleBlock} = this
   return (
     <div>
      <AdminReported 
          reports={reports} 
          blackListBtn={blackListBtn} 
          getMore={getMore} 
          handleBlock={handleBlock.bind(this)}
          msg={msg}
       />
     </div>
    )
  }
}


export default ReportedUsers;
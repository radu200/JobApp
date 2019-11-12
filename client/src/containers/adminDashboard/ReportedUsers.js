import React, { Component } from "react";
import AdminReported from '../../components/adminDashboard/Admin/AdminReportedUsers'
import axios from "axios";

class ReportedUsers extends Component {
   constructor(){
     super()
       this.state = {
          reports:[],
          blackListBtn:'null',
          offset:0
       }
     
   }


  async componentDidMount(){
    const { offset } = this.state;
    const url = `/api/admin/reported?offset=${offset}`
    try {
      const res =  await axios.get(url)
      this.setState({
        reports:res.data, 
        blackListBtn:'true',
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


  async handleBlock (id) {
    try{
      const res =  await axios.post('/api/admin/black-list',{
        data:{
           id:id
        }
      })
 
    } catch(err){
      console.log(err)
    }
 
  }

 render () {
   const { reports, blackListBtn } = this.state
   const { getMore, handleBlock} = this
   return (
     <div>
      <AdminReported reports={reports} blackListBtn={blackListBtn} getMore={getMore} handleBlock={handleBlock.bind(this)}/>
     </div>
    )
  }
}


export default ReportedUsers;
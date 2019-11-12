import React, { Component } from "react";
import Admin from '../../components/adminDashboard/Admin/AdminUsers'
import axios from "axios";

class AdminDashboard extends Component {
   constructor(){
     super()
       this.state = {
          users:[],
          blackListBtn:'null',
          offset:0,
          msg:''
       }
     
   }


  async componentDidMount(){
    const { offset } = this.state;
    const url = `/api/admin/users?offset=${offset}`
    try {
      const res =  await axios.get(url)
      this.setState({
        users:res.data, 
        blackListBtn:'true',
        offset: offset + 12
      })



    } catch(err){
        console.log(err)
    }
   }


   async handleBlock (id) {
    try{
      const res =  await axios.post('/api/admin/black-list',{
        data:{
           id:id,
           reported:''
        }
      })

    if(res.data.msg){
      const msg = res.data.msg
      this.setState({msg:msg})
    }
 
    } catch(err){
      console.log(err)
    }
 
  }
     
  getMore = async () => {
    const { users, offset } = this.state;
    const url = `/api/admin/users?offset=${offset}`
    try {
      const response = await axios.get(url);
      
      const data = response.data;
      this.setState({
        users: [...users, ...data],
        offset: offset + 12
      });
      
    } catch (error) {
      console.error(error);
    }
  };

 render () {
   const { users, blackListBtn } = this.state
   const { getMore } = this
   return (
     <div>
      <Admin users={users} blackListBtn={blackListBtn} getMore={getMore}/>
     </div>
    )
  }
}


export default AdminDashboard;
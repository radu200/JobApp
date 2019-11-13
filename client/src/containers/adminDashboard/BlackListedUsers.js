import React, { Component } from "react";
import Admin from '../../components/adminDashboard/Admin/AdminUsers'
import axios from "axios";
import { removeById } from './helpers'
class BlackListUsers extends Component {
   constructor(){
     super()
       this.state = {
          users:[],
          blackListBtn:null,
          unBlockBtn:null, 
          offset:0,
          msg:''
       }
     
   }




  async componentDidMount(){
    const { offset } = this.state;
    const url = `/api/admin/black-list?offset=${offset}`
    try {
      const res =  await axios.get(url)
      this.setState({
        users:res.data, 
        blackListBtn:false,
        unBlockBtn:true,
        offset: offset + 12
      })

    } catch(err){
        console.log(err)
    }
   }


     
  getMore = async () => {
    const { users, offset } = this.state;
    const url = `/api/admin/black-list?offset=${offset}`
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


  async handleUnBlock(id){
     try {
       const res = await axios.post('/api/admin/unblock',{
          data:{
            id:id
          }
       })

       const msg = res.data.msg.success
      if(msg){
        const { users } = this.state;
        const newUsers = removeById(users, id)
     
        this.setState({
          msg:msg,
          users:newUsers
        })
      }

    }
      catch(err){
        console.log(err)
      }
  }

 render () {
   const { users, blackListBtn, unBlockBtn, msg } = this.state
   const { getMore, handleUnBlock } = this
   return (
     <div>
      <Admin 
        users={users} 
        blackListBtn={blackListBtn} 
        getMore={getMore} 
        unBlockBtn={unBlockBtn}
        msg={msg}
        handleUnBlock={handleUnBlock.bind(this)}/>
     </div>
    )
  }
}


export default BlackListUsers
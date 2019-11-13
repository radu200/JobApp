import React, { Component } from "react";
import Admin from '../../components/adminDashboard/Admin/AdminUsers'
import {removeById } from './helpers'
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
       this.handleBlock = this.handleBlock.bind(this)
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


  async handleBlock(id) {
    try {
      const res = await axios.post("/api/admin/black-list", {
        data: {
          id: id,
        }
      });

      const msg = res.data.msg.success;
      if (msg) {
        const { users } = this.state;
        const newUsers = removeById(users, id);

        this.setState({
          msg: msg,
          users: newUsers
        });
      }
    } catch (err) {
      console.log(err);
    }
  }


 render () {
   const { users, blackListBtn, msg } = this.state
   const { getMore, handleBlock } = this
   console.log(users)
   return (
     <div>
      <Admin 
        users={users} 
        blackListBtn={blackListBtn} 
        handleBlock={handleBlock}
        getMore={getMore}
        msg={msg}
        />
     </div>
    )
  }
}


export default AdminDashboard;
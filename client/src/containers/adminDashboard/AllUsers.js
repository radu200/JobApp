import React, { Component } from "react";
import Admin from '../../components/adminDashboard/Admin/AdminUsers'
import {removeById, filterByEmail } from './helpers'
import {getAllUsers, blackListUsers} from '../../api/admin'

class AdminDashboard extends Component {
   constructor(){
     super()
       this.state = {
          users:[],
          blackListBtn:null,
          offset:0,
          msg:'',
          query:''
       }
       this.handleBlock = this.handleBlock.bind(this)
       this.handleSearch = this.handleSearch.bind(this)
   }


  async componentDidMount(){
    const { offset } = this.state;
    try {
      const data = await getAllUsers(offset)
      this.setState({
        users:data, 
        blackListBtn:true,
        offset: offset + 12
      })

    } catch(err){
        console.log(err)
    }
   }


     
  getMore = async () => {
    const { users, offset } = this.state;
    try {
       const data = await getAllUsers(offset)
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
     
      const data = await blackListUsers(id)

      const msg = data.msg.success;
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
  
  handleSearch (e){
    const query  = e.target.value
     this.setState({
        query:query
     })
   }

 render () {
   const { users, blackListBtn, msg, query } = this.state
   const { getMore, handleBlock, handleSearch } = this
   const filteredUsers = filterByEmail(users, query)
   return (
     <div>
      <Admin 
        users={filteredUsers} 
        blackListBtn={blackListBtn} 
        handleBlock={handleBlock}
        onChange={handleSearch}
        value={query}
        getMore={getMore}
        msg={msg}
        />
     </div>
    )
  }
}


export default AdminDashboard;
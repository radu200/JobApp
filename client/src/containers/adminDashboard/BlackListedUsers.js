import React, { Component } from "react";
import Admin from '../../components/adminDashboard/Admin/AdminUsers'
import { removeById, filterByEmail} from './helpers'
import { getBlackListedUsers, unBlockUsers} from '../../api/admin'


class BlackListUsers extends Component {
   constructor(){
     super()
       this.state = {
          users:[],
          blackListBtn:null,
          unBlockBtn:null, 
          offset:0,
          msg:'',
          query:''
       }
      
      this.handleUnBlock = this.handleUnBlock.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
   }

  async componentDidMount(){
    const { offset } = this.state;
    try {
      const data  = await getBlackListedUsers(offset)

      this.setState({
        users:data, 
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
    try {

      const data  = await getBlackListedUsers(offset)

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
      const data = await  unBlockUsers(id)

       const msg = data.msg.success
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

  handleSearch (e){
    const query  = e.target.value
     this.setState({
        query:query
     })
   }


 render () {
   const { users, blackListBtn, unBlockBtn, msg, query } = this.state
   const { getMore, handleUnBlock, handleSearch} = this
   const filteredUsers = filterByEmail(users, query)
   return (
     <div>
      <Admin 
        users={filteredUsers} 
        blackListBtn={blackListBtn} 
        getMore={getMore} 
        unBlockBtn={unBlockBtn}
        msg={msg}
        handleUnBlock={handleUnBlock}
        onChange={handleSearch}
        value={query}
        />
     </div>
    )
  }
}


export default BlackListUsers
import React, { Component } from "react";
import Admin from '../../components/adminDashboard/Admin/AdminUsers'
import axios from "axios";

class BlackListUsers extends Component {
   constructor(){
     super()
       this.state = {
          users:[],
          blackListBtn:'null',
          unBlockBtn:'', 
          offset:0
       }
     
   }




  async componentDidMount(){
    const { offset } = this.state;
    const url = `/api/admin/black-list?offset=${offset}`
    try {
      const res =  await axios.get(url)
      this.setState({
        users:res.data, 
        blackListBtn:'false',
        unBlockBtn:'true',
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
       const res = await axios.post('/api/admin/o2/unblock',{
          data:{
            id:id
          }
       })

       if(res.data.msg){
        const msg = res.data.msg
        this.setState({msg:msg})
      }
   
      }
      catch(err){
        console.log(err)
      }
  }

 render () {
   const { users, blackListBtn, unBlockBtn } = this.state
   const { getMore, handleUnBlock } = this
   return (
     <div>
      <Admin 
        users={users} 
        blackListBtn={blackListBtn} 
        getMore={getMore} 
        unBlockBtn={unBlockBtn}
        handleUnBlock={handleUnBlock.bind(this)}/>
     </div>
    )
  }
}


export default BlackListUsers
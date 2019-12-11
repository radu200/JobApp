import React, {Component} from 'react'
import io from 'socket.io-client';
import axios from "axios";
import ChatRoom from './ChatRoom'
import withAuthEmployer from '../../HOC/auth/Employer'
const socket = io('http://localhost:8000');



class Chat extends Component {
    constructor(){
         super()
         this.state = {
           chatRooms:[],
           room: null
          }
    }

    async  componentDidMount() {
       
      // try {
      //   const res = await axios.get('/api/chat')
      //   const chatRooms = res.data
      //    this.setState({chatRooms})
      // } catch(err){
      //   console.log(err)
      // }

  
    }


   onChatRoom(id) {
     this.setState({
       room:id
     })
    //  console.log("click", id)
   }

  render(){ 
     const { chatRooms, room} = this.state   
      return (
        <div>
          <p>chat</p>
         {/* {chatRooms.map((room, i) => {
           return <div onClick={() => this.onChatRoom(room.id)} key={room.id}><a href={`/chat/${room.id}`}>{room.receiverName}</a> </div>
          })} */}

         {/* { room ===  <ChatRoom rooms={chatRooms} />  } */}
         </div>
      )
  }
} 


export default Chat;
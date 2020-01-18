import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { socket } from '../../config/socket.io'
import {
  fetchRooms,
  fetchRoomDetails,
  fetchNewMessages,
  fetchNotification
} from "../../redux/chat/operators";
import {
   getRooms
} from "../../redux/chat/selectors";
import ChatPage from '../../components/Pages/Chat/ChatPage'
import queryString from 'query-string'



class Chat extends Component {
  constructor() {
    super();
    this.state = {
      new_msg:[],
      chatMessage:'',
      room_id: null,
      updateChat:null,
      status:'',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleRoomDetails = this.handleRoomDetails.bind(this)
  }
  
  async componentDidMount() {
    this.props.fetchRooms();
    const room = queryString.parse(this.props.location.search)
    const room_id = room.id

    this.props.fetchRoomDetails(room_id);

     socket.on('chatMessage', msg => {
          console.log('message',msg)
          this.props.fetchNewMessages(msg)
     })
     socket.on('notification', (notification) => {
        this.props.fetchNotification(notification)
      })
     socket.on('updateChat', data => {
       this.setState({updateChat:data})
     })
    
     window.scrollTo({
      bottom: 0,
      left: 0,
      behavior: "smooth"
    });
  }

 
 
  componentDidUpdate(props, state) {
     if(state.room_id !== this.state.room_id){
       if(state.room_id !== null || state.room_id !== undefined){
          const newRoom = this.state.room_id;
          const oldRoom = state.room_id
           socket.emit('switchRoom', {newRoom, oldRoom})
           this.setState({chatMessages:[]})
       }
     }
     
  }

  async handleRoomDetails(room_id) {

     this.props.fetchRoomDetails(room_id);
     this.props.history.push(`/chat?id=${room_id}`)
     socket.emit('join', {room_id});
     socket.emit('removeNotification', {room_id})
     this.setState({room_id})
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      chatMessage: value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
     const { chatMessage, room_id } = this.state;
     socket.emit("chatMessage", { chatMessage, room_id});
     this.setState({chatMessage:''})
    
  }

  render() {
    const { chatMessage} = this.state;
    const { handleChange, onSubmit, handleRoomDetails } = this;
    const { room, rooms, user_id} = this.props;
    return (
      <div>
        <ChatPage
          room={room}
          chatRoomList={rooms}
          handleRoom={handleRoomDetails}
          handleChange={handleChange}
          onSubmit={onSubmit}
          value={chatMessage}
          user_id={user_id}
        />
        
      </div>
    );
  }
}
const mapState = state => ({
  rooms:getRooms(state),
  room: state.chatRoomD.room,
});

export default compose(
  connect(mapState, { fetchRooms, fetchRoomDetails, fetchNewMessages, fetchNotification }),
)(Chat);

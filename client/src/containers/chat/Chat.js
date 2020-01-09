import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchRooms,
  fetchRoomDetails,
  fetchNewMessages,
} from "../../redux/chat/operators";
import ChatPage from '../../components/Pages/Chat/ChatPage'
import queryString from 'query-string'
const styles = {
  rooms: {
    margin: "5px",
    width: "200px",
    height: "100px",
    textAlign: "center",
  },
  msgSender: {
    backgroundColor: "white",
    color: "black",
  },
  msgReceiver: {
    backgroundColor: "blue",
    color: "white",
  },
};

class Chat extends Component {
  constructor() {
    super();
    this.state = {
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
     this.socket = io("http://localhost:8000");
     this.socket.on('chatMessage', msg => {
          this.props.fetchNewMessages(msg)
     })
     this.socket.on('updateChat', data => {
       this.setState({updateChat:data})
     })
   
  }

  componentDidUpdate(props, state) {
     if(state.room_id !== this.state.room_id){
       if(state.room_id !== null || state.room_id !== undefined){
          const newRoom = this.state.room_id;
          const oldRoom = state.room_id
           this.socket.emit('switchRoom', {newRoom, oldRoom})
           this.setState({chatMessages:[]})
       }
     }
  }

  async handleRoomDetails(room_id) {
    const { chatRooms } = this.props;
     this.props.fetchRoomDetails(room_id);
     this.props.history.push(`/chat?id=${room_id}`)
     const sender_id = chatRooms.sender_id;
     this.socket.emit("join", {room_id, sender_id});

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
     const { chatRooms } = this.props;
     const s_id = chatRooms.sender_id;
     this.socket.emit("chatMessage", { chatMessage, room_id, s_id });
     this.setState({chatMessage:''})
 
  }

  render() {
    const {chatMessage} = this.state;
    const { handleChange, onSubmit, handleRoomDetails } = this;
    const { chatRooms, room } = this.props;
    const sender_id = chatRooms.sender_id
    return (
      <div>
        <ChatPage
          room={room}
          chatRoomList={chatRooms}
          sender_id={sender_id}
          handleRoom={handleRoomDetails}
          handleChange={handleChange}
          onSubmit={onSubmit}
          value={chatMessage}
        />
        {this.state.updateChat}
        
      </div>
    );
  }
}
const mapState = state => ({
  chatRooms: state.chatRooms.rooms,
  room: state.chatRoomD.room,
});

export default compose(
  connect(mapState, { fetchRooms, fetchRoomDetails, fetchNewMessages }),
)(Chat);

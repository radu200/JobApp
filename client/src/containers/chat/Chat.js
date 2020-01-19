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
      chatMessage:'',
      room_id: null,
      receiverName:''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleRoomDetails = this.handleRoomDetails.bind(this)
  }
  
  async componentDidMount() {
    this.props.fetchRooms();
    const url = queryString.parse(this.props.location.search)
    const room_id = url.id
    console.log(room_id)
    const receiverName = url.name
    
    this.setState({ receiverName })
    
    this.props.fetchRoomDetails(room_id);

    socket.on('chatMessage', msg => {
      this.props.fetchNewMessages(msg)
    })
    socket.on('notification', (notification) => {
      this.props.fetchNotification(notification)
    })
    socket.on('updateChat', data => {
      this.setState({updateChat:data})
    })
    
     if(room_id !== null || room_id !== undefined){
       socket.emit('join', {room_id});
     }
  
     window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
    
  }

 
 
  componentDidUpdate(props) {
     if(props.location.search !== this.props.location.search){
       const url = queryString.parse(this.props.location.search)
       const receiverName = url.name
       this.setState({ receiverName })
     }
    
  }

  async handleRoomDetails(room_id, receiverFn, receiverLn) {

     this.props.fetchRoomDetails(room_id);
     this.props.history.push(`/chat?id=${room_id}&name=${receiverFn} ${receiverLn}`)
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

     if(room_id === null || room_id === undefined) {
      const url = queryString.parse(this.props.location.search)
      const room_id = url.id
      socket.emit("chatMessage", { chatMessage, room_id});
      this.setState({chatMessage:''})
     } else{
       socket.emit("chatMessage", { chatMessage, room_id});
       this.setState({chatMessage:''})
     }
    
  }

  render() {
    const { chatMessage, receiverName } = this.state;
    const { handleChange, onSubmit, handleRoomDetails } = this;
    const { room, rooms, user_id} = this.props;
    return (
      <>
        <ChatPage
          room={room}
          chatRoomList={rooms}
          handleRoom={handleRoomDetails}
          handleChange={handleChange}
          onSubmit={onSubmit}
          value={chatMessage}
          user_id={user_id}
          receiverName={receiverName}
        />
      </>
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

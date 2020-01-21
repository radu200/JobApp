import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { animateScroll } from "react-scroll";
import { socket } from "../../config/socket.io";
import {
  fetchRooms,
  fetchRoomDetails,
  fetchNewMessages,
  fetchNotification,
} from "../../redux/chat/operators";
import { getRooms } from "../../redux/chat/selectors";
import ChatPage from "../../components/Pages/Chat/ChatPage";
import queryString from "query-string";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      chatMessage: "",
      room_id: null,
      receiverName: "",
      roomStatus: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleRoomDetails = this.handleRoomDetails.bind(this);
  }

  async componentDidMount() {
    this.props.fetchRooms();
    const url = queryString.parse(this.props.location.search);
    const room_id = url.id;
    const receiverName = url.name;

    socket.on("notification", notification => {
      this.props.fetchNotification(notification);
    });

    socket.on("chatMessage", msg => {
      this.props.fetchNewMessages(msg);
    });

    if (room_id !== undefined) {
      this.setState({ receiverName, roomStatus: true });
      this.props.fetchRoomDetails(room_id);

      socket.on("updateChat", data => {
        this.setState({ updateChat: data });
      });

      socket.emit("join", { room_id });

      this.scrollToBottom();
    }
  }

  componentDidUpdate(props) {
    if (props.location.search !== this.props.location.search) {
      const url = queryString.parse(this.props.location.search);
      const prevUrl = queryString.parse(props.location.search)
      const receiverName = url.name;
      const room_id = url.id;
      const newRoom = room_id;
      const oldRoom = prevUrl.id
       socket.emit('switchRoom', {newRoom, oldRoom})

      if (room_id === undefined) {
         this.setState({ roomStatus: false, chatMessages:[] });
      } else {
        this.setState({ receiverName, roomStatus: true });
      }
    }
    if (props.room !== this.props.room) {
       this.scrollToBottom();
    }
  }

  async handleRoomDetails(room_id, receiverFn, receiverLn) {
    this.props.fetchRoomDetails(room_id);
    this.props.history.push(
      `/chat?id=${room_id}&name=${receiverFn} ${receiverLn}`,
    );
    socket.emit("join", { room_id });
    socket.emit("removeNotification", { room_id });
    this.setState({ room_id });
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
    // if (room_id === null || room_id === undefined) {
    //   const url = queryString.parse(this.props.location.search);
    //   const room_id = url.id;
    //   this.sendMessage(chatMessage, room_id);
    // }
    this.sendMessage(chatMessage, room_id);
  }

  sendMessage(chatMessage, room_id) {
    socket.emit("chatMessage", { chatMessage, room_id });
    this.setState({ chatMessage: "" });
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chatRoom",
      linear: true,
    });
  }

  render() {
    const { chatMessage, receiverName, roomStatus } = this.state;
    const { handleChange, onSubmit, handleRoomDetails } = this;
    const { room, rooms, user_id, loadingRoom} = this.props;
    console.log(loadingRoom);
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
          roomStatus={roomStatus}
          loadingRoom={loadingRoom}
        />
      </>
    );
  }
}
const mapState = state => ({
  rooms: getRooms(state),
  room: state.chatRoomD.room,
  loadingRoom:state.chatRoomD.loading

});

export default compose(
  connect(mapState, {
    fetchRooms,
    fetchRoomDetails,
    fetchNewMessages,
    fetchNotification,
  }),
)(Chat);

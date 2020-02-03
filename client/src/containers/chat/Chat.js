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
  fetchRemoveRoom,
} from "../../redux/chat/operators";
import { newNotification, delNotification } from "../../redux/chat/actions";
import { getRooms, chatRooms } from "../../redux/chat/selectors";
import ChatPage from "../../components/Pages/chat/ChatPage";
import queryString from "query-string";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      chatMessage: "",
      new_msg: [],
      room_id: null,
      receiverName: "",
      roomStatus: false,
      receiver_id: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleRoomDetails = this.handleRoomDetails.bind(this);
    this.handleRemoveRoom = this.handleRemoveRoom.bind(this);
    this.handleReports = this.handleReports.bind(this);
  }

  getUrlParams = url => {
    const data = queryString.parse(url);
    const room_id = data.id;
    const receiverName = data.name;
    const receiver_id = data.r;
    return { room_id, receiver_id, receiverName };
  };

  async componentDidMount() {
    const {
      location,
      fetchRooms,
      fetchRoomDetails,
      fetchNotification,
      newNotification,
    } = this.props;
    const { room_id, receiverName } = this.getUrlParams(location.search);

    fetchRooms();
    fetchNotification();

    socket.on("notification", notification => {
      newNotification(notification);
    });

    if (room_id !== undefined) {
      socket.on("chatMessage", msg => {
        this.setState({ new_msg: msg });
      });
      fetchRoomDetails(room_id);

      this.setState({ receiverName, roomStatus: true });
      socket.emit("join", { room_id });

      this.scrollToBottom();
    }
  }

  componentDidUpdate(props, state) {
    if (props.location.search !== this.props.location.search) {
      const { room_id, receiverName } = this.getUrlParams(
        this.props.location.search,
      );
      const prevUrl = queryString.parse(props.location.search);
      const newRoom = room_id;
      const oldRoom = prevUrl.id;
      socket.emit("switchRoom", { newRoom, oldRoom });

      if (room_id === undefined) {
        this.setState({ roomStatus: false });
      }
      this.setState({ receiverName, roomStatus: true });
    }

    if (props.room !== this.props.room) {
      this.scrollToBottom();
    }

    if (state.new_msg !== this.state.new_msg) {
      const { new_msg } = this.state;
      this.props.fetchNewMessages(new_msg);
    }
  }

  async handleRoomDetails(room_id, receiver_id, receiverFn, receiverLn) {
    this.props.fetchRoomDetails(room_id);
    this.props.history.push(
      `/chat/room/?id=${room_id}&r=${receiver_id}&name=${receiverFn} ${receiverLn}`,
    );
    socket.emit("join", { room_id, receiver_id });
    socket.emit("removeNotification", { room_id, receiver_id });
    this.setState({ room_id, receiver_id });
    this.props.delNotification(room_id);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      chatMessage: value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { chatMessage } = this.state;

    // if (room_id === null || room_id === undefined) {
    const { room_id, receiver_id } = this.getUrlParams(
      this.props.location.search,
    );
    this.sendMessage(chatMessage, room_id, receiver_id);
    //  } else {
    //    this.sendMessage(chatMessage, room_id, receiver_id);
    //  }
  }

  sendMessage(chatMessage, room_id, receiver_id) {
    socket.emit("chatMessage", { chatMessage, room_id, receiver_id });
    this.setState({ chatMessage: "" });
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chatRoom",
      linear: true,
    });
  }

  async handleRemoveRoom() {
    const { room_id } = this.getUrlParams(this.props.location.search);
    this.props.fetchRemoveRoom(room_id);
    this.props.history.push('/chat')
  }

  handleReports() {
    const { receiver_id } = this.getUrlParams(this.props.location.search);
    this.props.history.push(`/api/report/${receiver_id}`);
  }

  render() {
    const { chatMessage, receiverName, roomStatus } = this.state;
    const {
      handleChange,
      onSubmit,
      handleRoomDetails,
      handleRemoveRoom,
      handleReports,
    } = this;
    const { room, rooms, user_id, loadingRoom } = this.props;
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
          handleReports={handleReports}
          handleRemoveRoom={handleRemoveRoom}
        />
      </>
    );
  }
}
const mapState = state => ({
  rooms: getRooms(state),
  room: state.chatRoomD.room,
  loadingRoom: state.chatRoomD.loading,
});

export default compose(
  connect(mapState, {
    fetchRooms,
    fetchRoomDetails,
    fetchNewMessages,
    fetchNotification,
    fetchRemoveRoom,
    newNotification,
    delNotification,
  }),
)(Chat);

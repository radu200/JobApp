import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchRooms,
  fetchRoomDetails,
  fetchNewMessages,
} from "../../redux/chat/operators";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import ChatForm from "../../components/Forms/ChatForm";
import queryString from 'query-string';

const socket = io("http://localhost:8000");

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
      newMsg: "",
      messages: [],
      room_id: null,
      updateChat:null
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    this.props.fetchRooms();
    const room = queryString.parse(this.props.location.search)
     const room_id = room.id
  }

  async handleRoomDetails(room_id, j_id, e_id) {
    this.props.fetchRoomDetails(room_id, j_id, e_id);
    this.props.history.push(`/chat?id=${room_id}`)
    const sender_id = chatRooms.sender_id;
    const { chatRooms } = this.props;

     socket.emit("join", {room_id, sender_id});
     socket.on('updateChat', data => {
       this.setState({
         updateChat:data
       })
     })
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      newMsg: value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { newMsg, room_id } = this.state;
    const { chatRooms } = this.props;
    const s_id = chatRooms.sender_id;
    this.setState({ newMsg: "" });
    socket.emit("chatMessage", { room_id, s_id, newMsg });
    socket.on("msg", messages => {
       console.log(messages)
       this.setState({messages})
    });
  }

  render() {
    const { receiver, sender, newMsg, messages } = this.state;
    const { handleChange, onSubmit } = this;
    const { classes } = this.props;
    const { chatRooms, room } = this.props;
    return (
      <div>
        {this.state.updateChat}
        {chatRooms.rooms &&
          chatRooms.rooms.map(r => {
            return (
              <Paper
                onClick={() =>
                  this.handleRoomDetails(
                    r.room_id,
                    r.jobseeker_id,
                    r.employer_id,
                  )
                }
                className={classes.rooms}
                key={r.room_id}
              >
                {r.first_name} {r.last_name}
              </Paper>
            );
          })}
        {room.receiver &&
          room.receiver.map(m => {
            return (
              <Paper className={classes.msgReceiver} key={m.message_id}>
                {m.time} {m.message_text}
              </Paper>
            );
          })}
        {room.sender &&
          room.sender.map(m => {
            return (
              <Paper className={classes.msgSender} key={m.message_id}>
                {m.time} {m.message_text}
              </Paper>
            );
          })}
          {messages}
        {/* {messages && messages.map(m => {
          return (
            <p key={m.message_id}>
              {m.time} {m.message_text}
            </p>
          );
        })} */}
        <ChatForm
          handleChange={handleChange}
          onSubmit={onSubmit}
          value={newMsg}
        />
      </div>
    );
  }
}
const mapState = state => ({
  chatRooms: state.chatRooms.rooms,
  room: state.chatRoomD.room,
});

export default compose(
  withStyles(styles),
  connect(mapState, { fetchRooms, fetchRoomDetails, fetchNewMessages }),
)(Chat);

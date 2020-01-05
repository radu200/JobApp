import React, {Component} from 'react'
import io from 'socket.io-client';
import { connect } from  'react-redux'
import { compose } from 'redux'
import { fetchRooms, fetchRoomDetails } from '../../redux/chat/operators'
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core"
import ChatForm from '../../components/Forms/ChatForm'

const socket = io('http://localhost:8000');

const styles = {
  rooms:{
    margin:'5px',
    width:'200px',
    height:'100px',
    textAlign:'center'
  },
  msgSender:{
    backgroundColor:'blue',
    color:'white'
  },
  msgReceiver:{
    backgroundColor:'green',
    color:'white'
  },

}

class Chat extends Component {
    constructor(){
         super()
         this.state = {
           rooms:[],
           receiver:[],
           sender:[],
           msg:[],
           count:0,
           msgInput:''
          }
          
       this.handleChange = this.handleChange.bind(this)
       this.onSubmit = this.onSubmit.bind(this)
    }

   async componentDidMount(){
     this.props.fetchRooms()    
    }
  
   async handleRoomDetails(room_id, j_id, e_id) {
     this.props.fetchRoomDetails(room_id, j_id, e_id)

    }

    handleChange(e){
      const { value } = e.target
      this.setState({
        msgInput:value
      })
    }
    
    async onSubmit(e){
      e.preventDefault();
      const { msgInput} = this.state
       
      // await socket.emit('sendMessage', msgInput,(err) => {
      //    if(err){
      //       console.log(err)
      //    }
      //   //  console.log('message delivered')
      // })
      // await socket.on('message', msg => {
      //   console.log(msg)
      //   this.setState(prev => ({
      //     msg:[...this.state.msg,msg],
      //     // msgInput:''
      //   }))
      // })
    }
 

  render(){ 
      const { receiver, sender  } = this.state
      const { handleChange, onSubmit } = this
      const  { classes } = this.props
      const { rooms,room } = this.props
      console.log(room)
      return (
        <div>
          {rooms.map(r => {
             return(
               <Paper onClick={() => this.handleRoomDetails(r.room_id, r.jobseeker_id, r.employer_id)} className={classes.rooms} key={r.room_id}>{r.first_name} {r.last_name}</Paper>
             )
          })}
          {room.receiver && room.receiver.map(m => {
             return(
               <Paper className={classes.msgReceiver} key={m.message_id}>{m.time} {m.message_text}</Paper>
             )
          })}
           {room.sender && room.sender.map(m => {
             return(
               <Paper className={classes.msgSender} key={m.message_id}>{m.time} {m.message_text}</Paper>
             )
          })}
          <ChatForm
           handleChange={handleChange}
           onSubmit={onSubmit}
          //  value={msgInput}
          />
         </div>

      )
  }
} 
const mapState = state => ({
   rooms:state.chatRooms.rooms,
   room: state.chatRoomD.room
})

export default compose(
  withStyles(styles),
  connect(mapState, {fetchRooms, fetchRoomDetails})
)(Chat);
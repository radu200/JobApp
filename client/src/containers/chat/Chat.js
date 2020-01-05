import React, {Component} from 'react'
import io from 'socket.io-client';
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core"
import * as axios from 'axios'
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
     try{
       const res = await axios.get('/api/chat')
       this.setState({rooms:res.data})
     }catch(err){
       console.log(err)
     }     
    }
  
   async handleRoomDetails(room_id, j_id, e_id) {
      const res = await axios.get(`/api/chat/room?r_id=${room_id}&j_id=${j_id}&e_id=${e_id}`)
      if(res.status === 200){
        const { receiver, sender } = res.data
        this.setState({receiver, sender})

      }
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
      const { rooms, receiver, sender  } = this.state
      const { handleChange, onSubmit } = this
      const  { classes } = this.props
      return (
        <div>
          {rooms.map(r => {
             return(
               <Paper onClick={() => this.handleRoomDetails(r.room_id, r.jobseeker_id, r.employer_id)} className={classes.rooms} key={r.room_id}>{r.first_name} {r.last_name}</Paper>
             )
          })}
          {receiver && receiver.map(m => {
             return(
               <Paper className={classes.msgReceiver} key={m.message_id}>{m.time} {m.message_text}</Paper>
             )
          })}
           {sender && sender.map(m => {
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


export default withStyles(styles)(Chat);
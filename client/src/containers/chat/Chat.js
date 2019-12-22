import React, {Component} from 'react'
import io from 'socket.io-client';
import ChatForm from '../../components/Forms/ChatForm'
// const socket = io('http://localhost:8000');



class Chat extends Component {
    constructor(){
         super()
         this.state = {
           msg:[],
           count:0,
           msgInput:''
          }
          
       this.handleChange = this.handleChange.bind(this)
       this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
      // socket.on('msg', msg => {
      //    console.log(msg)
      // })
     
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
      const { msg, msgInput} = this.state
      const { handleChange, onSubmit } = this
      console.log('my',msg)
      return (
        <div>
          <p>chat</p>
          <ChatForm
           handleChange={handleChange}
           onSubmit={onSubmit}
           value={msgInput}
          />
           {msg && msg.map((m,i) => <p key={i}>{m}</p>)}
         </div>

      )
  }
} 


export default Chat;
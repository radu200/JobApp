import React, {Component} from 'react'


class Chat extends Component {
    constructor(){
         super()
         this.state = {
           data:[]
          }
    }





  render(){     
      return (
          <div>{this.state.data}</div>
      )
  }
} 


export default Chat;
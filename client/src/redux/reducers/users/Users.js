import {GET_USERS} from '../../actions/constants'

const intialState = {
    users:[]
}

 const users = (state=intialState, action) => {
      switch(action.type){
          case GET_USERS:
            //  console.log(state)
            //  return {...state, users.}
         default:
            return state;
      }
 } 


 export default users
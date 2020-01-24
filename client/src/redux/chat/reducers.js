import {
  REQUEST_ROOMS,
  RECEIVED_ROOMS,
  FAILURE_ROOMS,
  REQUEST_ROOM_D,
  RECEIVED_ROOM_D,
  FAILURE_ROOM_D,
  REQUEST_CREATE_ROOM,
  SUCCESS_CREATE_ROOM,
  FAILURE_CREATE_ROOM,
  REQUEST_NEW_MSG,
  RECEIVED_NEW_MSG,
  FAILURE_NEW_MSG,
  REQUEST_NOTIFICATION,
  RECEIVED_NOTIFICATION,
  FAILURE_NOTIFICATION,
  REMOVE_ROOM
} from "./constants";

const roomsState = {
  rooms: [],
  loading: false,
  err: null,
};

export const roomsReducer = (state = roomsState, action) => {
  switch (action.type) {
    case REQUEST_ROOMS:
      return { ...state, loading: true };
    case RECEIVED_ROOMS:
      
      return { ...state, loading: false, rooms: action.rooms };
    case FAILURE_ROOMS:
      return { ...state, loading: false, err: action.err };
    case REMOVE_ROOM:
       return {...state, rooms: state.rooms.filter(r => r.room_id !== action.id ) }
    default:
      return state;
  }
};

const roomDState = {
  room: [],
  loading: false,
  err: false,
};

export const roomDReducer = (state = roomDState, action) => {
  switch (action.type) {
    case REQUEST_ROOM_D:
      return { ...state, loading: true };
    case RECEIVED_ROOM_D:
      return { ...state, loading: false, room: action.room };
    case FAILURE_ROOM_D:
      return { ...state, loading: false, err: true};
    case RECEIVED_NEW_MSG:
       return {...state, loading:false, room:[...state.room,action.msg]}
    default:
      return state;
  }
};

const notificationState = {
     notification: [],
     loading:false,
     err:false
}

export const notificationReducer = (state = notificationState, action) => {
     switch(action.type){
       case REQUEST_NOTIFICATION:
         return {...state, loading:true}
      case RECEIVED_NOTIFICATION:
         return {...state, loading: false, notification:action.data}
      case FAILURE_NOTIFICATION:
         return {...state, loading:false, err:true}
      default:
        return state
     }
}
const createRoomState = {
    loading: false,
    err: null,
  };

export const createRoomReducer = (state = createRoomState, action) => {
    switch (action.type) {
      case REQUEST_CREATE_ROOM:
        return { ...state, loading: true };
      case SUCCESS_CREATE_ROOM:
        return { ...state, loading: false, };
      case FAILURE_CREATE_ROOM:
        return { ...state, loading: false, err: action.err };
      default:
        return state;
    }
  };
  


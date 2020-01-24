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
  RECEIVED_NOTIFICATION,
  REQUEST_NOTIFICATION,
  FAILURE_NOTIFICATION,
  REMOVE_ROOM
} from "./constants";


///request chat room list
export const requestRooms = () => {
  return {
    type: REQUEST_ROOMS,
  };
};

export const receivedRooms = rooms => {
  return {
    type: RECEIVED_ROOMS,
    rooms,
  };
};

export const failureRooms = err => {
  return {
    type: FAILURE_ROOMS,
    err,
  };
};


///request chat room details
export const requestRoom_d = () => {
  return {
    type: REQUEST_ROOM_D,
  };
};

export const receivedRoom_d = room => {
  return {
    type: RECEIVED_ROOM_D,
    room,
  };
};

export const failureRoom_d = err => {
  return {
    type: FAILURE_ROOM_D,
    err,
  };
};


///request craete chat room 
export const requestcreateRoom = () => {
    return {
      type: REQUEST_CREATE_ROOM,
    };
  };
  
  export const successCreateRoom = () => {
    return {
      type: SUCCESS_CREATE_ROOM,
    };
  };
  
  export const failureCreateRoom = err => {
    return {
      type: FAILURE_CREATE_ROOM,
      err,
    };
  };


  ///new messages
export const requestNewMsg = () => {
  return {
    type: REQUEST_NEW_MSG,
  };
};

export const receivedNewMsg = msg => {
  return {
    type: RECEIVED_NEW_MSG,
    msg,
  };
};

export const failureNewMsg = err => {
  return {
    type: FAILURE_NEW_MSG,
    err,
  };
};


  export const requestNotification = () => {
    return {
      type: REQUEST_NOTIFICATION,
    };
  };
  
  export const receivedNotification = data => {
    return {
      type: RECEIVED_NOTIFICATION,
      data,
    };
  };
  
  export const failureNotification = err => {
    return {
      type: FAILURE_NOTIFICATION,
      err,
    };
  };
  
 export const receivedRemoveRoom = id => {
   return {
     type: REMOVE_ROOM,
     id
   }
 }
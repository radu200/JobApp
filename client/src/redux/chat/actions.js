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
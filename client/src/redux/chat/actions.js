import {
  REQUEST_ROOMS,
  RECEIVED_ROOMS,
  FAILURE_ROOMS,
  REQUEST_ROOM_D,
  RECEIVED_ROOM_D,
  FAILURE_ROOM_D,
} from "./constants";

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

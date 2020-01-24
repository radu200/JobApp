import {
  requestRooms,
  receivedRooms,
  failureRooms,
  requestRoom_d,
  receivedRoom_d,
  failureRoom_d,
  requestcreateRoom,
  successCreateRoom,
  failureCreateRoom,
  requestNewMsg,
  receivedNewMsg,
  failureNewMsg,
  requestNotification,
  receivedNotification,
  failureNotification,
  receivedRemoveRoom
} from "./actions";
import { getRooms, getRoomDetails, createRoom, removeRoom  } from "../../api/chat";

export const fetchRooms = () => async dispatch => {
  try {
    dispatch(requestRooms());
    const data = await getRooms();
    dispatch(receivedRooms(data));
  } catch (err) {
    dispatch(failureRooms(err));
  }
};

export const fetchRoomDetails = (room_id) => async dispatch => {
  try {
    dispatch(requestRoom_d());
    const data = await getRoomDetails(room_id);
    dispatch(receivedRoom_d(data));
  } catch (err) {
    dispatch(failureRoom_d(err));
  }
};

export const fetchNewMessages = (data) => async dispatch => {
  try {
    dispatch(requestNewMsg());
    dispatch(receivedNewMsg(data));
  } catch (err) {
    console.log(err)
    dispatch(failureNewMsg(err));
  }
}
export const fetchCreateRoom = (user_id) => async dispatch => {
  try {
    dispatch(requestcreateRoom());
    const data = await createRoom(user_id);
    dispatch(successCreateRoom(data));
  } catch (err) {
    dispatch(failureCreateRoom(err));
  }
};


export const fetchNotification = (notification) => async dispatch =>  {
  try{
     dispatch(requestNotification())
     dispatch(receivedNotification(notification))
  } catch(err){
    dispatch(failureNotification(err))
  }
}

export const fetchRemoveRoom = room_id => async dispatch => {
  try {
     const res = await removeRoom(room_id)
     if(res.status === 200){
       dispatch(receivedRemoveRoom(room_id))
     }
  } catch(err) {

  }
}
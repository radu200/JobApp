import {requestRooms, receivedRooms, failureRooms,requestRoom_d, receivedRoom_d, failureRoom_d} from "./actions";
import { getRooms, getRoomDetails } from '../../api/chat'


export const fetchRooms = () => async  dispatch => {
  try{
    dispatch(requestRooms());
    const data = await  getRooms()
    dispatch(receivedRooms(data));
  } catch(err){
    dispatch(failureRooms(err));
  }
 
};

export const fetchRoomDetails = (room_id, j_id, e_id) => async  dispatch => {
  try{
    dispatch(requestRoom_d());
    const data = await  getRoomDetails(room_id, j_id, e_id)
    dispatch(receivedRoom_d(data));
  } catch(err){
    dispatch(failureRoom_d(err));
  }
 
};

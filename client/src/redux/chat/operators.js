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
} from "./actions";
import { getRooms, getRoomDetails, createRoom  } from "../../api/chat";

export const fetchRooms = () => async dispatch => {
  try {
    dispatch(requestRooms());
    const data = await getRooms();
    dispatch(receivedRooms(data));
  } catch (err) {
    dispatch(failureRooms(err));
  }
};

export const fetchRoomDetails = (room_id, j_id, e_id) => async dispatch => {
  try {
    dispatch(requestRoom_d());
    const data = await getRoomDetails(room_id, j_id, e_id);
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

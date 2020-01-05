import {
  REQUEST_ROOMS,
  RECEIVED_ROOMS,
  FAILURE_ROOMS,
  REQUEST_ROOM_D,
  RECEIVED_ROOM_D,
  FAILURE_ROOM_D,
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
    default:
      return state;
  }
};

const roomDState = {
  room: [],
  loading: false,
  err: null,
};

export const roomDReducer = (state = roomDState, action) => {
  switch (action.type) {
    case REQUEST_ROOM_D:
      return { ...state, loading: true };
    case RECEIVED_ROOM_D:
      return { ...state, loading: false, room: action.room };
    case FAILURE_ROOM_D:
      return { ...state, loading: false, err: action.err };
    default:
      return state;
  }
};

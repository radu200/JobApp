import { createSelector } from "reselect";

const chatRooms = state => state.chatRooms.rooms;

const notifications = state => state.notifications.notification;

export const getRooms = createSelector(chatRooms, notifications, (r, n) => {
  const room =
    r.rooms &&
    r.rooms.map(
      ({
        room_id,
        time,
        first_name,
        last_name,
        avatar,
      }) => ({
        room_id,
        time,
        first_name,
        last_name,
        avatar,
        notification: n && n.filter(n => n.room_id === room_id).map(({ new_msg }) => new_msg ),
      }),
    );
  return  room ;
});


export const  getAllNotifications = createSelector(
   notifications,
   (n) => {
      return n && n.map(n => n.new_msg).reduce((acu, cu) => acu + cu, 0)
   }
)
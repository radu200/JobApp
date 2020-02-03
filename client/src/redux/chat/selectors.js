import { createSelector } from "reselect";

export const chatRooms = state => state.chatRooms.rooms;

const notifications = state => state.notifications.notification;

export const getRooms = createSelector(chatRooms, notifications, (r, n) => {
  console.log('n',n)
  const room =
    r &&
    r.map(
      ({
        room_id,
        time,
        receiver_fn,
        receiver_ln,
        receiver_avatar,
        receiver_id,
      }) => ({
        room_id,
        time,
        receiver_fn,
        receiver_ln,
        receiver_avatar,
        receiver_id,
        msg_notification:
          n &&
          n
            .filter(n =>
              n.room_id === room_id && n.receiver_id === receiver_id)
             .map(({ msg_notification }) => msg_notification)
            .reduce((acu, cu) => acu + cu, 0)
      }),
    );
  return room;
});

export const getAllNotifications = createSelector(notifications, n => {
  return n && n.map(n => n.new_msg).reduce((acu, cu) => acu + cu, 0);
});

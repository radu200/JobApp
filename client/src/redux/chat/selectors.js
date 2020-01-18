import { createSelector } from "reselect";

const chatRooms = state => state.chatRooms.rooms.rooms;
const notifications = state => state.notifications.notification;

export const getRooms = createSelector(chatRooms, notifications, (r, n) => {
  const room =
    r &&
    r.map(
      ({
        room_id,
        jobseeker_id,
        employer_id,
        time,
        first_name,
        last_name,
        avatar,
      }) => ({
        room_id,
        jobseeker_id,
        employer_id,
        time,
        first_name,
        last_name,
        avatar,
        notification: n && n.filter(n => n.room_id === room_id).map(({ new_msg }) => new_msg ),
      }),
    );
  return room;
});

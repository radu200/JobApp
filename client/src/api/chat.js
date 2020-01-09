import { instanceAPI } from './InstanceApi'


//receiver id
export const createRoom = async (user_id,) => {
    const url = `/api/chat/room?id=${user_id}`;
    const res = await instanceAPI.post(url)
    return res
}

export const getRooms = async () => {
    const url = `/api/chat`;
    const res = await instanceAPI.get(url)
    return res.data 
}
export const getRoomDetails =  async (room_id) => {
    const url = `/api/chat/room?r_id=${room_id}`
    const res = await instanceAPI.get(url)
    return res.data
}
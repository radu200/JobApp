import { instanceAPI } from './InstanceApi'


export const createRoom = async () => {
    const url = `/api/chat`;
    const res = await instanceAPI.post(url)
    return res
}

export const getRooms = async () => {
    const url = `/api/chat`;
    const res = await instanceAPI.get(url)
    return res.data 
}
export const getRoomDetails =  async (room_id, j_id, e_id) => {
    const url = `/api/chat/room?r_id=${room_id}&j_id=${j_id}&e_id=${e_id}`
    const res = await instanceAPI.get(url)
    return res.data
}
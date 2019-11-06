
import React from 'react'
const chatRoom = ({rooms}) => {
    {rooms.map((room, i) => {
        return <div key={room.id}>{room.receiverName}</div>
    })}
}
export default chatRoom;
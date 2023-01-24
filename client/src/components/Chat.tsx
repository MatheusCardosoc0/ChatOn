import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client/build/esm/socket'
import { DataProps } from '../utils/Interfaces'

interface ChatProps {
  socket: Socket
  room: string
  username: string
}

const Chat = ({ socket, room, username }: ChatProps) => {

  const [currentMessage, setCurrentMessage] = useState('')
  const [listmessages, setListMessages] = useState<DataProps[]>([])

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
      }

      socket.emit("send_message", messageData)
    }
  }

  useEffect(() => {
    socket.on("recive_message", (data: DataProps) => {
      setListMessages(prev => [...prev, data])
    })
  }, [socket])

  return (
    <main>
      <div>
        <p>Live chat</p>
      </div>
      <div>
        {listmessages.map((message, i) => {
          return <p key={i}>{message.message}</p>
        })}
      </div>
      <div>
        <input type={"text"} placeholder="Hey..."
          onChange={e => setCurrentMessage(e.target.value)} />
        <button onClick={() => sendMessage()}>&#9658;</button>
      </div>
    </main>
  )
}

export default Chat
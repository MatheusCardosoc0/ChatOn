import { FormEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { io } from 'socket.io-client'
import Chat from './components/Chat'

const socket = io('http://localhost:3333/')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (username && room) {
      try {
        socket.emit("join_room", room)
      } catch (error) {
        alert(error)
      }
    }
  }

  return (
    <div>
      <form className="App" onSubmit={handleSubmit} >
        <h3>Entrar no chat</h3>
        <input type={"text"} placeholder="Seu nome" onChange={e => setUsername(e.target.value)} />
        <input type={"text"} placeholder="A sala" onChange={e => setRoom(e.target.value)} />
        <button type='submit'>Entrar</button>
      </form>

      <Chat socket={socket}
      room={room}
      username={username} />
    </div>
  )
}

export default App

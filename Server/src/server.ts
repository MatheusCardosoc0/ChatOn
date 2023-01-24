import Express  from "express";
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'
import { DataProps } from "./utils/interfaces";

const app = Express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log(socket.id)

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`User with Id: ${socket.id} joined room: ${data}`)
  })

  socket.on("send_message", (data: DataProps) => {
    socket.to(data.room).emit("recive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("User disconnect", socket.id)
  })
})

app.get('/', (req, res) => {
  res.send('ola')
})

server.listen(3333, () => console.log('Server running!'))
const http = require("http")

//
module.exports = (app, sessionMiddleware) => {

  const { Server } = require('socket.io');
  const server = http.createServer(app);
  const io = new Server(server);
  const messageSchema = require('../schemas/messageSchema');
  //

  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  io.use(wrap(sessionMiddleware));


  ////


  io.on('connection', (socket) => {

    let onlineUsers = socket.client.conn.server.clientsCount;
    io.sockets.emit('online-users', onlineUsers);
    socket.on('disconnect', () => {
      let onlineUsers = socket.client.conn.server.clientsCount;
      io.sockets.emit('online-users', onlineUsers);
    })

    socket.on('chat-message', async(data) => {

      // + name
      const session = socket.request.session,
        nameOfUser = session.username;
      const objNameOfUser = { name: `${nameOfUser}` }
      var dataa = Object.assign(data, objNameOfUser)

      const message = new messageSchema(dataa)
      await message.save()

      io.sockets.emit("chat-message", message)

    })

  })

  return server;
}


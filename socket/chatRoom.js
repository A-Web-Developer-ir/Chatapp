const http = require("http")
const { Server } = require('socket.io');
module.exports = (app, MongoClient, url, sessionMiddleware) => {
  const server = http.createServer(app);
  const io = new Server(server);

  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  io.use(wrap(sessionMiddleware));

  io.on('connection', (socket) => {
    
    let onlineUsers = socket.client.conn.server.clientsCount;
    io.sockets.emit('online-users', onlineUsers);
    socket.on('disconnect', () => {
      let onlineUsers = socket.client.conn.server.clientsCount;
      io.sockets.emit('online-users', onlineUsers);
    })

    socket.on('chat-message', (data) => {
      const session = socket.request.session,
        nameOfUser = session.username;
      const objNameOfUser = { name: `${nameOfUser}` }
      var newData = Object.assign(data, objNameOfUser)
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("chatApp");
        dbo.collection("chatList").insertOne(newData, function (err) {
          if (err) throw err;
          db.close();
        });
      });
      io.sockets.emit('chat-message', newData);
    })
  })

  return server;
}


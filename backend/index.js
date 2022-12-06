const app = require("./app")
const socketio = require("socket.io")
const jwt = require("jsonwebtoken")
const { User: UserModel } = require("./models")
const server = require("http").createServer(app)
const pubsub = require("./lib/pubsub")

const JWT_PASS = process.env.JWT_PASS || 'acessq1w2e3r4password'


const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const liveData = io.of("/v1")

liveData.use((socket, next) => {
  if (socket.handshake.auth && socket.handshake.auth.token) {
    jwt.verify(socket.handshake.auth.token, JWT_PASS, function(err, user) {
      if(err) return next(new Error('Authentication error'))
      UserModel.findOne(user)
        .populate("profile")
        .then(u => {
          if(u) {
            socket.profile = u.profile
            next()
          } else {
            next(new Error("Authentication error"))
          }
        })
    })
  } else {
    next(new Error("Authentication error"));
  }
})

liveData.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log(socket.connected)
  })
  socket.on("error", (err) => {
    console.error(err)
  })
  socket.emit("connect_profile", socket.profile)
})

pubsub
  .sub()
  .then((sub) => {
    sub.on("message", (message, content, ackOrNack) => {
      ackOrNack();
      Object.entries(Object.fromEntries(liveData.sockets))
        .filter(([, v]) =>
          content.keys.includes(v.profile._id.toString())
        )
        .map(([k, v]) => {
          return v.emit(content.type, content.payload);
        })
    })
  })
  .catch(console.error)

server.listen(process.env.PORT || 4000, () => {
  console.log(`SERVER: listening on http://localhost:${process.env.PORT || 4000}`);
})

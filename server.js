const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const socket = require('socket.io');
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
const Octavian = require('octavian');

const server = app.listen(PORT, () => {
  console.log('======================================');
  console.log("   InstaJam Running on Port: ", PORT);
  console.log('======================================');
});

const io = socket(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log("Socket Connected: ", socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('sound-pad', (play) => {
    io.sockets.emit('sound-pad', play)
  });
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// io.on('connection', (socket) => {
//   console.log('Socket Connected: ', socket.id);
//   socket.on('disconnect', () => {
//     console.log('An artist has disconnected.');
//     io.emit("chat message", "An artist has disconnected.");
//   });
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
//   socket.broadcast.emit('hi');
// });

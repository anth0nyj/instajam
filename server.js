const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Octavian = require('octavian');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  console.log("An artist has joined!");
  socket.on('disconnect', () => {
    console.log('An artist has disconnected.');
    io.emit("chat message", "An artist has disconnected.");
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.broadcast.emit('hi');
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log("InstaJam Running on Port: ", PORT);
});

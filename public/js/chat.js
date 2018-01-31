// Connection
const socket = io.connect('http://localhost:3001');

$(() => {

  // Query DOM
  const $message = $('#message');
  const $handle = $('#handle');
  const $btn = $('#send');
  const $output = $('#output');

  // Emit Events

  $btn.click(() => {
    socket.emit('chat', {
      handle: $handle[0].value,
      message: $message[0].value
    });
  });

  // Listen for Events
  socket.on('chat', (data) => {
    $output.append('<p><strong>' + data.handle + ' </strong>' + data.message + '</p>');
  });
});

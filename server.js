const path = require('path');
const http =  require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {

    // Welcome current user
    socket.emit('message', 'Welcome to TomChat!');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Run when client disconnects
    socket.on('disconnect', () => {
        // Broadcast when a user disconnects
        io.emit('message', 'A user has left the chat');
    });

    // Listen for a chat message
    socket.on('chatMessage', (message) => {
        io.emit('message', message);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
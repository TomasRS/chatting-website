const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUserById, userLeaves, getRoomUsers } = require('./utils/users');
let values = require('./utils/values.json');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on(values.connectionEventName, socket => {
    socket.on(values.joinRoomEventName, ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // Welcome current user
        socket.emit(values.messageEventName, formatMessage(values.chatBotName, `Welcome to the ${room} room!`));

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit(values.messageEventName, formatMessage(values.chatBotName, `${user.name} has joined the chat`));

        // Send users and room info
        io.to(user.room).emit(values.roomUsersEventName, {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for a chat message
    socket.on(values.chatMessageEventName, (message) => {
        const user = getCurrentUserById(socket.id);
        io.to(user.room).emit(values.messageEventName, formatMessage(user.name, message));
    });

    // Run when client disconnects
    socket.on(values.disconnectEventName, () => {
        const user = userLeaves(socket.id);
        if(user){
            // Broadcast when a user disconnects
            io.to(user.room).emit(values.messageEventName, formatMessage(values.chatBotName, `${user.name} has left the chat`));

            // Send users and room info
            io.to(user.room).emit(values.roomUsersEventName, {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
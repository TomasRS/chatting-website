const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const roomUsers = document.getElementById('users');

// Get username and room from URL query
const { username, room } = Qs.parse(location.search, {
   ignoreQueryPrefix: true 
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users from room
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputRoomUsers(users);
});

// Message for server
socket.on('message', message => {
    outputMessage(message);

    // Scroll down to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get message text from form
    const message = event.target.elements.msg.value;

    // Emitting a message to the server
    socket.emit('chatMessage', message);

    // Clear input
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add((message.isChatBot || message.username !== username)? 'other': 'me');
    div.innerHTML = `<p class="meta ${message.isChatBot? 'from-chatbot': ''}">${message.username}<span> - ${message.time}</span></p>
                    <p class="text ${message.isChatBot? 'from-chatbot': ''}">${message.text}</p>`;

    chatMessages.appendChild(div);
}

// Add room name to DOM
function outputRoomName(room){
    roomName.innerText = room;
}

// Add room users to DOM
function outputRoomUsers(users){
    roomUsers.innerHTML = `${users.map(user => `<li>${user.name}</li>`).join('')}`;
}
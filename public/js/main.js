const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('message', message => {
    console.log(message);
});

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get message text from form
    const message = event.target.elements.msg.value;

    // Emitting a message to the server
    socket.emit('chatMessage', message);
});
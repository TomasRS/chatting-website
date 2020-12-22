const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

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
    div.innerHTML = `<p class="meta">${message.username} - <span>${message.time}</span></p>
                    <p class="text">${message.text}</p>`;

    chatMessages.appendChild(div);
}
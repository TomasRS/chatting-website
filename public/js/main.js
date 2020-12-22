const chatForm = document.getElementById('chat-form');

const socket = io();

// Message for server
socket.on('message', message => {
    outputMessage(message);
});

// Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
                    <p class="text">${message}</p>`;

    document.querySelector('.chat-messages').appendChild(div);
}


// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get message text from form
    const message = event.target.elements.msg.value;

    // Emitting a message to the server
    socket.emit('chatMessage', message);
});
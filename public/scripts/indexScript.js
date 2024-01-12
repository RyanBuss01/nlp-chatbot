const socket = io("http://localhost:3000");


function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();

    if (message !== '') {
        var chatContainer = document.querySelector('.chat-container');
        var messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = '<span class="user">You:</span><span class="content">' + message + '</span>';
        chatContainer.appendChild(messageElement);
        socket.emit('sendMessage', message);
        messageInput.value = '';
    }
}

// Unused function to add chatroom messages on the other side
function addChatroomMessage(message) {
    var chatContainer = document.querySelector('.chat-container');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message', 'other-message');
    messageElement.innerHTML = '<span class="user">Chatroom:</span><span class="content">' + message + '</span>';
    chatContainer.appendChild(messageElement);
}


socket.on('newMessage', function (data) {
    const textDecoder = new TextDecoder();
    const message = textDecoder.decode(new Uint8Array(data));
    
    var chatContainer = document.querySelector('.chat-container');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message', 'other-message');
    messageElement.innerHTML = '<span class="user">Chatroom:</span><span class="content">' + message + '</span>';
    chatContainer.appendChild(messageElement);
})
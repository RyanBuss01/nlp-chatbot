const socket = io("http://localhost:3000");
const selection = document.getElementById('bot-select');
var botName = selection.value;

function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();

    if (message !== '') {
        var chatContainer = document.querySelector('.chat-container');
        var messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = '<span class="user">You:</span><span class="content">' + message + '</span>';
        chatContainer.appendChild(messageElement);
        var data = {
            message: message,
            botName: botName
        }
        socket.emit('sendMessage', data);
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
    messageElement.innerHTML = `<span class="user">${botName=='friend'? "friendly" : botName}-Bot:</span><span class="content">` + message + `</span>`;
    chatContainer.appendChild(messageElement);
})

function handleKeyPress(event) {
    if (event.keyCode === 13) { // Check if Enter key is pressed (key code 13)
        event.preventDefault(); // Prevent the default form submission behavior
        sendMessage(); // Call the sendMessage function when Enter is pressed
    }
}

selection.addEventListener('change', function () {
    botName = selection.value
    document.querySelector('.chat-container').innerHTML = '';
});


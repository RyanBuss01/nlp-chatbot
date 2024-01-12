const { spawn } = require('child_process');

var socketMethods = {
    sendMessage: async (socket, query)  =>  {
        console.log(`Message received: ${query}`);
        const pythonProcess = spawn('python3', ['python/chat.py', query]);

         pythonProcess.stdout.on('data', (data) => {
            socket.emit('newMessage', data);
        });

    }
}

module.exports = socketMethods;
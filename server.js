const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();

let port = 3000;

const messages = [];

io.on('connect', socket => {
    // Log token
    socket.on('token', socket => console.log(`User connected with socket id ${socket.id}`));
    // Store message and push update
    socket.on('message', data => {
        messages.push({ author: 'Anon', message: data.message });
        io.sockets.emit('send-message', {
            author: data.author, message: data.message
        });
    });

    socket.emit("load", {
        messages: messages
    });
});

nextApp.prepare().then(() => {

    app.get('*', (req, res) => handler(req, res));

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Server launched on port ${port}`);
    });
});
const app = require('express')();
const server = require('http').Server(app);
const socket = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();

let port = 3000;

socket.on('connect', socket => {
    console.log(`User connected on ip ${socket.request.connection.remoteAddress}`);
    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
    socket.emit('now', {
        message: "Epic gamer moment!"
    });
});

nextApp.prepare().then(() => {
  
    app.get('*', (req, res) => {
        return handler(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Server launched on port ${port}`);
    });
});
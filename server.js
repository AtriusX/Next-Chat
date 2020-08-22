const app = require('express')();
const server = require('http').Server(app);
const socket = require('socket.io')(server);
const next = require('next');
const uuid = require('uuid');

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();

let port = 3000;

socket.on('connect', socket => {
    socket.on('token', socket => {
        console.log(`User connected with socket id ${socket.id}`);
    });
    socket.on('disconnect', () => {
        console.log("User disconnected");
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
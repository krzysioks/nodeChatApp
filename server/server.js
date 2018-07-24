require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

console.log(`${__dirname}/../public`);
console.log(publicPath);

const app = express();
const server = http.createServer(app);
//creating socketIO instance, passing server as an argument to inidcate, that we want to run sockets on this server instance
//io - web socket server
const io = socketIO(server);

//used middleware to serve frontend public html
app.use(express.static(publicPath));

//registering an io event
io.on('connection', socket => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user just joined',
        createdAt: new Date().getTime()
    });

    //IMPORTANT
    //socket.emit - emits to single connection (single connected user)
    //io.emit - emits to all user connected
    //socket.broadcast.emit - emits event to all connected useres except myself

    //emitting new chat message
    // socket.emit('newMessage', {
    //     from: 'Janet',
    //     text: 'Chat msg',
    //     createdAt: new Date().getTime()
    // });
    //emiting new event by server
    // socket.emit('newEmail', {
    //     from: 'Mike@test.com',
    //     text: 'Test msg.',
    //     createdAt: new Date().getTime()
    // });

    // socket.on('createEmail', ({ to, title, body }) => {
    //     console.log('createEmail', to, title, body);
    // });

    socket.on('createMessage', ({ from, text }) => {
        console.log(`createMessage from: ${from} with text: ${text}`);

        //emits event to all connected useres except myself
        // socket.broadcast.emit('newMessage', {
        //     from,
        //     text,
        //     createdAt: new Date().getTime()
        // });
        io.emit('newMessage', {
            from,
            text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnecting', socket => {
        console.log('User disconnected');
    });
});

//listen to the requests
server.listen(process.env.PORT, () => {
    console.info(`Server is on port ${process.env.PORT}`);
});

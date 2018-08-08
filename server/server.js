require('./config/config');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

//const publicPath = path.join(__dirname, '../public');
const publicPath = path.join(__dirname, '../dist');

// console.log(`${__dirname}/../public`);
// console.log(publicPath);

const app = express();
const server = http.createServer(app);
//creating socketIO instance, passing server as an argument to inidcate, that we want to run sockets on this server instance
//io - web socket server
const io = socketIO(server);
const users = new Users();

//used middleware to serve frontend public html
//app.use(express.static(publicPath));
//app.use(bodyParser.json());
app.use(express.static(publicPath));

//registering an io event
io.on('connection', socket => {
    console.log('New user connected');

    socket.on('validateJoin', ({ userName, roomName }, callback) => {
        if (!isRealString(userName) || !isRealString(roomName)) {
            return callback('Room and user names are required');
        }

        callback();
    });

    socket.on('joinRoom', ({ userName, roomName }, callback) => {
        console.log('userName: ', userName, 'roomName: ', roomName);

        //joining to the room
        socket.join(roomName);
        //remove user from any other previously joined rooms
        users.removeUser(socket.id);
        //add user, that joins the room to users object
        users.addUser(socket.id, userName, roomName);

        io.to(roomName).emit('updateUserList', users.getUserList(roomName));

        //leaving room
        //socket.leave();

        //io.emit - to emit to all connected users from specific room -> io.to(roomName).emit)
        //socket.broadcast.emit - to emit to all users except myself from specific room -> socket.broadcast.to(roomName).emit
        socket.broadcast.to(roomName).emit('newMessage', generateMessage('Admin', `${userName} has joined`));

        callback();
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

    socket.on('createMessage', ({ from, text }, callback) => {
        console.log(`createMessage from: ${from} with text: ${text}`);

        //emits event to all connected useres except myself
        // socket.broadcast.emit('newMessage', {
        //     from,
        //     text,
        //     createdAt: new Date().getTime()
        // });
        io.emit('newMessage', generateMessage(from, text));
        callback('All Ok');
    });

    socket.on('createLocationMessage', ({ lat, long }) => {
        io.emit('newMessage', generateLocationMessage('Admin', lat, long));
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);

        if (Object.keys(user).length) {
            io.to(user.roomName).emit('updateUserList', users.getUserList(user.roomName));
            io.to(user.roomName).emit(
                'newMessage',
                generateMessage('Admin', `${user.userName} left the ${user.roomName} room.`)
            );
        }
    });
});

//listen to the requests
server.listen(process.env.PORT, () => {
    console.info(`Server is on port ${process.env.PORT}`);
});

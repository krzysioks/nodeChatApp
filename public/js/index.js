//loading io library and creating socket var to establish socket connection with server
var socket = io();
socket.on('connect', function() {
    console.log('connected to server');
    // socket.emit('createEmail', {
    //     to: 'testy@test.pl',
    //     title: 'This is create email event',
    //     body: 'We successfully emitted createEmail event.'
    // });

    //
    socket.emit('createMessage', {
        from: 'Krzysiek',
        text: 'This is create message text'
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

//to catch socket.emit from server side, on client side use socket.on to register event with the same name as emited by server
// socket.on('newEmail', function(email) {
//     console.log('New email', email);
// });

socket.on('newMessage', function(msg) {
    console.log('New msg received', msg);
});

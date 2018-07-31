import { h, render, Component } from 'preact';
import socket from 'socket.io-client';
// import App from './app';

class Index extends Component {
    constructor() {
        super();
        this.io = socket();
    }
    componentWillMount() {
        this.io.on('connect', () => {
            console.log('connected to server');
            // socket.emit('createEmail', {
            //     to: 'testy@test.pl',
            //     title: 'This is create email event',
            //     body: 'We successfully emitted createEmail event.'
            // });

            // socket.emit('createMessage', {
            //     from: 'Krzysiek',
            //     text: 'This is create message text'
            // });
        });

        this.io.on('disconnect', () => {
            console.log('disconnected from server');
        });

        //to catch socket.emit from server side, on client side use socket.on to register event with the same name as emited by server
        // socket.on('newEmail', function(email) {
        //     console.log('New email', email);
        // });

        this.io.on('newMessage', msg => {
            console.log('New msg received', msg);
        });

        this.io.emit('createMessage', { from: 'Admin', text: 'hello new ones' }, response => {
            console.log(response);
        });
    }
    render() {
        return (
            <div>
                <p>This is chat app welcome page</p>
            </div>
        );
    }
}
render(<Index />, document.body);

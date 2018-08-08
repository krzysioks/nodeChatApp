import { h, render, Component } from 'preact';
import socket from 'socket.io-client';
import { route } from 'preact-router';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import FormField from 'preact-material-components/FormField';
import 'preact-material-components/Radio/style.css';
import 'preact-material-components/FormField/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import MessageViewer from './components/messageViewer';
import Sidebar from './components/sidebar';

import './style.css';

export default class Chat extends Component {
    constructor() {
        super();
        this.io = socket();

        this.onClickEvent = this.onClickEvent.bind(this);
        this.onKeyUpEvent = this.onKeyUpEvent.bind(this);
        this.onClickLocationEvent = this.onClickLocationEvent.bind(this);

        this.state = {
            textAreaValue: '',
            messageList: [], //lsit of objects {from: <String>, text: <String>}
            geoMsg: '',
            isSendDisabled: true,
            users: []
        };
    }
    componentWillMount() {
        this.io.on('connect', () => {
            console.log('connected to server');
            // socket.emit('createEmail', {
            //     to: 'testy@test.pl',
            //     title: 'This is create email event',
            //     body: 'We successfully emitted createEmail event.'
            // });
        });

        this.io.on('disconnect', () => {
            console.log('disconnected from server');
        });

        this.io.on('updateUserList', users => {
            this.setState({ users });
        });

        //to catch socket.emit from server side, on client side use socket.on to register event with the same name as emited by server
        // socket.on('newEmail', function(email) {
        //     console.log('New email', email);
        // });

        this.io.on('newMessage', msg => {
            console.log('New msg received', msg);
            this.setState({
                messageList: [...this.state.messageList, msg]
            });
        });
    }
    componentDidMount() {
        const msg = {
            from: 'Admin',
            text: `Welcome to chat app ${this.props.userName}`
        };
        this.setState({
            messageList: [...this.state.messageList, msg]
        });
        this.io.emit('joinRoom', { userName: this.props.userName, roomName: this.props.roomName }, () => {});
    }
    onClickEvent() {
        const msg = { text: this.state.textAreaValue };
        //createMessage event triggeres newMessage event which is subscribed in componentWillMount
        this.io.emit('createMessage', msg, response => {
            console.log(response);
        });
        this.setState({
            textAreaValue: '',
            isSendDisabled: true,
            geoMsg: ''
        });
    }
    onClickLocationEvent() {
        if (!navigator.geolocation) {
            this.setState({ geoMsg: 'Geolocation not supported' });
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                this.io.emit('createLocationMessage', {
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
            },
            () => {
                this.setState({ geoMsg: 'Unable to fetch location' });
            }
        );
    }
    onKeyUpEvent(evt) {
        this.setState({ textAreaValue: evt.target.value, isSendDisabled: !evt.target.value });
    }
    render(props, state) {
        return (
            <div class="displayFlex flexRow chatComponentContainer">
                <Sidebar users={state.users} />
                <div class="displayFlex flexColumn">
                    <MessageViewer messageList={state.messageList} />
                    <FormField className="flexRow flexStart messageBox">
                        <TextField
                            onKeyUp={this.onKeyUpEvent}
                            placeholder="type message"
                            id="textMsg"
                            textarea={true}
                            className="msgPlaceholder"
                            value={state.textAreaValue}
                            autofocus
                            autocomplete="off"
                        />
                    </FormField>
                    <FormField className="flexStart">
                        <Button onClick={this.onClickEvent} disabled={state.isSendDisabled}>
                            Send
                        </Button>
                        <Button onClick={this.onClickLocationEvent}>Send Location</Button>
                        <div style="color: red; font-wight: bold;">{state.geoMsg}</div>
                    </FormField>
                </div>
            </div>
        );
    }
}

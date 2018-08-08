import { h, render, Component } from 'preact';
import { route } from 'preact-router';
import socket from 'socket.io-client';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import FormField from 'preact-material-components/FormField';
import 'preact-material-components/Radio/style.css';
import 'preact-material-components/FormField/style.css';

import './style.css';

export default class Login extends Component {
    constructor() {
        super();
        this.io = socket();
        this.onClickEvent = this.onClickEvent.bind(this);
        this.onKeyUpEvent = this.onKeyUpEvent.bind(this);
        this.state = {
            userName: '',
            roomName: '',
            isJoinDisabled: true,
            msg: ''
        };
    }
    onClickEvent() {
        this.io.emit('validateJoin', { userName: this.state.userName, roomName: this.state.roomName }, err => {
            if (err) {
                this.setState({
                    msg: 'Room and user names are required'
                });
                return;
            }

            route(`/chat/${this.state.userName}/${this.state.roomName}`, false);
        });
    }
    onKeyUpEvent(evt) {
        this.setState({ [evt.target.id]: evt.target.value, isJoinDisabled: !evt.target.value });
    }
    render(props, state) {
        return (
            <div class="displayFlex flexCenter">
                <div class="displayFlex flexColumn messageBox">
                    <div style="color: red; font-wight: bold;">{state.msg}</div>
                    <span class="headline">Join Chat</span>
                    <FormField className="flexColumn flexStart messageBox">
                        <TextField label="Name" id="userName" type="text" onKeyUp={this.onKeyUpEvent} />
                        <TextField label="Room" id="roomName" type="text" onKeyUp={this.onKeyUpEvent} />
                    </FormField>
                    <FormField className="flexStart">
                        <Button onClick={this.onClickEvent} disabled={state.isJoinDisabled}>
                            Join
                        </Button>
                    </FormField>
                </div>
            </div>
        );
    }
}

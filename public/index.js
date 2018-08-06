import { h, render, Component } from 'preact';
import { Router, route } from 'preact-router';
import { createHashHistory } from 'history';

import Chat from './chat';
import Login from './login';

import './style.css';

class Index extends Component {
    constructor() {
        super();
    }
    render(props, state) {
        return (
            <Router history={createHashHistory()}>
                <Login path="/" />
                <Chat path="/chat/:userName/:roomName" />
            </Router>
        );
    }
}
render(<Index />, document.body);

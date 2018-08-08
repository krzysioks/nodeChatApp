import { h, Component } from 'preact';
import './../style.css';

export default class Sidebar extends Component {
    constructor() {
        super();
    }
    render({ users }, state) {
        return (
            <div class="sidebar">
                <div class="headline">people:</div>
                <ol>
                    {users.map((user, idx) => {
                        return (
                            <li key={idx}>
                                <span class="user">{user}</span>
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}

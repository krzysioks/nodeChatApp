import { h, Component } from 'preact';
import './../style.css';

export default class Sidebar extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div class="sidebar">
                <div class="headline">people:</div>
            </div>
        );
    }
}

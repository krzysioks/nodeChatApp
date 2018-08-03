import { h, Component } from 'preact';
import moment from 'moment';
import './../style.css';

export default class MessageViewer extends Component {
    constructor() {
        super();
    }
    render({ messageList }) {
        return (
            <div class="messageView">
                <ol>
                    {messageList.map(({ from, text, lat, long, createdAt }, idx) => {
                        return lat && long ? (
                            <li key={idx}>
                                <span class="user">{from}</span>
                                <span class="time">{moment(createdAt).format('k:mm A')}:</span>
                                <a target="_blank" href={`https://www.google.com/maps?q=${lat},${long}`}>
                                    location
                                </a>
                            </li>
                        ) : (
                            <li key={idx}>
                                <span class="user">{from}</span>
                                <span class="user time">{moment(createdAt).format('k:mm A')}:</span>
                                {text}
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}

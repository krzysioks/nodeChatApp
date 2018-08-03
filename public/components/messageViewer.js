import { h, Component } from 'preact';
import './../style.css';

export default class MessageViewer extends Component {
    constructor() {
        super();
    }
    render({ messageList }) {
        return (
            <div class="messageView">
                <ol>
                    {messageList.map(({ from, text, lat, long }, idx) => {
                        return lat && long ? (
                            <li key={idx}>
                                <span class="user">{`${from}: `} </span>
                                <a target="_blank" href={`https://www.google.com/maps?q=${lat},${long}`}>
                                    location
                                </a>
                            </li>
                        ) : (
                            <li key={idx}>
                                <span class="user">{from}</span>
                                {`: ${text}`}
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}

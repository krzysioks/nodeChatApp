import { h, Component } from 'preact';
import moment from 'moment';
import './../style.css';

export default class MessageViewer extends Component {
    constructor() {
        super();
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }
    scrollToBottom() {
        const lastMsgHeight = this.lastMsgRef ? this.lastMsgRef.getBoundingClientRect().height : 0;

        if (this.lastMsgRef && this.base.clientHeight + this.base.scrollTop + lastMsgHeight >= this.base.scrollHeight) {
            this.lastMsgRef.scrollIntoView({ behavior: 'smooth' });
        }
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render({ messageList }) {
        return (
            <div class="messageView">
                <ol>
                    {messageList.map(({ from, text, lat, long, createdAt }, idx) => {
                        const liProps = {
                            key: idx
                        };
                        if (idx === messageList.length - 1) {
                            liProps.ref = domRef => {
                                if (domRef) {
                                    this.lastMsgRef = domRef;
                                }
                            };
                        }
                        return lat && long ? (
                            <li {...liProps}>
                                <span class="user">{from}</span>
                                <span class="time">{moment(createdAt).format('k:mm A')}:</span>
                                <a target="_blank" href={`https://www.google.com/maps?q=${lat},${long}`}>
                                    location
                                </a>
                            </li>
                        ) : (
                            <li {...liProps}>
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

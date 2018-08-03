import { h, Component } from 'preact';

export default class MessageViewer extends Component {
    constructor() {
        super();
    }
    render({ messageList }) {
        return (
            <div>
                <ol>
                    {messageList.map(({ from, text, lat, long }, idx) => {
                        return lat && long ? (
                            <li key={idx}>
                                {`${from}: `}{' '}
                                <a target="_blank" href={`https://www.google.com/maps?q=${lat},${long}`}>
                                    location
                                </a>
                            </li>
                        ) : (
                            <li key={idx}>{`${from}: ${text}`}</li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}

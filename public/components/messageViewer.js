import { h, Component } from 'preact';

export default class MessageViewer extends Component {
    constructor() {
        super();
    }
    render({ messageList }) {
        return (
            <div>
                <ol>
                    {messageList.map(({ from, text }, idx) => {
                        return <li key={idx}>{`${from}: ${text}`}</li>;
                    })}
                </ol>
            </div>
        );
    }
}

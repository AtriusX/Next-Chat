import ReactDOM from 'react-dom';
import { Component } from 'react';
import io from 'socket.io-client';
import Message from './Message';
import styles from '../styles/MessageBox.module.css';

type Props = {
    messagebox: string
}

export default class MessageBox extends Component<Props, { messageBox: HTMLElement }> {
    private socket;
    state: { messageBox: HTMLElement, messages: any }

    componentDidMount() {
        this.socket = io();
        this.setState({
            messageBox: document.getElementById(this.props.messagebox)
        })
        this.socket.on('send-message', data => {
            let temp = document.createElement("div");    
            let box = this.state.messageBox;
            ReactDOM.render(<Message author={data.author} message={data.message} />, temp)
            box.appendChild(temp);
            box.scrollTop = box.scrollHeight - box.clientHeight;
        });
    }

    render() {
        return <div className={styles.container}>
            <form onSubmit={this.submit}>
                <input type="text" id={styles.message} />
                <button type="submit">Send</button>
            </form>
        </div>
    }

    private submit = (event) => {
        event.preventDefault();
        let box = (document.getElementById(styles.message) as HTMLInputElement)
        if (box.value) {
            this.socket.emit('message', {
                message: box.value
            });
            box.value = "";
        }
    }
}
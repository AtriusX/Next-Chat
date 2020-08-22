import { Component } from 'react';
import io from 'socket.io-client';
import styles from '../styles/MessageBox.module.css';

type Props = {
    messagebox: string
}

export default class MessageBox extends Component<Props, { messageBox: HTMLElement }> {
    private socket;
    componentDidMount() {
        this.socket = io();
        this.setState({
            messageBox: document.getElementById(this.props.messagebox)
        })
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
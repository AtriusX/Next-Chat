import ReactDOM from 'react-dom';
import { Component } from 'react';
import io from 'socket.io-client';
import Message from './Message';
import styles from '../styles/MessageBox.module.css';

type Props = {
    messagebox: string
}

export default class MessageBox extends Component<Props> {
    private socket;
    state: { messageBox: HTMLElement }

    componentDidMount() {
        this.socket = io();
        
        this.socket.on('load', socket => {
            console.log(socket);
            this.setState({
                messageBox: document.getElementById(this.props.messagebox), 
            });
            for (let msg of socket.messages) {
                this.createMessage(msg);
            }
        });
        this.socket.on('send-message', data => this.createMessage(data));
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
                author: localStorage.getItem("id").split("-")[0], message: box.value
            });
            box.value = "";
        }
    }

    private createMessage = (data) => {
        let temp = document.createElement("div");    
        let box = this.state.messageBox;
        ReactDOM.render(<Message author={data.author} message={data.message} />, temp)
        box.appendChild(temp);
        box.scrollTop = box.scrollHeight - box.clientHeight;
    }
}
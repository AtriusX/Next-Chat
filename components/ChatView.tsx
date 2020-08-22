import { Component } from 'react';
import { v4 } from 'uuid';
import  io from 'socket.io-client';
import MessageBox from './MessageBox';

export default class ChatView extends Component {
    state: { id: string };
    private socket;

    constructor(props) {
        super(props);
        this.state = {
            id: undefined
        }
    }

    componentDidMount() {
        this.socket = io();
        this.socket.on('connect', () => {
            let id = localStorage.getItem("id") || v4();
            localStorage.setItem("id", id);
            this.setState({
                id: id
            });

            this.socket.emit('token', {
                id: id
            });
        })
    }

    render() {
        return <div className={"chatbox"}>
            <div id="messages">
            </div>
            <MessageBox messagebox={"messages"}/>
        </div>
    }
}
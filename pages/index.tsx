import { Component } from 'react';
import io from 'socket.io-client';
import { v4 } from 'uuid';

export default class Index extends Component {
  state: { id: typeof v4 };
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
    return(<>
      <title>Test</title>
      <h1>{this.state.id}</h1>
    </>)
  }
}
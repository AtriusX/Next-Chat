import { Component } from 'react';
import io from 'socket.io-client';

export default class Index extends Component {
  state: { hello: string };
  socket;

  constructor(props) {
    super(props);
    this.state = {
      hello: ''
    }
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('now', data => {
      console.log(data.message);
      this.setState({
        hello: data.message
      });
    })
  }

  render() {
    return(<>
      <title>Test</title>
      <h1>{this.state.hello}</h1>
    </>)
  }
}
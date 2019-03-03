import React, { Component } from 'react';
import './User';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './../App.js';


class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = { messages: [],
        username: "",
        content: "",
        sentAt: "",
        roomId: "" };
      this.messagesRef = this.props.firebase.database().ref('messages');
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomId: "" });
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  render() {
    const activeRoom = this.props.activeRoom;

    const messageBar = (
      <form onSubmit={this.createMessage}>
        <div className="form-group">
          <textarea className="form-control" type="text" value={this.state.content} placeholder="Enter Message" onChange={this.handleChange}></textarea>
        </div>
        <div>
          <input className="btn btn-primary" type="submit" value="Send" />
        </div>
      </form>
    );

    const messageList = (
      this.state.messages.map((message) => {
        if (message.roomId === activeRoom) {
          return <div className="card text-white bg-secondary mb-3">
            <div className="card-header">{message.username}:</div>
            <p className="card-text" key={message.key}> {message.content}</p>
          </div>
        }
        return null;
      })
    );

    return (
      <div>
        <div>{messageList}</div>
        <div>{messageBar}</div>
      </div>
    );
  }
}

export default MessageList;

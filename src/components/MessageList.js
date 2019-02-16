import React, { Component } from 'react';
import './../App.js';


class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = { messages: [], username: "", content: "", sentAt: "", roomId: "" };
      this.messagesRef = this.props.firebase.database().ref('messages');
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: "user",
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
    this.setState({ username: "", content: "", sentAt: "", roomId: ""});
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  render() {
    const activeRoom = console.log(this.props.activeRoom);

    const messageBar = (
      <form onSubmit={this.createMessage}>
        <input type="text" value={this.state.content} placeholder="Enter Message" onChange={this.handleChange} />
        <input type="submit" value="Send" />
      </form>
    );

    const messageList = (
      this.state.messages.map((message) => {
          return <li key={message.key}><h3>{message.username}:</h3>{message.content}</li>
      })
    );

    return (
      <div>
        <div>{messageBar}</div>
        <div>{messageList}</div>
      </div>
    );
  }
}

export default MessageList;
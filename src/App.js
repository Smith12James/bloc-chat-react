import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
   apiKey: "AIzaSyAZswl-OLtlqyy0mtK7dCZ8tSQc1kOCWhM",
   authDomain: "bloc-chat-8b196.firebaseapp.com",
   databaseURL: "https://bloc-chat-8b196.firebaseio.com",
   projectId: "bloc-chat-8b196",
   storageBucket: "bloc-chat-8b196.appspot.com",
   messagingSenderId: "914748310621"
 };
 firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeRoom: "" };
    this.activeRoom = this.activeRoom.bind(this);
  }

    activeRoom(room) {
      this.setState({ activeRoom: room });
    }

  render() {
    const showMessage = this.state.activeRoom;

    return (
      <div>
        <h1>{this.state.activeRoom.name || "Select A Room"}</h1>
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        { showMessage ?
        (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} />)
        : (null)
        }
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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
    this.state = {
      activeRoom: "",
      user: null,
    };
    this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }


  activeRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({
      user: user
    });
  }

  render() {
    const showMessage = this.state.activeRoom;
    const currentUser = this.state.user === null? "Guest" : this.state.user.displayName;

    return (
      <div className="container-fluid">
        <div className="row">
          <h1 className="col-9 display-4 text-light">{this.state.activeRoom.name || "Select A Room"}</h1>
          <div className ="col-3 text-align-right text-light">{currentUser}
            <User firebase={firebase} setUser={this.setUser} />
          </div>
        </div>
        <div className="row">
          <RoomList className="col-4" firebase={firebase} activeRoom={this.activeRoom} />
          { showMessage ?
          (<MessageList className="col-8" firebase={firebase} activeRoom={this.state.activeRoom.key} user={currentUser} />)
          : (null)
          }
        </div>
      </div>
    );
  }
}

export default App;

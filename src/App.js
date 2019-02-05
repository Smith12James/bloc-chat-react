import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">Bloc Chat</header>
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;

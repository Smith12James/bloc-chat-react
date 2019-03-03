import React, { Component } from 'react';
import './../App.js';


class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: "",
        rooms: []
      };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.name });
    this.setState({ name: "" });
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  render() {
    const roomForm = (
      <form onSubmit={this.createRoom}>
        <input type="text" value={this.state.name} placeholder="Enter Room Name" onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );

    const roomList = this.state.rooms.map((room) =>
      <ul className="list-group list-group-flush"><li className="list-group-item" key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}</li></ul>
    );

    return(
      <div>
        <div className="room-form">{roomForm}</div>
        <ul className="room-list">{roomList}</ul>
      </div>
    );
  }
}

export default RoomList;

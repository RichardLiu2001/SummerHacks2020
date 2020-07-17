import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <Message/>
      </header>
      
    </div>
  );
}

class Message extends Component{
  ws = new WebSocket("ws://localhost:8080/ws")

  constructor(props){
    super(props)
    this.state = {data : "nothing yet!"};
  }
  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected to the server")
      this.ws.send("Salutations!")
    }

    this.ws.onclose = () => {
      console.log("connection lost")
    }

    this.ws.onmessage = evt => {
      //const message = JSON.parse(evt.data)
      const message = evt.data
      this.setState({data:message})
      console.log(message)
    }
  }

  render(){
    return <h3>Your lucky number is {this.state.data}</h3>
  }

}



export default App;

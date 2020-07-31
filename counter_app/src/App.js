import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Line} from 'react-chartjs-2'



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
  prevData = []
  

  constructor(props){
    super(props)
    this.state = {data : "nothing yet!"};
    this.prevData = []
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

      if(this.prevData.length >= 4){
        this.prevData.shift();
      }
      this.prevData.push(message)
    }
  }

  render(){

    const chart = {
      labels: ['20s ago', '15s ago', '10s ago', '5s ago'],
      datasets: [
        {
          label: 'Lucky Number',
          fill: false,
          lineTension: .8,
          backgroundColor: 'rgba(50,50,150,1)',
          borderColor: 'rgba(25,25,100,1)',
          pointBorderColor: 'rgba(25,25,100,.5)',
          borderWidth: 2,
          data: [this.prevData[0], this.prevData[1], this.prevData[2], this.prevData[3]]
        }
      ]
    }

  return(
    <div>
      <h3>Your lucky number is {this.state.data}</h3>
      <p>Previously {this.prevData[0]}, {this.prevData[1]}, {this.prevData[2]}, {this.prevData[3]}</p>
      <Line
        data={chart}
        options={{
          title:{
            display:true,
            text:"Previous Lucky Numbers",
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          },
          responsive:true,
          maintainAspectRatio: false
        }}
      />
    </div>
    )
  }

}



export default App;

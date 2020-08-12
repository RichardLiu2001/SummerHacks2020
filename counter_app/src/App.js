import React, { Component } from 'react';
import './App.css';
import {Line, Bar} from 'react-chartjs-2'
import {Doughnut} from 'react-chartjs-2';
//import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';
//import Box from '@material-ui/core/Box';
//import Collapse from '@material-ui/core/Collapse';
////import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
//import Paper from '@material-ui/core/Paper';
//import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
//import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import {Table, TableBody, TableCell, TableContainer} from 'react-bootstrap/Table';
import logo from './logo.svg'; // Tell webpack this JS file uses this image
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';


// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
// });


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
      <Container/>
    </div>
      </header>
      
    </div>
  );
}


class Container extends Component {

  constructor() {
    super()
    this.state = {
      jsonmessage : "Nothing yet",
      todayData : [0],
      dayNames : [],
      hourAverages : [],
      dayAverages : [],
      dayGraphs : [],
      clickedButton : 0

    }
  }


  parse(jsonmessage) {
  
    var days = []
  
    var hourData = []
  
    var dayData = []
    
    for (var i = 0; i < jsonmessage.length; i ++) {
        if (i % 17 === 0) {
          days.push(jsonmessage[i]);
          continue;
        }
  
        if ((i - 1) % 17 === 0) {
          dayData.push(parseInt(jsonmessage[i]));
          continue;
        }
        hourData.push(parseInt(jsonmessage[i]));
    }
  
    this.setState(
      {dayNames : days,
        hourAverages: hourData,
        dayAverages: dayData}
    )
  
  }

  handleClick(button) {
    this.setState({clickedButton: button});
  }

  createLastWeekdayChart(day, dayName) {
    var data = []
    for (var i = day * 15; i < (day + 1) * 15; i ++) {
      data.push(this.state.hourAverages[i])
    }

    return createChart(data, dayName)
  }

  /* NavDropdownExample (dayNames) {
    //const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

    return (
      <Nav variant="pills" defaultActiveKey="/home"
      onSelect={(selectedKey) => this.handleClick(parseInt(selectedKey))}
      >
  
    <Nav.Item>
      <Nav.Link eventKey="0">{dayNames[0]}</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="1"> {dayNames[1]}</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="2" >{dayNames[2]}</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="3">{dayNames[3]}</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="4">{dayNames[4]}</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="5">{dayNames[5]}</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="6">{dayNames[6]}</Nav.Link>
    </Nav.Item>
  </Nav>
    );
  }
  */

  ws = new WebSocket("ws://localhost:8080/ws")

  componentDidMount() {

    this.interval = setInterval(() => this.setState({ todayData: [...this.state.todayData, Math.floor(Math.random() * 30 + 30)]}), 1000);

    this.ws.onopen = () => {
      console.log("connected to the server")
      this.ws.send("Salutations!")
    }

    this.ws.onclose = () => {
      console.log("connection lost")
    }

    this.ws.onmessage = evt => {

      //const message = JSON.parse(evt.data)
      //const message = evt.data
      const message = JSON.parse(evt.data)
      console.log(message)
      this.setState(
        {jsonmessage : message}
      )
      
      this.parse(message)
      //this.setState({data:message})

      /*if(this.prevData.length >= 15){
        this.prevData.shift();
      }
      this.prevData.push(message)
      */
    }
  }

  render() {
    var todayChart = createChart(this.state.todayData, "Today")
    var lastWeekBarChart = createWeekChart(this.state.dayNames, this.state.dayAverages)
    var currentLastWeekDayChart = this.createLastWeekdayChart(this.state.clickedButton, this.state.dayNames[this.state.clickedButton])
    var buttons = Buttons(this)
    var todayOccupancy = this.state.todayData[this.state.todayData.length - 1]

    return  (
      <React.Fragment>
       
      <h1 class="App-logo">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Quicksand" />
          Occupansee
        </h1>

        <h2>The current occupancy of the Perry-Castañeda Library is {todayOccupancy}</h2>
      <h3>
        The data for today:
      </h3>
      <div class="centered">
        {todayChart}
      </div>

        <h2>Last Week's Data</h2>

      <div class ="container">
      <div>
      {lastWeekBarChart}
        </div>
        

      <div>
        {currentLastWeekDayChart}
      </div>
      
      </div>

      

      <div>
        {buttons}
      </div>
        
      </React.Fragment>
    )
  }

}

function createTodayChart(inputData) {

  const chart = {
    //labels: ['9:00 am', ,"", "", "", '10:00 am', ,"", "", "",'11:00 am', ,"", "", "",'12:00 pm', ,"", "", "",'1:00 pm',,"", "", "",'2:00 pm',,"", "", "",'3:00 pm',,"", "", "",'4:00 pm',,"", "", "",'5:00 pm',,"", "", "",'6:00 pm',,"", "", "",'7:00 pm',,"", "", "",'8:00 pm',,"", "", "",'9:00 pm',,"", "", "",'10:00 pm',,"", "", "",'11:00 pm',],
    labels: ['9:00 am', "9:15 am", "9:30 am", "9:45 am",'10:00 am',"10:15 am",'11:00 am','12:00 pm', '1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm','11:00 pm'],
    datasets: [
      {

        label: 'Occupancy',
        fill: false,
        responsive: true,
        lineTension: 0.2,
        backgroundColor: 'rgba(57,255,2,1)',
        borderColor: 'rgba(57,255,2,1)',
        pointBorderColor: 'rgba(25,25,100,.5)',
        borderWidth: 2,
        spanGaps: true,
        data: inputData
      }
    ],
  }
  return (
  <Line
    data={chart}
    options={{
      title:{
        display:true,
        text:"Occupancy for Today",
        //fontSize:20
      },
      legend:{
        display:true,
        position:'top',
      },

      responsive: true,
      maintainAspectRatio: false,
    }}
  />
  )

}


  function createChart(inputData, nameOfDay) {
    const chart = {
      //labels: ['9:00 am', ,"", "", "", '10:00 am', ,"", "", "",'11:00 am', ,"", "", "",'12:00 pm', ,"", "", "",'1:00 pm',,"", "", "",'2:00 pm',,"", "", "",'3:00 pm',,"", "", "",'4:00 pm',,"", "", "",'5:00 pm',,"", "", "",'6:00 pm',,"", "", "",'7:00 pm',,"", "", "",'8:00 pm',,"", "", "",'9:00 pm',,"", "", "",'10:00 pm',,"", "", "",'11:00 pm',],
      labels: ['9:00 am', '10:00 am','11:00 am','12:00 pm', '1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm','11:00 pm'],
      datasets: [
        {

          label: 'Occupancy',
          fill: false,
          responsive: true,
          lineTension: 0.2,
          backgroundColor: 'rgba(57,255,2,1)',
          borderColor: 'rgba(57,255,2,1)',
          pointBorderColor: 'rgba(25,25,100,.5)',
          borderWidth: 2,
          spanGaps: true,
          data: inputData
        }
      ],
    }
    return (
    <Line
      data={chart}
      options={{
        title:{
          display:true,
          text:"Occupancy for " + nameOfDay,
          fontSize:32
        },
        legend:{
          labels: {fontFamily: 'Quicksand', fontSize: 20},
          display:true,
          position:'top'
        },
        scales:{
          yAxes:[{
            ticks:{fontFamily: 'Quicksand', fontSize: 28}
          }],
          xAxes:[{
            ticks:{fontFamily: 'Quicksand', fontSize: 28}
          }]
        },

        responsive: true,
        maintainAspectRatio: true,
      }}
    />
    )

  }
  
  function createWeekChart(dayNames, inputData) {
    const chart = {
      labels: [dayNames[0], dayNames[1], dayNames[2], dayNames[3], dayNames[4], dayNames[5], dayNames[6]],
      datasets: [
        {
          label: 'Average Occupancy',
          data: [inputData[0], inputData[1], inputData[2], inputData[3], inputData[4], inputData[5],inputData[6]]
        }
      ]
    }
    return (
    
    <Bar
      data={chart}
      options={{
        title:{
          display:true,
          text:"Occupancy Last Week",
          //fontSize:20
        },
        legend:{
          display:true,
          position:'top'
        },
        responsive: true,
        maintainAspectRatio: true,
      }}
    />
    
    )

  }
  function Buttons(props) {
    var dayNames = props.state.dayNames
    return (
    <>
    <Button onClick={() => props.handleClick(0)} variant="outline-primary"> {dayNames[6]}</Button>{' '}
    <Button onClick={() => props.handleClick(1)} variant="outline-primary">{dayNames[5]}</Button>{' '}
    <Button onClick={() => props.handleClick(2)} variant="outline-primary">{dayNames[4]}</Button>{' '}
    <Button onClick={() => props.handleClick(3)} variant="outline-primary">{dayNames[3]}</Button>{' '}
    <Button onClick={() => props.handleClick(4)} variant="outline-primary">{dayNames[2]}</Button>{' '}
    <Button onClick={() => props.handleClick(5)} variant="outline-primary">{dayNames[1]}</Button>{' '}
    <Button onClick={() => props.handleClick(6)} variant="outline-primary">{dayNames[0]}</Button>{' '}
  </>
    )
  }

export default App;

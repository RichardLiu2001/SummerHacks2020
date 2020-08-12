import React, { Component } from 'react';
import './App.css';
import {Line, Bar} from 'react-chartjs-2'
import {Doughnut} from 'react-chartjs-2';

import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import header from './header.png';


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

    for (var i = 14; i < hourData.length; i += 15) {
      hourData[i] = 0
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

  ws = new WebSocket("ws://localhost:8080/ws")


  interval = setInterval(() => {
    if (this.state.todayData.length < 14) {
      this.setState({ todayData: [...this.state.todayData, Math.floor(Math.random() * 30 + 30)]})
    } else if (this.state.todayData.length === 14) {
      this.setState({todayData: [...this.state.todayData, 0]})
    } 
  }, 2000);


  componentDidMount() {

   // this.interval = setInterval(() => this.setState({ todayData: [...this.state.todayData, Math.floor(Math.random() * 30 + 30)]}), 1000);

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
    var todayChart = createTodayChart(this.state.todayData)
    var lastWeekBarChart = createWeekChart(this.state.dayNames, this.state.dayAverages)
    var currentLastWeekDayChart = this.createLastWeekdayChart(this.state.clickedButton, "Occupancy for " + this.state.dayNames[this.state.clickedButton])
    var buttons = Buttons(this)
    var todayOccupancy = this.state.todayData[this.state.todayData.length - 1]
    var lastWeekOccupancyPerHour = createWeekAveragesChart(this.state.hourAverages)
    return  (
      <React.Fragment>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Quicksand" />
        <div>
        <h1 class="App-logo">
        <img src={header} alt="Logo" />
        </h1>
        </div>
        <h2>The current occupancy of the Perry-Castañeda Library is {todayOccupancy}</h2>
      <div class="centered">
        {todayChart}
      </div>

        <h1>Last Week's Data</h1>
      <div class="one">
      {lastWeekBarChart}
        </div>
        <div class="two">
          {lastWeekOccupancyPerHour}
        </div>
        <h1>Click a day to see its occupancy</h1>
        <div class = "buttonContainer">
        {buttons}
      </div>

      <div class="container">
        {currentLastWeekDayChart}
      </div>
        
      </React.Fragment>
    )
  }

}

function createWeekAveragesChart(inputData) {

  var data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  for (var i = 0; i < 7; i ++) {
    for (var j = 0; j < 15; j ++) {
      data[j] += inputData[15 * i + j]
    }
  }

  for (var i = 0; i < 15; i ++) {
    data[i] = Math.round(1.0 * data[i] / 7)
  }
  
  return createChart(data, "Average Occupancy Per Hour")
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
        lineTension: 0.1,
        backgroundColor: 'rgba(124,178,246, 1)',
        borderColor: 'rgba(124,178,246, 1)',
        pointBorderColor: 'rgba(124,178,246, 1)',
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
        text:"Average Occupancy for Today",
        //fontSize:20
      },
      scales:{
        yAxes:[{gridLines: {
          display: true ,
          color: "#696969"
        },
          ticks:{fontFamily: 'Quicksand', fontSize: 20, fontColor : 'white', beginAtZero:true}
        }],
        xAxes:[{gridLines: {
          display: true ,
          color: "#696969"
        },
          ticks:{fontFamily: 'Quicksand', fontColor : 'white', fontSize: 20}
        }]
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


  function createChart(inputData, phrase) {
    inputData[0] = 0
    //inputData[inputData.length - 1] = 0
    const chart = {
      //labels: ['9:00 am', ,"", "", "", '10:00 am', ,"", "", "",'11:00 am', ,"", "", "",'12:00 pm', ,"", "", "",'1:00 pm',,"", "", "",'2:00 pm',,"", "", "",'3:00 pm',,"", "", "",'4:00 pm',,"", "", "",'5:00 pm',,"", "", "",'6:00 pm',,"", "", "",'7:00 pm',,"", "", "",'8:00 pm',,"", "", "",'9:00 pm',,"", "", "",'10:00 pm',,"", "", "",'11:00 pm',],
      labels: ['9:00 am', '10:00 am','11:00 am','12:00 pm', '1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm','11:00 pm'],
      datasets: [
        {

          label: 'Occupancy',
          fill: false,
          responsive: true,
          lineTension: 0.1,
          backgroundColor:  'rgba(124,178,246, 1)', //'rgba(57,255,2,1)', //'rgba(191,87,0,1)',
          borderColor: 'rgba(124,178,246, 1)', //'rgba(191,87,0,1)'
          pointBorderColor: 'rgba(124,178,246, .5)', // rgba(25,25,100,.5)',
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
          text: phrase,
          fontSize:32,
          fontFamily: 'Quicksand',
          fontColor : 'white'
        },
        scales:{
          yAxes:[{gridLines: {
            display: true ,
            color: "#696969"
          },
            ticks:{fontFamily: 'Quicksand', fontSize: 20, fontColor : 'white', beginAtZero:true}
          }],
          xAxes:[{gridLines: {
            display: true ,
            color: "#696969"
          },
            ticks:{fontFamily: 'Quicksand', fontColor : 'white', fontSize: 20}
          }]
        },
        legend:{
          
          labels: {fontFamily: 'Quicksand', fontColor : 'white', fontSize: 20},
          display:false,
          position:'top'
        },
        responsive: true,
        maintainAspectRatio: true,
      }}
    />
    )

  }
  
  function createWeekChart(dayNames, inputData) {

    var shortenedDayNames = []

    var split = ""
    for (var i = 0; i < dayNames.length; i ++) {

      var splitStrings = dayNames[i].split(" ")
      split += splitStrings[0].substring(0, 3) + ", " + splitStrings[1].substring(0, 3) + " " + splitStrings[2]
      
      shortenedDayNames.push(split)
      split = ""

    }

    const chart = {



      labels: shortenedDayNames,
      backgroundColor: 'rgba(124,178,246, 1)',
      borderColor: 'rgba(0,0,0, 1)',
      datasets: [
        {         
          label: 'Average Occupancy',
          borderColor : 'rgba(124,178,246, 1)' ,  // border of bar graph
          borderWidth: 2,
          //fillColor : "rgba(124,178,246, 1)",
          //'rgba(57,255,2,2)', // 'rgba(50,205,50 ,1)',
          backgroundColor : 'rgba(124,178,246, 0.2)', // inside of bar graph
          //hoverColor : 'rgba(124,178,246, 1)',
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
          text:"Average Occupancy Per Day",
          fontSize:24,
          fontFamily: 'Quicksand',
          fontColor: 'white'
        },
        legend:{
          
          labels: {fontFamily: 'Quicksand', fontSize: 20, fontColor: 'white'},
          display:false,
          position:'top'
        },
        scales:{
          yAxes:[{gridLines: {
            display: true ,
            color: "#696969"
          },
            ticks:{fontFamily: 'Quicksand', fontSize: 20, suggestedMin: 35, fontColor:'white'}
          }],
          xAxes:[{gridLines: {
            display: true ,
            color: "#696969"
          },
            ticks:{fontFamily: 'Quicksand', fontSize: 15, fontColor: 'white'}
          }]
        },
        responsive: true,
        maintainAspectRatio: true,
      }}
    />
    
    )

  }
  function Buttons(props) {
    var dayNames = props.state.dayNames
    var clickedButton = props.state.clickedButton

    //style={{backgroundColor :"", color: "}}
    // outline-primary
    return (
    <>
    
    <Button onClick={() => props.handleClick(0)} variant="outline" active={clickedButton === 0} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1)', backGroundColor: 'rgba(124,178,246,1)', }}> {dayNames[0]}</Button>{' '}
    <Button onClick={() => props.handleClick(1)} variant="outline" active={clickedButton === 1} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>{dayNames[1]}</Button>{' '}
    <Button onClick={() => props.handleClick(2)} variant="outline" active={clickedButton === 2} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>{dayNames[2]}</Button>{' '}
    <Button onClick={() => props.handleClick(3)} variant="outline" active={clickedButton === 3} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>{dayNames[3]}</Button>{' '}
    <Button onClick={() => props.handleClick(4)} variant="outline" active={clickedButton === 4} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>{dayNames[4]}</Button>{' '}
    <Button onClick={() => props.handleClick(5)} variant="outline" active={clickedButton === 5} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>{dayNames[5]}</Button>{' '}
    <Button onClick={() => props.handleClick(6)} variant="outline" active={clickedButton === 6} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>{dayNames[6]}</Button>{' '}
  </>
    )
  }

export default App;

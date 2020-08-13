  
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
      this.state = {clickedButton : 0, 
                      location : "Perry-Castañeda Library", hour : 0}
                     // locations : [<Location location={"Perry-Castañeda Library"} buttonKey={0}/>, <Location location={"Gates-Dell Complex"} buttonKey={1}/>, <Location location={"McCombs School of Business"} buttonKey ={2}/>, <Location location={"Student Activity Center"} buttonKey= {3}/>, <Location location={"Gregory Gym"} buttonKey={4}/>, <Location location={"Wendy's"} buttonKey={5}/>]}
                        
      }
   

    handleClick(clickNum) {
        var locationName = ""
        if (clickNum === 0) {
          locationName = "the Perry-Castañeda Library"
        } else if (clickNum === 1) {
          locationName = "the Gates-Dell Complex"
        } else if (clickNum === 2) {
          locationName = "the McCombs School of Business"
        } else if (clickNum === 3) {
          locationName = "the Student Activity Center"
        } else if (clickNum === 4) {
          locationName = "Gregory Gym"
        } else {
          locationName = "Wendy's"
        }
        console.log(locationName)
        this.setState({clickedButton : clickNum, location : locationName})       
    }


  interval = setInterval(() => {
   if (this.state.hour < 15) 
      this.setState({hour : this.state.hour + 1})
  }, 2000);

    renderLocation(buttonKey) {
      if (buttonKey === 0) {
        return <Location location={"the Perry-Castañeda Library"} buttonKey={0} key={buttonKey} currentHour={this.state.hour}/>
      } else if (buttonKey === 1) {
        return <Location location={"the Gates-Dell Complex"} buttonKey={1} key={buttonKey} currentHour={this.state.hour}/>
      } else if (buttonKey === 2) {
        return <Location location={"the McCombs School of Business"} buttonKey={2} key={buttonKey} currentHour={this.state.hour}/>
      } else if (buttonKey === 3) {
        return <Location location={"the Student Activity Center"} buttonKey={3} key={buttonKey} currentHour={this.state.hour}/>
      } else if (buttonKey === 4) {
        return <Location location={"Gregory Gym"} buttonKey={4} key={buttonKey} currentHour={this.state.hour}/>
      } else {
        return <Location location={"Wendy's"} buttonKey={5} key={buttonKey} currentHour={this.state.hour}/>
      }
    } 

    
    
    render() {

      var buttons = containerButtons(this)
      var clicked = this.state.clickedButton
      var renderedLocation = this.renderLocation(clicked)
      // <div>{this.state.locations[this.state.clickedButton]}</div>
      return (
        <React.Fragment>
          <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Quicksand" />
        <div class ="logo-header">
        <h1 class="App-logo">
        <img src={header} alt="Logo" />
        </h1>
        </div>
        <div class ="locationButton">{buttons}</div>
        <div>{renderedLocation}</div>
      </React.Fragment>
      )
    }

}

function containerButtons(props) {
  var clickedButton = props.state.clickedButton

  //style={{backgroundColor :"", color: "}}
  // outline-primary
  return (
  <>
  <Button onClick={() => props.handleClick(0)} size="lg" variant="outline" active={clickedButton === 0} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1)', backGroundColor: 'rgba(124,178,246,1)', }}>Perry-Castañeda Library</Button>{' '}
  <Button onClick={() => props.handleClick(1)} size="lg"variant="outline" active={clickedButton === 1} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>Gates-Dell Complex</Button>{' '}
  <Button onClick={() => props.handleClick(2)} size="lg" variant="outline" active={clickedButton === 2} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>McCombs School of Business</Button>{' '}
  <Button onClick={() => props.handleClick(3)} size="lg" variant="outline" active={clickedButton === 3} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>Student Activity Center</Button>{' '}
  <Button onClick={() => props.handleClick(4)} size="lg" variant="outline" active={clickedButton === 4} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>Gregory Gym</Button>{' '}
  <Button onClick={() => props.handleClick(5)} size="lg" variant="outline" active={clickedButton === 5} style={{color : 'rgba(124,178,246, 1)', borderColor: 'rgba(124, 178, 246, 1'}}>Wendy's</Button>{' '}
</>
  )
}


class Location extends Component {
  constructor(props) {
    super(props)
// this.createTodayChart = this.createTodayChart.bind(this)
    //createTodayChart = createTodayChart.bind(this);
    var click = this.props.buttonKey
    console.log(click)
    console.log(this.props.location)
    var randomWeek = []
    var randomDay = []
    
    if (click === 0) {
      randomWeek = ['Monday, August 10', '49', '43', '33', '57', '56', '60', '47', '46', '56', '52', '49', '41', '45', '58', '40', '43', 'Sunday, August 9', '44', '35', '38', '47', '33', '31', '60', '58', '45', '36', '44', '39', '58', '54', '45', '60', 'Saturday, August 8', '42', '45', '50', '58', '30', '35', '52', '51', '34', '57', '51', '39', '39', '53', '46', '41', 'Friday, August 7', '43', '37', '46', '60', '47', '58', '40', '57', '56', '30', '57', '57', '33', '54', '59', '50', 'Thursday, August 6', '43', '54', '45', '49', '57', '37', '41', '49', '42', '44', '39', '58', '57', '38', '35', '42', 'Wednesday, August 5', '46', '58', '35', '54', '54', '53', '57', '58', '58', '51', '53', '55', '35', '53', '30', '41', 'Tuesday, August 4', '46', '30', '55', '54', '37', '37', '32', '56', '50', '46', '39', '54', '50', '55', '53', '30']
      randomDay = [0, 34, 49, 47, 53, 33, 49, 33, 43, 52, 48, 48, 56, 36, 0]
    } else if (click === 1) {
      randomWeek = ['Monday, August 10', '47', '50', '53', '35', '59', '47', '37', '32', '33', '54', '35', '58', '30', '46', '60', '48', 'Sunday, August 9', '41', '46', '31', '45', '43', '43', '43', '51', '57', '45', '48', '38', '46', '49', '54', '33', 'Saturday, August 8', '47', '34', '35', '54', '49', '34', '55', '56', '33', '51', '43', '43', '42', '31', '34', '42', 'Friday, August 7', '50', '33', '52', '39', '51', '36', '30', '50', '50', '33', '57', '60', '44', '40', '37', '43', 'Thursday, August 6', '41', '36', '52', '53', '45', '54', '33', '45', '45', '58', '49', '42', '34', '31', '39', '48', 'Wednesday, August 5', '47', '54', '36', '35', '33', '48', '42', '43', '31', '56', '55', '36', '57', '51', '38', '39', 'Tuesday, August 4', '49', '32', '32', '53', '37', '56', '31', '53', '41', '30', '52', '35', '44', '32', '44', '51']
      randomDay = [0, 41, 36, 52, 38, 46, 60, 38, 49, 44, 53, 50, 46, 45, 0]
    } else if (click === 2) {
      randomWeek = ['Monday, August 10', '50', '59', '46', '52', '40', '60', '46', '45', '33', '50', '36', '58', '34', '32', '37', '58', 'Sunday, August 9', '40', '35', '46', '36', '32', '31', '47', '49', '47', '35', '32', '52', '33', '51', '49', '55', 'Saturday, August 8', '42', '54', '31', '56', '44', '34', '45', '31', '40', '33', '46', '42', '34', '60', '32', '37', 'Friday, August 7', '42', '38', '57', '50', '41', '35', '51', '60', '42', '46', '53', '49', '48', '58', '48', '52', 'Thursday, August 6', '46', '41', '46', '44', '42', '49', '30', '39', '49', '37', '49', '47', '35', '60', '32', '39', 'Wednesday, August 5', '50', '54', '32', '55', '31', '33', '31', '57', '57', '47', '45', '39', '54', '53', '31', '54', 'Tuesday, August 4', '49', '47', '51', '56', '38', '36', '30', '46', '30', '55', '54', '49', '32', '31', '46', '44']
      randomDay = [0, 56, 31, 39, 37, 53, 51, 36, 38, 39, 34, 46, 48, 45, 0]
    } else if (click === 3) {
      randomWeek = ['Monday, August 10', '45', '44', '55', '47', '52', '39', '36', '51', '49', '37', '60', '31', '31', '44', '45', '58', 'Sunday, August 9', '49', '60', '55', '37', '49', '42', '52', '37', '50', '57', '34', '43', '53', '53', '49', '57', 'Saturday, August 8', '46', '40', '58', '59', '32', '50', '32', '42', '34', '49', '52', '48', '41', '52', '36', '48', 'Friday, August 7', '42', '57', '46', '31', '44', '42', '44', '44', '49', '33', '33', '46', '58', '46', '51', '37', 'Thursday, August 6', '49', '48', '59', '39', '54', '36', '42', '46', '51', '34', '36', '54', '40', '34', '51', '49', 'Wednesday, August 5', '42', '47', '48', '60', '41', '54', '36', '54', '59', '40', '34', '56', '49', '49', '50', '57', 'Tuesday, August 4', '44', '49', '48', '57', '38', '45', '41', '37', '36', '46', '43', '51', '36', '41', '55', '33']
      randomDay = [0, 54, 57, 34, 50, 51, 38, 60, 37, 40, 58, 45, 37, 50, 0]
    } else if (click === 4) {
      randomWeek = ['Monday, August 10', '40', '40', '44', '60', '55', '31', '30', '51', '49', '59', '38', '43', '60', '44', '49', '44', 'Sunday, August 9', '48', '57', '34', '33', '57', '38', '44', '60', '52', '41', '44', '52', '57', '54', '46', '53', 'Saturday, August 8', '47', '51', '57', '51', '45', '43', '35', '45', '39', '60', '42', '33', '41', '59', '43', '44', 'Friday, August 7', '41', '39', '42', '60', '43', '38', '54', '59', '49', '33', '38', '55', '40', '55', '57', '39', 'Thursday, August 6', '49', '45', '53', '43', '36', '55', '34', '58', '54', '42', '38', '46', '37', '50', '43', '50', 'Wednesday, August 5', '47', '34', '35', '31', '36', '53', '53', '47', '58', '44', '31', '58', '53', '41', '43', '56', 'Tuesday, August 4', '41', '32', '58', '52', '59', '58', '32', '36', '52', '51', '52', '33', '42', '37', '45', '31']
      randomDay = [0, 41, 51, 54, 54, 54, 48, 39, 30, 51, 46, 39, 50, 55, 0]
    } else {
      randomWeek = ['Monday, August 10', '50', '51', '44', '33', '60', '42', '44', '38', '57', '52', '41', '52', '42', '36', '34', '36', 'Sunday, August 9', '41', '40', '52', '30', '42', '43', '49', '49', '31', '46', '36', '37', '49', '57', '37', '31', 'Saturday, August 8', '50', '36', '36', '36', '47', '38', '52', '33', '35', '40', '43', '59', '54', '56', '35', '42', 'Friday, August 7', '48', '54', '60', '47', '57', '48', '56', '50', '35', '30', '58', '57', '30', '32', '45', '31', 'Thursday, August 6', '46', '43', '34', '59', '51', '37', '57', '54', '60', '46', '54', '51', '31', '57', '37', '32', 'Wednesday, August 5', '41', '52', '45', '37', '44', '53', '40', '60', '50', '50', '32', '38', '34', '36', '32', '60', 'Tuesday, August 4', '47', '31', '32', '60', '34', '59', '37', '37', '41', '39', '46', '38', '58', '32', '44', '46']
      randomDay = [0, 31, 39, 39, 43, 43, 48, 31, 41, 42, 39, 36, 55, 50, 0]
    }

    var days = []
  
    var hourData = []
  
    var dayData = []
    
    for (var i = 0; i < randomWeek.length; i ++) {
        if (i % 17 === 0) {
          days.push(randomWeek[i]);
          continue;
        }
  
        if ((i - 1) % 17 === 0) {
          dayData.push(parseInt(randomWeek[i]));
          continue;
        }

        hourData.push(parseInt(randomWeek[i]));
    }

    for (var i = 14; i < hourData.length; i += 15) {
      hourData[i] = 0
    }
    
  
    /* this.setState(
      {dayNames : days,
        hourAverages: hourData,
        dayAverages: dayData}
    )
    */

    this.state = {
      location : this.props.location,

      jsonmessage : "",
      todayData : [],
      dayNames : days,
      hourAverages : hourData,
      dayAverages : dayData,
      dayGraphs : [],
      clickedButton : 0,
      genDay : randomDay,

    }

  //  this.genDay = randomDay
    console.log("Genday" + this.genDay)
  //  this.genWeek = randomWeek

   // this.parse(randomWeek)
   // this.currentHour = 0
    
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
  
  /*componentDidMount() {
    var click = this.props.buttonKey
   // console.log(click)
    var randomWeek = []
    var randomDay = []
   /* if (locationName === "Perry-Castañeda Library") {
      randomWeek = ['Monday, August 10', '49', '43', '33', '57', '56', '60', '47', '46', '56', '52', '49', '41', '45', '58', '40', '43', 'Sunday, August 9', '44', '35', '38', '47', '33', '31', '60', '58', '45', '36', '44', '39', '58', '54', '45', '60', 'Saturday, August 8', '42', '45', '50', '58', '30', '35', '52', '51', '34', '57', '51', '39', '39', '53', '46', '41', 'Friday, August 7', '43', '37', '46', '60', '47', '58', '40', '57', '56', '30', '57', '57', '33', '54', '59', '50', 'Thursday, August 6', '43', '54', '45', '49', '57', '37', '41', '49', '42', '44', '39', '58', '57', '38', '35', '42', 'Wednesday, August 5', '46', '58', '35', '54', '54', '53', '57', '58', '58', '51', '53', '55', '35', '53', '30', '41', 'Tuesday, August 4', '46', '30', '55', '54', '37', '37', '32', '56', '50', '46', '39', '54', '50', '55', '53', '30']
      randomDay = [0, 34, 49, 47, 53, 33, 49, 33, 43, 52, 48, 48, 56, 36, 0]
    } else if (locationName === "Gates-Dell Complex") {
      randomWeek = ['Monday, August 10', '47', '50', '53', '35', '59', '47', '37', '32', '33', '54', '35', '58', '30', '46', '60', '48', 'Sunday, August 9', '41', '46', '31', '45', '43', '43', '43', '51', '57', '45', '48', '38', '46', '49', '54', '33', 'Saturday, August 8', '47', '34', '35', '54', '49', '34', '55', '56', '33', '51', '43', '43', '42', '31', '34', '42', 'Friday, August 7', '50', '33', '52', '39', '51', '36', '30', '50', '50', '33', '57', '60', '44', '40', '37', '43', 'Thursday, August 6', '41', '36', '52', '53', '45', '54', '33', '45', '45', '58', '49', '42', '34', '31', '39', '48', 'Wednesday, August 5', '47', '54', '36', '35', '33', '48', '42', '43', '31', '56', '55', '36', '57', '51', '38', '39', 'Tuesday, August 4', '49', '32', '32', '53', '37', '56', '31', '53', '41', '30', '52', '35', '44', '32', '44', '51']
      randomDay = [0, 41, 36, 52, 38, 46, 60, 38, 49, 44, 53, 50, 46, 45, 0]
    } else if (locationName === "McCombs School of Business") {
      randomWeek = ['Monday, August 10', '50', '59', '46', '52', '40', '60', '46', '45', '33', '50', '36', '58', '34', '32', '37', '58', 'Sunday, August 9', '40', '35', '46', '36', '32', '31', '47', '49', '47', '35', '32', '52', '33', '51', '49', '55', 'Saturday, August 8', '42', '54', '31', '56', '44', '34', '45', '31', '40', '33', '46', '42', '34', '60', '32', '37', 'Friday, August 7', '42', '38', '57', '50', '41', '35', '51', '60', '42', '46', '53', '49', '48', '58', '48', '52', 'Thursday, August 6', '46', '41', '46', '44', '42', '49', '30', '39', '49', '37', '49', '47', '35', '60', '32', '39', 'Wednesday, August 5', '50', '54', '32', '55', '31', '33', '31', '57', '57', '47', '45', '39', '54', '53', '31', '54', 'Tuesday, August 4', '49', '47', '51', '56', '38', '36', '30', '46', '30', '55', '54', '49', '32', '31', '46', '44']
      randomDay = [0, 56, 31, 39, 37, 53, 51, 36, 38, 39, 34, 46, 48, 45, 0]
    } else if (locationName === "Student Activity Center") {
      randomWeek = ['Monday, August 10', '45', '44', '55', '47', '52', '39', '36', '51', '49', '37', '60', '31', '31', '44', '45', '58', 'Sunday, August 9', '49', '60', '55', '37', '49', '42', '52', '37', '50', '57', '34', '43', '53', '53', '49', '57', 'Saturday, August 8', '46', '40', '58', '59', '32', '50', '32', '42', '34', '49', '52', '48', '41', '52', '36', '48', 'Friday, August 7', '42', '57', '46', '31', '44', '42', '44', '44', '49', '33', '33', '46', '58', '46', '51', '37', 'Thursday, August 6', '49', '48', '59', '39', '54', '36', '42', '46', '51', '34', '36', '54', '40', '34', '51', '49', 'Wednesday, August 5', '42', '47', '48', '60', '41', '54', '36', '54', '59', '40', '34', '56', '49', '49', '50', '57', 'Tuesday, August 4', '44', '49', '48', '57', '38', '45', '41', '37', '36', '46', '43', '51', '36', '41', '55', '33']
      randomDay = [0, 54, 57, 34, 50, 51, 38, 60, 37, 40, 58, 45, 37, 50, 0]
    } else if (locationName === "Gregory Gym") {
      randomWeek = ['Monday, August 10', '40', '40', '44', '60', '55', '31', '30', '51', '49', '59', '38', '43', '60', '44', '49', '44', 'Sunday, August 9', '48', '57', '34', '33', '57', '38', '44', '60', '52', '41', '44', '52', '57', '54', '46', '53', 'Saturday, August 8', '47', '51', '57', '51', '45', '43', '35', '45', '39', '60', '42', '33', '41', '59', '43', '44', 'Friday, August 7', '41', '39', '42', '60', '43', '38', '54', '59', '49', '33', '38', '55', '40', '55', '57', '39', 'Thursday, August 6', '49', '45', '53', '43', '36', '55', '34', '58', '54', '42', '38', '46', '37', '50', '43', '50', 'Wednesday, August 5', '47', '34', '35', '31', '36', '53', '53', '47', '58', '44', '31', '58', '53', '41', '43', '56', 'Tuesday, August 4', '41', '32', '58', '52', '59', '58', '32', '36', '52', '51', '52', '33', '42', '37', '45', '31']
      randomDay = [0, 41, 51, 54, 54, 54, 48, 39, 30, 51, 46, 39, 50, 55, 0]
    } else {
      randomWeek = ['Monday, August 10', '50', '51', '44', '33', '60', '42', '44', '38', '57', '52', '41', '52', '42', '36', '34', '36', 'Sunday, August 9', '41', '40', '52', '30', '42', '43', '49', '49', '31', '46', '36', '37', '49', '57', '37', '31', 'Saturday, August 8', '50', '36', '36', '36', '47', '38', '52', '33', '35', '40', '43', '59', '54', '56', '35', '42', 'Friday, August 7', '48', '54', '60', '47', '57', '48', '56', '50', '35', '30', '58', '57', '30', '32', '45', '31', 'Thursday, August 6', '46', '43', '34', '59', '51', '37', '57', '54', '60', '46', '54', '51', '31', '57', '37', '32', 'Wednesday, August 5', '41', '52', '45', '37', '44', '53', '40', '60', '50', '50', '32', '38', '34', '36', '32', '60', 'Tuesday, August 4', '47', '31', '32', '60', '34', '59', '37', '37', '41', '39', '46', '38', '58', '32', '44', '46']
      randomDay = [0, 31, 39, 39, 43, 43, 48, 31, 41, 42, 39, 36, 55, 50, 0]
    }
    
   if (click === 0) {
    randomWeek = ['Monday, August 10', '49', '43', '33', '57', '56', '60', '47', '46', '56', '52', '49', '41', '45', '58', '40', '43', 'Sunday, August 9', '44', '35', '38', '47', '33', '31', '60', '58', '45', '36', '44', '39', '58', '54', '45', '60', 'Saturday, August 8', '42', '45', '50', '58', '30', '35', '52', '51', '34', '57', '51', '39', '39', '53', '46', '41', 'Friday, August 7', '43', '37', '46', '60', '47', '58', '40', '57', '56', '30', '57', '57', '33', '54', '59', '50', 'Thursday, August 6', '43', '54', '45', '49', '57', '37', '41', '49', '42', '44', '39', '58', '57', '38', '35', '42', 'Wednesday, August 5', '46', '58', '35', '54', '54', '53', '57', '58', '58', '51', '53', '55', '35', '53', '30', '41', 'Tuesday, August 4', '46', '30', '55', '54', '37', '37', '32', '56', '50', '46', '39', '54', '50', '55', '53', '30']
    randomDay = [0, 34, 49, 47, 53, 33, 49, 33, 43, 52, 48, 48, 56, 36, 0]
  } else if (click === 1) {
    randomWeek = ['Monday, August 10', '47', '50', '53', '35', '59', '47', '37', '32', '33', '54', '35', '58', '30', '46', '60', '48', 'Sunday, August 9', '41', '46', '31', '45', '43', '43', '43', '51', '57', '45', '48', '38', '46', '49', '54', '33', 'Saturday, August 8', '47', '34', '35', '54', '49', '34', '55', '56', '33', '51', '43', '43', '42', '31', '34', '42', 'Friday, August 7', '50', '33', '52', '39', '51', '36', '30', '50', '50', '33', '57', '60', '44', '40', '37', '43', 'Thursday, August 6', '41', '36', '52', '53', '45', '54', '33', '45', '45', '58', '49', '42', '34', '31', '39', '48', 'Wednesday, August 5', '47', '54', '36', '35', '33', '48', '42', '43', '31', '56', '55', '36', '57', '51', '38', '39', 'Tuesday, August 4', '49', '32', '32', '53', '37', '56', '31', '53', '41', '30', '52', '35', '44', '32', '44', '51']
    randomDay = [0, 41, 36, 52, 38, 46, 60, 38, 49, 44, 53, 50, 46, 45, 0]
  } else if (click === 2) {
    randomWeek = ['Monday, August 10', '50', '59', '46', '52', '40', '60', '46', '45', '33', '50', '36', '58', '34', '32', '37', '58', 'Sunday, August 9', '40', '35', '46', '36', '32', '31', '47', '49', '47', '35', '32', '52', '33', '51', '49', '55', 'Saturday, August 8', '42', '54', '31', '56', '44', '34', '45', '31', '40', '33', '46', '42', '34', '60', '32', '37', 'Friday, August 7', '42', '38', '57', '50', '41', '35', '51', '60', '42', '46', '53', '49', '48', '58', '48', '52', 'Thursday, August 6', '46', '41', '46', '44', '42', '49', '30', '39', '49', '37', '49', '47', '35', '60', '32', '39', 'Wednesday, August 5', '50', '54', '32', '55', '31', '33', '31', '57', '57', '47', '45', '39', '54', '53', '31', '54', 'Tuesday, August 4', '49', '47', '51', '56', '38', '36', '30', '46', '30', '55', '54', '49', '32', '31', '46', '44']
    randomDay = [0, 56, 31, 39, 37, 53, 51, 36, 38, 39, 34, 46, 48, 45, 0]
  } else if (click === 3) {
    randomWeek = ['Monday, August 10', '45', '44', '55', '47', '52', '39', '36', '51', '49', '37', '60', '31', '31', '44', '45', '58', 'Sunday, August 9', '49', '60', '55', '37', '49', '42', '52', '37', '50', '57', '34', '43', '53', '53', '49', '57', 'Saturday, August 8', '46', '40', '58', '59', '32', '50', '32', '42', '34', '49', '52', '48', '41', '52', '36', '48', 'Friday, August 7', '42', '57', '46', '31', '44', '42', '44', '44', '49', '33', '33', '46', '58', '46', '51', '37', 'Thursday, August 6', '49', '48', '59', '39', '54', '36', '42', '46', '51', '34', '36', '54', '40', '34', '51', '49', 'Wednesday, August 5', '42', '47', '48', '60', '41', '54', '36', '54', '59', '40', '34', '56', '49', '49', '50', '57', 'Tuesday, August 4', '44', '49', '48', '57', '38', '45', '41', '37', '36', '46', '43', '51', '36', '41', '55', '33']
    randomDay = [0, 54, 57, 34, 50, 51, 38, 60, 37, 40, 58, 45, 37, 50, 0]
  } else if (click === 4) {
    randomWeek = ['Monday, August 10', '40', '40', '44', '60', '55', '31', '30', '51', '49', '59', '38', '43', '60', '44', '49', '44', 'Sunday, August 9', '48', '57', '34', '33', '57', '38', '44', '60', '52', '41', '44', '52', '57', '54', '46', '53', 'Saturday, August 8', '47', '51', '57', '51', '45', '43', '35', '45', '39', '60', '42', '33', '41', '59', '43', '44', 'Friday, August 7', '41', '39', '42', '60', '43', '38', '54', '59', '49', '33', '38', '55', '40', '55', '57', '39', 'Thursday, August 6', '49', '45', '53', '43', '36', '55', '34', '58', '54', '42', '38', '46', '37', '50', '43', '50', 'Wednesday, August 5', '47', '34', '35', '31', '36', '53', '53', '47', '58', '44', '31', '58', '53', '41', '43', '56', 'Tuesday, August 4', '41', '32', '58', '52', '59', '58', '32', '36', '52', '51', '52', '33', '42', '37', '45', '31']
    randomDay = [0, 41, 51, 54, 54, 54, 48, 39, 30, 51, 46, 39, 50, 55, 0]
  } else {
    randomWeek = ['Monday, August 10', '50', '51', '44', '33', '60', '42', '44', '38', '57', '52', '41', '52', '42', '36', '34', '36', 'Sunday, August 9', '41', '40', '52', '30', '42', '43', '49', '49', '31', '46', '36', '37', '49', '57', '37', '31', 'Saturday, August 8', '50', '36', '36', '36', '47', '38', '52', '33', '35', '40', '43', '59', '54', '56', '35', '42', 'Friday, August 7', '48', '54', '60', '47', '57', '48', '56', '50', '35', '30', '58', '57', '30', '32', '45', '31', 'Thursday, August 6', '46', '43', '34', '59', '51', '37', '57', '54', '60', '46', '54', '51', '31', '57', '37', '32', 'Wednesday, August 5', '41', '52', '45', '37', '44', '53', '40', '60', '50', '50', '32', '38', '34', '36', '32', '60', 'Tuesday, August 4', '47', '31', '32', '60', '34', '59', '37', '37', '41', '39', '46', '38', '58', '32', '44', '46']
    randomDay = [0, 31, 39, 39, 43, 43, 48, 31, 41, 42, 39, 36, 55, 50, 0]
  }
  this.genDay = randomDay
  this.genWeek = randomWeek
  this.parse(randomWeek)
    
  }
  */
  setGeneratedData(location) {
    var locationName = location
    var randomWeek = []
    var randomDay = [0,1,2,3,4,5,6,7,8,9]
    if (locationName === "Perry-Castañeda Library") {
      randomWeek = ['Monday, August 10', '49', '43', '33', '57', '56', '60', '47', '46', '56', '52', '49', '41', '45', '58', '40', '43', 'Sunday, August 9', '44', '35', '38', '47', '33', '31', '60', '58', '45', '36', '44', '39', '58', '54', '45', '60', 'Saturday, August 8', '42', '45', '50', '58', '30', '35', '52', '51', '34', '57', '51', '39', '39', '53', '46', '41', 'Friday, August 7', '43', '37', '46', '60', '47', '58', '40', '57', '56', '30', '57', '57', '33', '54', '59', '50', 'Thursday, August 6', '43', '54', '45', '49', '57', '37', '41', '49', '42', '44', '39', '58', '57', '38', '35', '42', 'Wednesday, August 5', '46', '58', '35', '54', '54', '53', '57', '58', '58', '51', '53', '55', '35', '53', '30', '41', 'Tuesday, August 4', '46', '30', '55', '54', '37', '37', '32', '56', '50', '46', '39', '54', '50', '55', '53', '30']
      randomDay = [0, 34, 49, 47, 53, 33, 49, 33, 43, 52, 48, 48, 56, 36, 0]
    } else if (locationName === "Gates-Dell Complex") {
      randomWeek = ['Monday, August 10', '47', '50', '53', '35', '59', '47', '37', '32', '33', '54', '35', '58', '30', '46', '60', '48', 'Sunday, August 9', '41', '46', '31', '45', '43', '43', '43', '51', '57', '45', '48', '38', '46', '49', '54', '33', 'Saturday, August 8', '47', '34', '35', '54', '49', '34', '55', '56', '33', '51', '43', '43', '42', '31', '34', '42', 'Friday, August 7', '50', '33', '52', '39', '51', '36', '30', '50', '50', '33', '57', '60', '44', '40', '37', '43', 'Thursday, August 6', '41', '36', '52', '53', '45', '54', '33', '45', '45', '58', '49', '42', '34', '31', '39', '48', 'Wednesday, August 5', '47', '54', '36', '35', '33', '48', '42', '43', '31', '56', '55', '36', '57', '51', '38', '39', 'Tuesday, August 4', '49', '32', '32', '53', '37', '56', '31', '53', '41', '30', '52', '35', '44', '32', '44', '51']
      randomDay = [0, 41, 36, 52, 38, 46, 60, 38, 49, 44, 53, 50, 46, 45, 0]
    } else if (locationName === "McCombs School of Business") {
      randomWeek = ['Monday, August 10', '50', '59', '46', '52', '40', '60', '46', '45', '33', '50', '36', '58', '34', '32', '37', '58', 'Sunday, August 9', '40', '35', '46', '36', '32', '31', '47', '49', '47', '35', '32', '52', '33', '51', '49', '55', 'Saturday, August 8', '42', '54', '31', '56', '44', '34', '45', '31', '40', '33', '46', '42', '34', '60', '32', '37', 'Friday, August 7', '42', '38', '57', '50', '41', '35', '51', '60', '42', '46', '53', '49', '48', '58', '48', '52', 'Thursday, August 6', '46', '41', '46', '44', '42', '49', '30', '39', '49', '37', '49', '47', '35', '60', '32', '39', 'Wednesday, August 5', '50', '54', '32', '55', '31', '33', '31', '57', '57', '47', '45', '39', '54', '53', '31', '54', 'Tuesday, August 4', '49', '47', '51', '56', '38', '36', '30', '46', '30', '55', '54', '49', '32', '31', '46', '44']
      randomDay = [0, 56, 31, 39, 37, 53, 51, 36, 38, 39, 34, 46, 48, 45, 0]
    } else if (locationName === "Student Activity Center") {
      randomWeek = ['Monday, August 10', '45', '44', '55', '47', '52', '39', '36', '51', '49', '37', '60', '31', '31', '44', '45', '58', 'Sunday, August 9', '49', '60', '55', '37', '49', '42', '52', '37', '50', '57', '34', '43', '53', '53', '49', '57', 'Saturday, August 8', '46', '40', '58', '59', '32', '50', '32', '42', '34', '49', '52', '48', '41', '52', '36', '48', 'Friday, August 7', '42', '57', '46', '31', '44', '42', '44', '44', '49', '33', '33', '46', '58', '46', '51', '37', 'Thursday, August 6', '49', '48', '59', '39', '54', '36', '42', '46', '51', '34', '36', '54', '40', '34', '51', '49', 'Wednesday, August 5', '42', '47', '48', '60', '41', '54', '36', '54', '59', '40', '34', '56', '49', '49', '50', '57', 'Tuesday, August 4', '44', '49', '48', '57', '38', '45', '41', '37', '36', '46', '43', '51', '36', '41', '55', '33']
      randomDay = [0, 54, 57, 34, 50, 51, 38, 60, 37, 40, 58, 45, 37, 50, 0]
    } else if (locationName === "Gregory Gym") {
      randomWeek = ['Monday, August 10', '40', '40', '44', '60', '55', '31', '30', '51', '49', '59', '38', '43', '60', '44', '49', '44', 'Sunday, August 9', '48', '57', '34', '33', '57', '38', '44', '60', '52', '41', '44', '52', '57', '54', '46', '53', 'Saturday, August 8', '47', '51', '57', '51', '45', '43', '35', '45', '39', '60', '42', '33', '41', '59', '43', '44', 'Friday, August 7', '41', '39', '42', '60', '43', '38', '54', '59', '49', '33', '38', '55', '40', '55', '57', '39', 'Thursday, August 6', '49', '45', '53', '43', '36', '55', '34', '58', '54', '42', '38', '46', '37', '50', '43', '50', 'Wednesday, August 5', '47', '34', '35', '31', '36', '53', '53', '47', '58', '44', '31', '58', '53', '41', '43', '56', 'Tuesday, August 4', '41', '32', '58', '52', '59', '58', '32', '36', '52', '51', '52', '33', '42', '37', '45', '31']
      randomDay = [0, 41, 51, 54, 54, 54, 48, 39, 30, 51, 46, 39, 50, 55, 0]
    } else {
      randomWeek = ['Monday, August 10', '50', '51', '44', '33', '60', '42', '44', '38', '57', '52', '41', '52', '42', '36', '34', '36', 'Sunday, August 9', '41', '40', '52', '30', '42', '43', '49', '49', '31', '46', '36', '37', '49', '57', '37', '31', 'Saturday, August 8', '50', '36', '36', '36', '47', '38', '52', '33', '35', '40', '43', '59', '54', '56', '35', '42', 'Friday, August 7', '48', '54', '60', '47', '57', '48', '56', '50', '35', '30', '58', '57', '30', '32', '45', '31', 'Thursday, August 6', '46', '43', '34', '59', '51', '37', '57', '54', '60', '46', '54', '51', '31', '57', '37', '32', 'Wednesday, August 5', '41', '52', '45', '37', '44', '53', '40', '60', '50', '50', '32', '38', '34', '36', '32', '60', 'Tuesday, August 4', '47', '31', '32', '60', '34', '59', '37', '37', '41', '39', '46', '38', '58', '32', '44', '46']
      randomDay = [0, 31, 39, 39, 43, 43, 48, 31, 41, 42, 39, 36, 55, 50, 0]
    }
    this.setState({location : locationName, genDay : randomDay})
    this.genWeek = randomWeek
    this.genDay = randomDay
    this.currentHour = 0
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
  

  render() {  
  var todayHours = []
  for (var i = 0; i < this.props.currentHour; i ++) {
    todayHours.push(this.state.genDay[i])
  }
    var locationName = this.props.location
  //  console.log(locationName)
   // var todayChart = createChart(this.state.todayData, "Today's Average Occupancy for " + locationName)
    var todayChart = createTodayChart(todayHours, "Today's Average Occupancy for " + locationName)
    var lastWeekBarChart = createWeekChart(this.state.dayNames, this.state.dayAverages)
    var currentLastWeekDayChart = this.createLastWeekdayChart(this.state.clickedButton, "Occupancy for " + this.props.location + " on " + this.state.dayNames[this.state.clickedButton])
    var buttons = Buttons(this)
    var todayOccupancy = todayHours[todayHours.length - 1] //this.state.todayData[this.state.todayData.length - 1]
    var lastWeekOccupancyPerHour = createWeekAveragesChart(this.state.hourAverages)
    var doughnut = createDoughnut()
    return  (
      <React.Fragment>
        <h1>The current occupancy of {locationName} is {todayOccupancy}</h1>
      <div class="centered">
        {todayChart}
      </div>

        <h1>Last Week's Data for {locationName}</h1>
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
      <div class = "container">{doughnut}</div>
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

function createTodayChart(todayData, phrase) {

 /* var todayHours = []
  for (var i = 0; i < hour; i ++) {
    todayHours.push(this.state.genDay[i])
  }
  */

  const chart = {
    //labels: ['9:00 am', ,"", "", "", '10:00 am', ,"", "", "",'11:00 am', ,"", "", "",'12:00 pm', ,"", "", "",'1:00 pm',,"", "", "",'2:00 pm',,"", "", "",'3:00 pm',,"", "", "",'4:00 pm',,"", "", "",'5:00 pm',,"", "", "",'6:00 pm',,"", "", "",'7:00 pm',,"", "", "",'8:00 pm',,"", "", "",'9:00 pm',,"", "", "",'10:00 pm',,"", "", "",'11:00 pm',],
    labels: ['9:00 am','10:00 am','11:00 am','12:00 pm', '1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm','11:00 pm'],
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
        data: todayData
      }
    ],
  }
  return (
  <Line
    data={chart}
    options={{
      title:{
        display:false,
        text: phrase,
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
        display:false,
        
      },

      responsive: true,
      maintainAspectRatio: true,
    }}
  />
  )

}

  function createDoughnut() {
    const chart = {
      labels: ['Perry-Castañeda Library','Gates-Dell Complex','McCombs School of Business','Student Activity Center','Wendy\'s'],
      datasets: [
        {
          backgroundColor: ["#5DA5DA", "#F15854","#60BD68","#FAA43A","#DECF3F"],
          data: [43, 23, 59, 47, 32]
        }
      ],
    }
    return (
      <Doughnut
      data ={chart}
      options={{
        title:{
          display:true,
          text:'Distribution by Location for Last Week',
          fontSize: 32,
          fontFamily: 'Quicksand',
          fontColor: 'white'
        },
        legend:{
          display:true,
          position:'right',
          labels: {fontFamily: 'Quicksand', fontColor : 'white', fontSize: 24},

        }
       }} />
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
          backgroundColor : 'rgba(124,178,246, 0.3)', // inside of bar graph
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
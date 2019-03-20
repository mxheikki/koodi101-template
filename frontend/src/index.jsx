/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from "moment";

import './assets/stylesheets/style.css'

const baseURL = process.env.ENDPOINT;

/****** ADD YOUR CODE AFTER THIS LINE ******/


const getSensorDataFromBackend = async () => {
  try {
    const url = `${baseURL}/api/sensors`
    console.log("Getting sensor from "+url)
    const response = await fetch(url);
    return response.json()
  } catch (error) {
    console.error(error);
  }
  return { greeting :"Could not get sensor data from backend"};
};

const getChatsFromBackend = async () => {
  try {
    const url = `${baseURL}/api/chats`
    console.log("Getting chats from "+url)
    const response = await fetch(url);
    return response.json()
  } catch (error) {
    console.error(error);
  }
  return {results: []};
};

const BackendGreeting = (props) => (
  <div><p>Backend says: {props.greeting}</p></div>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sensors: [],
    };
  }

  async componentWillMount() {
    // const response = await getGreetingFromBackend();
    // this.setState({greeting: response.greeting});
    const response = await getSensorDataFromBackend();
    this.setState({sensors: response.results});
  }

  render() {

    // return (
    //   <BackendGreeting greeting={this.state.greeting} />
    // );
    return (
      // <div>{JSON.stringify(this.state.chats)}</div>
      <BackendGreeting greeting={this.state.greeting} />
     <table>
       <tr>
         <th>Aikaleima</th>
         <th>Lämpötila</th>
         <th>Kosteus</th>
       </tr>
       {this.state.sensors.map(sensorPoint =>
         <tr key={sensorPoint.id}>
           <td>{moment(sensorPoint.timestamp).fromNow()}</td>
           <td>{sensorPoint.temperature}</td>
           <td>{sensorPoint.humidity}</td>
         </tr>
       )}
     </table>
    );
  }
}

/****** DO NOT DELETE AFTER THIS LINE ******/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

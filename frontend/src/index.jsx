/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/style.css'

const baseURL = process.env.ENDPOINT;

/****** ADD YOUR CODE AFTER THIS LINE ******/

const getGreetingFromBackend = async () => {
  try {
    const url = `${baseURL}/api/greeting`
    console.log("Getting greeting from "+url)
    const response = await fetch(url);
    return response.json()
  } catch (error) {
    console.error(error);
  }
  return { greeting :"Could not get greeting from backend"};
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
      greeting: "",
      chats: [],
    };
  }

  async componentWillMount() {
    // const response = await getGreetingFromBackend();
    // this.setState({greeting: response.greeting});
    const response = await getChatsFromBackend();
    this.setState({chats: response.results});
  }

  render() {

    // return (
    //   <BackendGreeting greeting={this.state.greeting} />
    // );
    return (
      <div>{JSON.stringify(this.state.chats)}</div>
    );
  }
}

/****** DO NOT DELETE AFTER THIS LINE ******/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

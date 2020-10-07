import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import Post from './Post/Post';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <h1>InstaGram Clone</h1>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    );
  }
}

export default App;

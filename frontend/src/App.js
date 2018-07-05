import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  analyzeSentence(sentence) {
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({sentence})
  })
      .then(response => response.json())
      .then(data => this.setState(data));
  }

  onKeyUp = e => {
    if (e.key === 'Enter') {
      this.analyzeSentence(e.target.value);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sentiment analyzer</h1>
        </header>
        <p className="App-intro">
          <input type="text" id="sentence" onKeyUp={this.onKeyUp.bind(this)} />
          { this.state && this.state.score > 0.5 ? (<div>😎</div> ) : (<div>😢</div>) }
        </p>
      </div>
    );
  }
}

export default App;

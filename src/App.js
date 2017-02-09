import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';
import Search from './components/Search';
import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className='container'>
        	<Search />
      	  <button onClick={() => this.props.playingLol('EUNE', 65243966)} className='btn btn-success'>Be234 - Me</button>
       	 {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(App);

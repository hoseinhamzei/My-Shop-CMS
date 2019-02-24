import React, { Component } from 'react';
import Myshopcms from './Myshopcms'
import {  BrowserRouter as Router, Redirect } from 'react-router-dom';

class App extends Component {
  render() {

    if(this.checkSavedLogin()){
      return (
        <Myshopcms/>
      );
    } else{
      return <Redirect to='/' />
    }
    
  }

  checkSavedLogin(){
    var userid = localStorage.getItem("userID")
    
    if(userid !== null){
        return true;
    } else {
        return false;
    }
  }

}



export default App;

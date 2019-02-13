import React, { Component } from 'react';
import { settings } from './settings';
import $ from 'jquery';
import Myshopcms from './Myshopcms'

class App extends Component {
  render() {
    return (
      <Myshopcms/>
    );
  }

 /*suck(){
  $.ajax({
      type: "GET",
      headers: { 
        
        },
      url: settings.siteUrl+settings.api+ '/product/read.php',
      dataType: 'json',
      async: true,

      success: function (data) {
      console.log(data.records[1].name);
      },
      error: function(request, status, error){
        console.log(status+' '+request.responseText+' '+error);
    }
  })
 }*/
}

export default App;

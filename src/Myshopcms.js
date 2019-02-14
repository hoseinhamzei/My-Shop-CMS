import React, { Component } from 'react';
import Sidemenu from './components/Sidemenu'
import Pagescontainer from './components/Pagescontainer'


class Myshopcms extends Component {

    constructor(props) {

        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
    
        this.state = {currentPage:'home'};
      }




  render() {
    return (
      <div className='row'>
        <Sidemenu onPageChange={this.handlePageChange}/>
        <Pagescontainer page={this.state.currentPage}/>
      </div>
      
    );
  }


  handlePageChange(pageTag){
      this.setState({currentPage:pageTag});
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

export default Myshopcms;

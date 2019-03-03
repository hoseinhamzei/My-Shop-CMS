import React, { Component } from 'react';
import Usercard from './Usercard';
import Datecard from './Datecard';
import Pdcounter from './Pdcounter';
import Latestproducts from './Latestproducts'



class Home extends Component {
  constructor(props) {

    super(props);
    //this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      user:''
    };
  }

  render() {

    return (
      <div className='p-1 p-md-5'>
        <div className='row home-items'>
          <Usercard user={this.state.user}/>
          <Datecard />
          <Pdcounter />
        </div>
        <Latestproducts />
      </div>
    );
  }

  componentDidMount(){
    document.title = 'MY SHOP';
    this.setState({user:this.getUserInfo()});
  }

  getUserInfo(){
    return {
      id: localStorage.getItem('userID'),
      name: localStorage.getItem('userName')
    }
  }

}

export default Home;

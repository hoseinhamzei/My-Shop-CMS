import React, { Component } from 'react';


class Home extends Component {
  constructor(props) {

    super(props);
    //this.handlePageChange = this.handlePageChange.bind(this);

    //this.state = {currentPage:'home'};
  }

  render() {

    return (
      <div className='p-1 p-md-5'>
        <h1>hm</h1>
      </div>
    );
  }

  componentDidMount(){
    document.title = 'MY SHOP';
  }

}

export default Home;

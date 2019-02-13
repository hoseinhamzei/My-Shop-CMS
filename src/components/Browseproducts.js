import React, { Component } from 'react';


class Browseproducts extends Component {
  constructor(props) {

    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);

    this.state = {searchKeyword:''};
  }

  render() {

    return (
      <div className='p-5'>
        <div className='row'>
          <span className='pre-input'><i className='fa fa-search'></i></span>
          <input type='text' className='search-box form-control' value={this.state.searchKeyword} placeholder='search products' onChange={this.handleSearchChange} />
        </div>
      </div>
    );
  }


  // handle product search when user changes the search input
  handleSearchChange(e){
    this.setState({searchKeyword:e.target.value});
  }

}

export default Browseproducts;

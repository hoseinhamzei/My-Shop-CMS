import React, { Component } from 'react';
import Tablerow from './Tablerow';
import { settings } from '../settings';
import $ from 'jquery';



class Browseproducts extends Component {
  constructor(props) {

    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.loadProducts = this.loadProducts.bind(this);

    this.state = {
      searchKeyword:'',
      pdArray:[{pdid:1,name:'rolex',cat:'fashion',price:500}],
      currentPdPage:1
    };
  }

  render() {
    let tableRows = this.state.pdArray.map((item,index)=>{
      return <Tablerow 
      key={index}
       type='pd' 
       pdid={item.pdid} 
       name={item.name} 
       price={item.price} 
       cat={item.cat}
        />
    });

    return (
      //product search input, updates the pd table on text change
      <div className='p-md-5'>
        <div className='row ml-1'>
          <span className='pre-input'><i className='fa fa-search'></i></span>
          <input type='text' className='search-box form-control' value={this.state.searchKeyword} placeholder='search products' onChange={this.handleSearchChange} />
        </div>
        
        <div className='table-container'>
          <table className='table table-hover table-striped'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // initiate the component by loading first page of products
  componentDidMount(){
    this.loadProducts();
  }

  // handle product search when user changes the search input
  handleSearchChange(e){
    this.setState({searchKeyword:e.target.value});
  }

  // load products from server with pagination
  loadProducts(){

    $('.loading').fadeIn(300);

    $.ajax
    ({
      type: "GET",
      url: settings.siteUrl+settings.api+'product/read_paging.php?page='+this.state.currentPdPage,
      dataType: 'json',
      async: true,

      success: function (data) {
        var i;
        var newArr = [];

        for(i = 0; i < data.records.length; i++){
          var obj = data.records[i];

          var pd = {
            pdid:obj.id,
            name:obj.name,
            cat:obj.category_name,
            price:obj.price
          }

          newArr.push(pd);
        }

        this.setState({pdArray:newArr});
        $('.loading').fadeOut(300);

      }.bind(this),
      error: function(request, status, error){
        console.log(status+' '+request.responseText+' '+error);
        alert('an error occured please reload the page');
        $('.loading').fadeOut(300);
    }
  });
 }
}



export default Browseproducts;

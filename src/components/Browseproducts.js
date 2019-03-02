import React, { Component } from 'react';
import Tablerow from './Tablerow';
import Notify from './Notify';
import Modal from './Modal'
import { settings } from '../settings';
import $ from 'jquery';



class Browseproducts extends Component {
  constructor(props) {

    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.changeCurrentPdPage = this.changeCurrentPdPage.bind(this);
    this.viewProduct = this.viewProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);

    //////////////////////////// set up initial states
    this.state = {
      searchKeyword:'',
      pdArray:[],
      pageArray:[],
      currentPdPage:1,
      asyncPdLoad:'',
      notify:'',
      modal:''
    };
  }

  render() {

    //////////////////////////// add table rows and set their view, delete and update methods
    let tableRows = this.state.pdArray.map((item,index)=>{
      return <Tablerow 
      key={index}
       type='pd' 
       pdid={item.pdid} 
       name={item.name} 
       price={item.price} 
       cat={item.cat}
       onView={()=>this.viewProduct(item)}
       onDelete={()=>this.deleteProduct(item.pdid,item.name)}
       onUpdate={()=>this.updateProduct(item)}
       
        />
    });

    // add pages
    let pagesList = this.state.pageArray.map((pg,index)=>{
          return (
            <button value={pg} onClick={this.changeCurrentPdPage} key={index} className={'btn btn-primary mr-2 ' + (this.state.currentPdPage === pg ? 'current-pg' : '')}>{pg}</button>
          );
    })

    // set the latest alert
    let newNotify = '';

    if(this.state.notify !== ''){
      newNotify = <div className='notify-container mb-3'>
        {this.state.notify}
    </div>;
    }

    return (
      //product search input, updates the pd table on text change. then we list pages under the table.
      <div>
        {this.state.modal}
      <div className='p-md-5'>
        {newNotify}
        <div className='row ml-1'>
          <span className='pre-input pointer' onClick={this.loadProducts}><i className='fa fa-search'></i></span>
          <input type='text' className='search-box form-control' value={this.state.searchKeyword} placeholder='search products' onChange={this.handleSearchChange}/>
        </div>
        
        <div className='table-container'>
          <table className='table table-hover table-striped table-responsive-md'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id='pd-tb'>
              {tableRows}
            </tbody>
          </table>
        </div>
        
        <div className='row mx-auto mt-3 justify-content-center'><span className='mt-1 mr-1'>pages: </span>{pagesList}</div>

      </div>
      </div>

      
    );
  }

  //////////////////////////// initiate the component by loading first page of products ////////////////////////////
  componentDidMount(){
    document.title = 'Browse Products'
    this.loadProducts();
  }
 
  //////////////////////////// destroy all async precesses when the component is unmounted ////////////////////////////
  componentWillUnmount(){
    clearTimeout(this.state.asyncPdLoad);
  }


  //////////////////////////// change product page and call loadProducts to load selected page ////////////////////////////
  changeCurrentPdPage(e){

    if(this.state.asyncPdLoad !== ''){
      clearTimeout(this.state.asyncPdLoad);
    }

    this.setState({currentPdPage:e.target.value});

    this.setState({asyncPdLoad:setTimeout(this.loadProducts,100)});
    

  }

  //////////////////////////// handle product search when user changes the search input
  handleSearchChange(e){

    if(this.state.asyncPdLoad !== ''){
      clearTimeout(this.state.asyncPdLoad);
    }

    this.setState({searchKeyword:e.target.value});
  
    this.setState({asyncPdLoad:setTimeout(this.loadProducts,1000)});

  }

  //////////////////////////// load products from server with pagination / or search products if the user has searched ////////////////////////////
  loadProducts(){

    

    var loadUrl;

    if(this.state.searchKeyword === ''){
        loadUrl = settings.siteUrl+settings.api+'product/read_paging.php?page='+this.state.currentPdPage;
    } else {
        loadUrl = settings.siteUrl+settings.api+'product/search.php?s='+this.state.searchKeyword;
    }

    
    $('.loading').fadeIn(300);

    $.ajax({
      type: "GET",
      url: loadUrl,
      dataType: 'json',
      async: true,

      success: function (data) {
        $('.notfound').remove();
        var i;
        var newArr = [];
        var pgArr = [];

        for(i = 0; i < data.records.length; i++){
          var obj = data.records[i];

          var pd = {
            pdid:obj.id,
            name:obj.name,
            cat:obj.category_name,
            catID:obj.category_id,
            price:obj.price,
            img:obj.image,
            desc:obj.description
          }

          newArr.push(pd);
        }


        //////////////////////////// load pages if didn't search anything ////////////////////////////
        if(this.state.searchKeyword === ''){

          for(i = 0; i < data.paging.pages.length; i++){
            var page = data.paging.pages[i].page;
            pgArr.push(page);
          }

        }

        this.setState({pdArray:newArr,pageArray:pgArr,notify:''});

        $('.loading').fadeOut(300);
        

      }.bind(this),


      error: function(data,error,issue){
        
        

        
        if(typeof data.responseText !== "undefined"){

          console.log(data.responseText);
          var errorText = JSON.parse(data.responseText);

          if(errorText.message === 'No products found.'){
            this.setState({pdArray:[]});
            $('#pd-tb').append(`<div class='p-2 notfound'>product not found</div>`);
          } else{
            console.log(data+' '+error+' '+issue);
            this.setState({notify:<Notify color='danger' btnText='retry' message='An error occured when loading products' onBtnClick={this.loadProducts} />});
          }

        }else{
          console.log(data+' '+error+' '+issue);
          this.setState({notify:<Notify color='danger' btnText='retry' message='An error occured when loading products' onBtnClick={this.loadProducts} />});
        }
        

        $('.loading').fadeOut(300);

    }.bind(this)
  });

 }

 //////////////////////////// update and show view modal to show product details in Modal component. ////////////////////////////
 viewProduct({ pdid, name, cat, price, img, desc }){
 this.setState({
   modal:<Modal type='view' pdid={pdid} name={name} cat={cat} price={price} img={img} desc={desc} />},()=>showModal());
 }


 //////////////////////////// show delete modal ////////////////////////////
 deleteProduct(pdid,name){
  this.setState({
    modal:<Modal type='delete' name={name} onConfirm={()=>this.confirmPdDelete(pdid,name)} />},()=>showModal());
  }


  //////////////////////////// show modal with update product form ////////////////////////////
 updateProduct({ pdid, name, cat, catID, price, img, desc }){
  this.setState({
    modal:<Modal type='update' reload={this.loadProducts} catID={catID} pdid={pdid} name={name} cat={cat} price={price} img={img} desc={desc} />},()=>showModal());
  }

//////////////////////////// delete product from server ////////////////////////////

confirmPdDelete(pdid,name){
  $('.loading').fadeIn(300);
  $.ajax({
    type: "POST",
    url: settings.siteUrl+settings.api+'product/delete.php',
    dataType: 'json',
    async: false,
    data:JSON.stringify({id:pdid}),

    success: function (data) {
      

      $('.loading').fadeOut(300);

      hideModal();

      this.setState({notify:<Notify color='success' btnText='Refresh' message={`Product '${name}' has been deleted click button to refresh products.`} onBtnClick={this.loadProducts} />});
      

    }.bind(this),


    error: function(data,error,issue){
      
      $('.loading').fadeOut(300);
      console.log(data+error+issue);
      this.setState({notify:<Notify color='danger' btnText='retry' message='An error occured while connecting to the server' onBtnClick={()=>this.confirmPdDelete(pdid,name)} />});
      hideModal();

  }.bind(this)
});
}
 
}

var showModal = ()=>{
  $('#myModal').appendTo("body").modal('show');
}

var hideModal = ()=>{
  $('#myModal').modal('hide');
}




export default Browseproducts;

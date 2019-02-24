import React, { Component } from 'react';
import Notify from './Notify';
import { settings } from '../settings';
import $ from 'jquery';
import noimage from '../assets/noimage.png'


class Updateproduct extends Component {
  constructor(props) {

    super(props);

    this.loadCats = this.loadCats.bind(this);
    this.updateProduct = this.updateProduct.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.setPreview = this.setPreview.bind(this);


    this.fileInput = React.createRef();

    this.state = {
      notify:'',
      cats:[],
      imagePre:noimage,
      name:this.props.name,
      description:this.props.desc,
      category_id:this.props.catID,
      price:this.props.price,
      image:this.props.img
    };
  }

  render() {

    // set the latest alert
    let newNotify = '';

    if(this.state.notify !== ''){
      newNotify = <div className='notify-container mb-3'>
        {this.state.notify}
    </div>;
    }

    // load categories as select options
    let options = this.state.cats.map((item,index)=>{

      return <option key={index} value={item.id}>{item.name}</option>

    })

    var preview = this.setPreview();

    return (
      <div>
        {newNotify}
        
          <div className='form-group'>
            <label htmlFor="name">Name*:</label>
            <input defaultValue={this.props.name} value={this.state.name} type="text" className="form-control" id="name" name="name" placeholder="Enter Product Name" onChange={this.handleNameChange} required />
          </div>

          <div className='form-group mt-2'>
            <label htmlFor="desc">Description*:</label>
            <textarea value={this.state.description} type="text" className="form-control" id="desc" name="description" placeholder="Enter Product Description" onChange={this.handleDescChange} />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="cat">Category*:</label>

            <select value={this.state.category_id} onChange={this.handleCatChange} name='category_id' className="form-control" id="cat">
              {options}
            </select>

          </div> 

          <div className='form-group mt-2'>
            <label htmlFor="price">Price*:</label>
            <div className='row'>
              <input value={this.state.price} onChange={this.handlePriceChange} type="number" className="form-control ml-3" id="price" name="price" placeholder="Enter Product Price" required /><i className='fa fa-dollar-sign ml-2 mt-2 text-dark'></i>
            </div>
          </div>

          <div className='form-group mt-2'>
            <label htmlFor='img'>Image:</label>
            <div className='row'>
              <input ref={this.fileInput} id='uploadImage' className='ml-3' type='file' accept="image/*" name="image" onChange={this.handleFileChange} />
              <img id='preview' className='ml-md-5 mt-3 mt-md-0' src={preview} width='200' />
            </div>
          </div>

          <input id='submitBtn' className="btn btn-success my-3 float-right mr-5" type="button" value="Update" onClick={this.updateProduct}></input>
          
        
      </div>
    );
  }


  componentWillReceiveProps(newProps){
    this.setState({
      name:newProps.name,
      description:newProps.desc,
      category_id:newProps.catID,
      price:newProps.price,
      image:newProps.img
    });
  }



  // load cetegories when component is loaded
  componentDidMount(){
    this.loadCats();
  }


  loadCats(){
    $.ajax({
      type: "GET",
      url: settings.siteUrl+settings.api+'category/read.php',
      dataType: 'json',
      async: false,

      success: function (data) {

        var i;
        var newArr = [];

        for(i = 0; i < data.records.length; i++){
          var obj = data.records[i];

          var ct = {
            id:obj.id,
            name:obj.name,
            desc:obj.description
          }

          newArr.push(ct);
        }



        this.setState({cats:newArr,notify:'',category_id: newArr[0].id});
        

      }.bind(this),


      error: function(data){
        
      console.log(data);

      this.setState({notify:<Notify color='danger' btnText='retry' message='An error occured while connecting to server' onBtnClick={this.loadCats} />});

    }.bind(this)
  });
  }

  /////////////////////// handle input changes
  handleNameChange(e){
    this.setState({name:e.target.value});
  }

  handleDescChange(e){
    this.setState({description:e.target.value});
  }

  handleCatChange(e){
    this.setState({category_id:e.target.value});
  }

  handlePriceChange(e){
    this.setState({price:e.target.value});
  }

  handleFileChange(){
    this.setState({image:this.fileInput.current.files[0]});

    var reader = new FileReader();

    reader.onload = function(e) {
      this.setState({imagePre:e.target.result});
    }.bind(this);

    reader.readAsDataURL(this.fileInput.current.files[0]);

    console.log(this.state.imagePre);

  }

  /////////////////////// create product and send to server, if there is any error or user has entered wrong data we will notify them.

  updateProduct(){
    var pdObject = {
      id:this.props.pdid,
      name:this.state.name,
      description:this.state.description,
      category_id:this.state.category_id,
      price:this.state.price
    }

    var pdFormData = new FormData();

    // convert object to formdata
    for ( var key in pdObject ) {
      pdFormData.append(key, pdObject[key]);
    }


    if(this.state.image !== '' && this.state.image !== this.props.img){
      pdFormData.append('image',this.state.image);
    }

    this.setState({notify:<Notify color='warning' message='Updating...' />});

    $('.loading').fadeIn(300);

    $.ajax({

      url: settings.siteUrl+settings.api+'product/update.php',
      type: "POST",
      data:  pdFormData,
      contentType: false,
      cache: false,
      processData:false,
      
      success: function(data){
        console.log(data);
        this.setState({
          notify:<Notify color='success' message={`Product "${pdObject.name}" has been successfully updated`}/>},
          this.props.reload
          );

        $('.loading').fadeOut(300);

   }.bind(this),

  error: function(error) {

    console.log(error);

    this.setState({notify:<Notify color='danger' btnText='retry' message='An error occured while connecting to server' onBtnClick={this.updateProduct} />});

    $('.loading').fadeOut(300);


   }.bind(this)

 });
  
  }

  ///////////// set preview image /////////////
  setPreview(){

    if(this.props.img === this.state.image && this.state.image !== settings.siteUrl+settings.api+'images/'){
      return this.state.image;
    }

     else if(this.state.image === settings.siteUrl+settings.api+'images/'){
        return noimage;
    } 
    
    else {
      return this.state.imagePre;
    }
  }

}

export default Updateproduct;

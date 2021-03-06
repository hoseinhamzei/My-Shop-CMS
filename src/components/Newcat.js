import React, { Component } from 'react';
import Notify from './Notify';
import { settings } from '../settings';
import $ from 'jquery';


class Newcat extends Component {
  constructor(props) {

    super(props);

    this.createCategory = this.createCategory.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);


    this.state = {
      notify:'',
      name:'',
      description:'',
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

  
    return (
      <div className='p-1 p-md-5'>
        {newNotify}
        
          <div className='form-group'>
            <label htmlFor="name">Name*:</label>
            <input value={this.state.name} type="text" className="form-control" id="name" name="name" placeholder="Enter Category Name" onChange={this.handleNameChange} required />
          </div>

          <div className='form-group mt-2'>
            <label htmlFor="desc">Description:</label>
            <input value={this.state.description} type="text" className="form-control" id="desc" name="description" placeholder="Enter Category Description" onChange={this.handleDescChange} />
          </div>


          <input id='submitBtn' className="btn btn-success my-3 float-right mr-5" type="button" value="Submit" onClick={this.createCategory}></input>
          
        
      </div>
    );
  }


  componentDidMount(){
    document.title = 'New Category';
  }


 
  /////////////////////// handle input changes
  handleNameChange(e){
    this.setState({name:e.target.value});
  }

  handleDescChange(e){
    this.setState({description:e.target.value});
  }


  /////////////////////// create category, if there is any error or user has entered wrong data we will notify them.

  createCategory(){
    var catObject = {
      name:this.state.name,
      description:this.state.description,
    }


    this.setState({notify:<Notify color='warning' message='Please Wait...' />});

    $('.loading').fadeIn(300);

    $.ajax({

      url: settings.siteUrl+settings.api+'category/create.php',
      type: "POST",
      data:  JSON.stringify(catObject),
      dataType: 'json',
      async: false,
      
      success: function(data){
        console.log(data);
        this.setState({
          notify:<Notify color='success' message={`Category "${catObject.name}" has been successfully created`}/>,
          name:'',
          description:''
        });

        $('.loading').fadeOut(300);

   }.bind(this),

  error: function(error) {

    console.log(error);

    this.setState({notify:<Notify color='danger' btnText='retry' message='An error occured while connecting to server' onBtnClick={this.createCategory} />});

    $('.loading').fadeOut(300);


   }.bind(this)

 });
  
  }

}

export default Newcat;

import React, { Component } from 'react';
import Tablerow from './Tablerow';
import Notify from './Notify';
import Modalcat from './Modalcat'
import { settings } from '../settings';
import $ from 'jquery';



class Managecats extends Component {
  constructor(props) {

    super(props);

    this.loadCategories= this.loadCategories.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.confirmCatDelete = this.confirmCatDelete.bind(this);

    //////////////////////////// set up initial states
    this.state = {
      catArray:[],
      asyncCatLoad:'',
      notify:'',
      modal:''
    };
  }

  render() {

    //////////////////////////// add table rows and set their view, delete and update methods
    let tableRows = this.state.catArray.map((item,index)=>{
      return <Tablerow 
      key={index}
       type='cat' 
       id={item.id} 
       name={item.name} 
       description={item.description} 
       onDelete={()=>this.deleteCategory(item.id,item.name)}
       onUpdate={()=>this.updateCategory(item)}
       
        />
    });


    // set the latest alert
    let newNotify = '';

    if(this.state.notify !== ''){
      newNotify = <div className='notify-container mb-3'>
        {this.state.notify}
    </div>;
    }

    return (
      <div>
        {this.state.modal}
      <div className='p-md-5'>
        {newNotify}
        <div className='table-container'>
          <table className='table table-hover table-striped'>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id='pd-tb'>
              {tableRows}
            </tbody>
          </table>
        </div>
        
      </div>
      </div>

      
    );
  }

  //////////////////////////// initiate the component by loading categories
  componentDidMount(){
    document.title = 'Manage Categories'
    this.loadCategories();
  }

  //////////////////////////// destroy all async precesses when the component is unmounted
  componentWillUnmount(){
    clearTimeout(this.state.asyncCatLoad);
  }



  //////////////////////////// load categories from server
  loadCategories(){

    $('.loading').fadeIn(300);

    $.ajax({
      type: "GET",
      url: settings.siteUrl+settings.api+'category/read.php',
      dataType: 'json',
      async: true,

      success: function (data) {

        var i;
        var newArr = [];

        for(i = 0; i < data.records.length; i++){
          var obj = data.records[i];

          var cat = {
            id:obj.id,
            name:obj.name,
            description:obj.description
          }

          newArr.push(cat);
        }


        this.setState({catArray:newArr,notify:''});
        console.log(newArr);

        $('.loading').fadeOut(300);
        

      }.bind(this),


      error: function(data,error,issue){
        
        
        if(typeof data.responseText !== "undefined"){

          console.log(data.responseText);
          var errorText = JSON.parse(data.responseText);

          if(errorText.message === 'No Categories Found.'){
            this.setState({catArray:[]});
            $('#pd-tb').append(`<div class='p-2 notfound'>category not found</div>`);
          } else{
            console.log(data);
            this.setState({notify:<Notify color='danger' btnText='retry' message='An error occured while loading categories' onBtnClick={this.loadCategories} />});
          }

        }else{
          console.log(data+' '+error+' '+issue);
          this.setState({notify:<Notify color='danger' btnText='retry' message='An error occured while loading categories' onBtnClick={this.loadCategories} />});
        }
        

        $('.loading').fadeOut(300);

    }.bind(this)
  });

 }

 //////////////////////////// show delete modal
 deleteCategory(id,name){
  this.setState({
    modal:<Modalcat type='delete' name={name} onConfirm={()=>this.confirmCatDelete(id,name)} />},()=>showModal());
  }


  //////////////////////////// show modal with update category form.
 updateCategory({ id, name, description }){
  this.setState({
    modal:<Modalcat type='update' reload={this.loadCategories} id={id} name={name} description={description} />},()=>showModal());
  }

//////////////////////////// delete category from server

confirmCatDelete(id,name){
  $('.loading').fadeIn(300);
  $.ajax({
    type: "POST",
    url: settings.siteUrl+settings.api+'category/delete.php',
    dataType: 'json',
    async: false,
    data:JSON.stringify({id:id}),

    success: function (data) {
      

      $('.loading').fadeOut(300);

      hideModal();

      this.setState({notify:<Notify color='success' btnText='Refresh' message={`Category '${name}' has been deleted click button to refresh categories.`} onBtnClick={this.loadCategories} />});
      

    }.bind(this),


    error: function(data,error,issue){
      
      $('.loading').fadeOut(300);
      console.log(data+error+issue);
      this.setState({notify:<Notify color='danger' btnText='retry' message='An error occured while connecting to the server' onBtnClick={()=>this.confirmCatDelete(id,name)} />});
      hideModal();

  }.bind(this)
});
}
 
}

var showModal = ()=>{
  $('#myModal').modal('show');
}

var hideModal = ()=>{
  $('#myModal').modal('hide');
}




export default Managecats;

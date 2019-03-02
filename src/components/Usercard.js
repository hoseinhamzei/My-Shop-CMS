import React, { Component } from 'react';
import user from '../assets/user.jpg'
import Notify from './Notify';
import { settings } from '../settings';
import $ from 'jquery';


class Usercard extends Component {
  constructor(props) {

    super(props);

    this.setEditMode= this.setEditMode.bind(this);
    this.handleUser= this.handleUser.bind(this);
    this.handlePass= this.handlePass.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      editUser:false,
      newUserName:'',
      newPassword:'',
      notify:''
    }
  }

  render() {

  var userInfo = this.props.user;

  if(!this.state.editUser){

    return (
      <div className='col-12 col-md-6 row user-card'>
        <img src={user} className='admin-avatar' alt='admin' />
        <div className='pl-4'>
          <h4 className='text-capitalize'><i className='fa fa-user mr-2'></i>{userInfo.name}</h4>
          <div className='row mt-3 ml-md-1'>
            <button className='btn btn-default' onClick={()=>this.setEditMode(true)}><i className='fa fa-pen mr-2'></i>Edit Profile</button>
            <button className='btn btn-danger ml-2' onClick={this.userLogOut}><i className='fa fa-sign-out-alt mr-2'></i>Logout</button>
          </div>
        </div>
      </div>
    );

  } else {

    return(
      
    <div className='edit-admin col-12 col-md-5'>
      {this.state.notify}
        <div class="form-group">
        <label for="username">New Username:</label>
        <input value={this.state.newUserName} type="text" name="username" class="form-control" placeholder="user name" onChange={this.handleUser} />
      </div>

      <div class="form-group mt-2">
        <label for="password">New Password:</label>
        <input value={this.state.newPassword} type="password" name="password" class="form-control" placeholder="Password" onChange={this.handlePass} />
      </div>
      <button className='btn btn-default' onClick={()=>this.setEditMode(false)}>Cancel</button>

      <button className='btn btn-success ml-2' onClick={this.updateUser}><i className='fa fa-sign-out-alt mr-2'></i>Save</button>
    </div>
    );
  }
  }

  setEditMode(mode){
    this.setState({editUser:mode});
  }

  handleUser(e){
    this.setState({newUserName:e.target.value});
  }

  handlePass(e){
    this.setState({newPassword:e.target.value});
  }

  userLogOut(){
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    window.location.reload();
  }

  updateUser(){
    var userObject = {
      username:this.state.newUserName,
      password:this.state.newPassword,
      id:this.props.user.id
    }


    this.setState({notify:<Notify color='warning' message='Please Wait...' />});

    $.ajax({

      url: settings.siteUrl+settings.api+'admin/update.php',
      type: "POST",
      data:  JSON.stringify(userObject),
      dataType: 'json',
      async: false,
      
      success: function(data){
        console.log(data);
        this.setState({
          notify:<Notify color='success' message={`Your prifile was updated`}/>,
        },this.userLogOut);

   }.bind(this),

  error: function(error) {

    console.log(error);

    this.setState({notify:<Notify color='danger' message='An error occured, check inputs and try again' />});



   }.bind(this)

 });
  }


}

export default Usercard;


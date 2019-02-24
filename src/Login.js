import React, { Component } from 'react';
import {  BrowserRouter as Router, Redirect } from 'react-router-dom';
import Notify from './components/Notify';
import { settings } from './settings';
import $ from 'jquery';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notify:'',
            loggedin:false,  
            username:'',
            password:''
        }

        this.handlePass = this.handlePass.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.checkSavedLogin = this.checkSavedLogin.bind(this);

    }
    render() { 

        if(!this.state.loggedin){

        return (  
            <div className="container-fluid login-page">
                <div className="bg"></div>
                <div className="grad"></div>

                    <div className='login-box'>

                       <h2 className='logo text-uppercase d-block mx-auto text-center my-4'>MY SHOP</h2>
                       <div className='divider'/>

                       {this.state.notify}

                       <p className='box-title text-center my-4'>Admin Login</p>

                       <div className="form-group d-flex">
                        <label for="username" className='font-weight-light mx-1 mx-md-3'>Username:</label>
                        <input value={this.state.username} onChange={this.handleUsername} type="text" name="username" id="username" className="form-control mr-1 mr-md-3" placeholder='demo:admin' required />
                       </div>

                       <div className="form-group d-flex mt-4">
                        <label for="password" className='font-weight-light mx-1 mx-md-3'>password:</label>
                        <input value={this.state.password} onChange={this.handlePass} type="password" name="password" id="password" className="form-control mr-1 mr-md-3" placeholder='demo:admin' required />
                       </div>

                       <div className='divider mt-5'/>

                       <button type='submit' className='btn btn-success text-center my-5 login-btn' onClick={this.checkLogin}>LOGIN</button>


                       

                    </div>
            </div>
        )} else {
           return <Redirect to='/cms' />
        }
    }

    //////////// check login data in storage on mounting, if available automatically redirect to cms ////////////

    componentWillMount(){
        document.title = 'Admin Login';
        if(this.checkSavedLogin()){
            this.setState({loggedin:true});
        }
    }



    // update states on input change

    handleUsername(e){
        this.setState({username:e.target.value});
    }

    handlePass(e){
        this.setState({password:e.target.value});
    }


    //////////// send user info to api to check if login was successful //////////////

    checkLogin(){

        var userInfo = {
            username:this.state.username,
            password:this.state.password
        }

        $.ajax({

            url: settings.siteUrl+settings.api+'admin/login.php',
            type: "POST",
            data:  JSON.stringify(userInfo),
            dataType: 'json',
            async: false,
            
            success: function(data){
              console.log(data);
              this.setState({
                  loggedin:true,
                  notify:<Notify color='success'  message='Logged In Seccessfuly!' />
                },
                this.saveLogin(data.id,data.username)
                );
      

      
         }.bind(this),
      
        error: function(error) {
          var code = error.status;

          console.log(code);

          if(code === 404){
            this.setState({notify:<Notify color='danger'  message='Username not found!, enter a valid username' />});
          } else if(code === 400){
            this.setState({notify:<Notify color='danger'  message='Password incorrect!, try again' />});
          }else{
            this.setState({notify:<Notify color='danger'  message='An error occured while connecting to server, try again' />});
          }

         }.bind(this)
      
       });

    }

    /// save login data to automatically redirect to homepage next times ///
    saveLogin(userId,userName){
        localStorage.setItem("userID", userId);
        localStorage.setItem("userName", userName);
    }

    checkSavedLogin(){
        var userid = localStorage.getItem("userID")
        
        if(userid !== null){
            return true;
        } else {
            return false;
        }
    }
    
    
}
 
export default Login;


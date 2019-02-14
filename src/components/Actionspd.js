import React, { Component } from 'react';

class Actionspd extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className='pd-actions row justify-content-end pr-3'>
                <button className='btn btn-success' onClick={this.handleView}><i className='fa fa-eye'></i></button>
                <button className='btn btn-primary ml-2' onClick={this.handleEdit}><i className='fa fa-pen'></i></button>
                <button className='btn btn-danger ml-2' onClick={this.handleDelete}><i className='fa fa-trash-alt'></i></button>
            </div>
        );
    }
}
 
export default Actionspd;
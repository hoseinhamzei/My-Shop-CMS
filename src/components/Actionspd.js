import React, { Component } from 'react';
import $ from 'jquery';

class Actionspd extends Component {
    
    render() { 
        return (  
            <div className='pd-actions row justify-content-end pr-3'>
                <button className='btn btn-success mt-2 mt-md-0' data-toggle="popover" data-trigger="hover" data-placement="bottom" data-content="View" onClick={this.props.onView}><i className='fa fa-eye'></i></button>
                <button className='btn btn-primary ml-2 mt-2 mt-md-0' data-toggle="popover" data-trigger="hover" data-placement="bottom" data-content="Edit" onClick={this.props.onUpdate}><i className='fa fa-pen'></i></button>
                <button className='btn btn-danger ml-2 mt-2 mt-md-0' data-toggle="popover" data-trigger="hover" data-placement="bottom" data-content="Delete" onClick={this.props.onDelete}><i className='fa fa-trash-alt'></i></button>
            </div>
        );
    }

    //setup popovers
    componentDidMount(){
        $('[data-toggle="popover"]').popover();
    }

    

}
 
export default Actionspd;
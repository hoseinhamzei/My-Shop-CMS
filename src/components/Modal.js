import React, { Component } from 'react';
import Updateproduct from './Updateproduct';
import { settings } from '../settings';

class Modal extends Component {
    
    render() { 


      /////////////////// Get pd Image link if available ///////////////////
        var pdImage = '';

        // if product has a image:

        if(this.props.img !== settings.siteUrl+settings.api+'images/'){
          pdImage = (
            <div className='modal-img'>
              <img src={this.props.img} />
            </div>
          );
        }else{
          console.log(settings.siteUrl+settings.api+'images/');
        }

        /////////////////// View Product Modal ///////////////////

        if(this.props.type === 'view'){
            return (  
                <div class="modal fade" id="myModal">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                
                    <div class="modal-header">
                      <h4 class="modal-title">{this.props.name}</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    
                    <div class="modal-body p-3">
                      {pdImage}
                      
                      <div className='modal-details'>
                        <hr></hr>
                        <h6 className='mt-3 text-dark'>{'Product id: '+this.props.pdid}</h6>
                        <h6 className='mt-3 text-dark'>{'Product Name: '+this.props.name}</h6>
                        <h6 className='mt-3 text-dark'>{'Category: '+this.props.cat}</h6>
                        <h6 className='mt-3'><span className='text-dark'>Price: </span ><span className='text-success'>{this.props.price + '$'}</span></h6>
                        <h6 className='mt-3 text-dark'>Description: </h6>
                        <p className='mt-1 text-black-50'>{this.props.desc}</p>
                      </div>
                    </div>
                    
                    
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    
                  </div>
                </div>
              </div>
                );
        } 
        
        /////////////////// Update Product Modal ///////////////////
        
        else if(this.props.type === 'update'){
            return (  
              <div class="modal fade" id="myModal">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
              
                  <div class="modal-header">
                    <h4 class="modal-title">{`Edit Product "${this.props.name}"`}</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  
                  
                  <div class="modal-body p-3">
                    <Updateproduct reload={this.props.reload} catID={this.props.catID} pdid={this.props.pdid} name={this.props.name} cat={this.props.cat} price={this.props.price} img={this.props.img} desc={this.props.desc} />
                  </div>
                
                </div>
              </div>
            </div>
            );
        }
        
        
        /////////////////// Delete Product Modal ///////////////////
        else if(this.props.type === 'delete'){
            return (  
              <div class="modal fade" id="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
              
                  <div class="modal-header">
                    <h4 class="modal-title">{`Delete product "${this.props.name}" ?`}</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" onClick={this.props.onConfirm}>Delete</button>
                  </div>
                  
                </div>
              </div>
            </div>
            );
        }
        
    }

}


 
export default Modal;
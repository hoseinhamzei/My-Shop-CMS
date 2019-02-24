import React, { Component } from 'react';
import Updatecategory from './Updatecategory';

class Modalcat extends Component {
    constructor(props) {
        super(props);
    }
    render() { 

      
      
        
        /////////////////// Update Category Modal ///////////////////
        
        if(this.props.type === 'update'){
            return (  
              <div class="modal fade" id="myModal">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
              
                  <div class="modal-header">
                    <h4 class="modal-title">{`Edit Category "${this.props.name}"`}</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  
                  
                  <div class="modal-body p-3">
                    <Updatecategory reload={this.props.reload} id={this.props.id} name={this.props.name} description={this.props.description} />
                  </div>
                
                </div>
              </div>
            </div>
            );
        }
        
        
        /////////////////// Delete Category Modal ///////////////////
        else if(this.props.type === 'delete'){
            return (  
              <div class="modal fade" id="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
              
                  <div class="modal-header">
                    <h4 class="modal-title">{`Delete Category "${this.props.name}" ?`}</h4>
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


 
export default Modalcat;
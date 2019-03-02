import React, { Component } from 'react';
import { settings } from '../settings';
import $ from 'jquery';

class Pdcounter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count:0,
            allpds:0
         }

         this.loadProductsNumber = this.loadProductsNumber.bind(this);
         this.countPds = this.countPds.bind(this);
    }
    render() { 
        return (
            <div className='col-12 col-md-2 pd-counter'>
                <h1 className='text-center text-success'>{this.state.count}</h1>
                <h4 className='text-center'>PRODUCTS</h4>
            </div>
        );
    }


    componentDidMount(){
        this.loadProductsNumber();
    }


    loadProductsNumber(){

    

        var loadUrl = settings.siteUrl+settings.api+'product/read.php';
    
        
    
        $.ajax({
          type: "GET",
          url: loadUrl,
          dataType: 'json',
          async: true,
    
          success: function (data) {
            
            this.setState({allpds:data.records.length});
            this.countPds();
                
                
          }.bind(this),
    
    
          error: function(data){
                console.log(data);
        }
      });
    
     }


     countPds(){
         if(this.state.allpds < 500){

         if(this.state.count < this.state.allpds){

            this.setState({count:this.state.count + 1});
            var counterSpeed = 1000 / this.state.allpds;
            setTimeout(this.countPds,counterSpeed);

         } 
     }else{
        this.setState({count:this.state.allpds});
     }

    }
}
 
export default Pdcounter;
import React, { Component } from 'react';
import { settings } from '../settings';
import $ from 'jquery';
import noimage from '../assets/noimage.png'

class Latestproducts extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            pdArray:[]
         }

         this.loadProducts = this.loadProducts.bind(this);

    }
    render() {
        // map through products array and add a pd card for each of items

        var productCards = this.state.pdArray.map((item,index)=>{

            return <Pdcard key={index} title={item.name} img={item.img} cat={item.cat} />

        });
        
        return (
            <div className='latest-products'>
                <h3 className='text-center'>Latest Products</h3>
                <div className='latest-container row'>
                    {productCards}
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.loadProducts();
    }

    ///////////////////////////////////////////////////////////////////////////


    loadProducts(){

        var loadUrl = settings.siteUrl+settings.api+'product/read.php';
    
        $.ajax({
          type: "GET",
          url: loadUrl,
          dataType: 'json',
          async: true,
    
          success: function (data) {

            var i;
            var newArr = [];

            for(i = 0; i < settings.homePageProductsCount; i++){
              var obj = data.records[i];
    
              var pd = {
                name:obj.name,
                cat:obj.category_name,
                img:obj.image,
              }
    
              newArr.push(pd);
            }
    
            this.setState({pdArray:newArr});
    
          }.bind(this),
    
    
          error: function(data){
            
            console.log(data);

        }
      });
    
     }
}

////////////////////////////////////////////////////////////

var Pdcard = (props)=>{
     var pdImage;

        // if product has a image:

        if(props.img !== settings.siteUrl+settings.api+'images/'){
          pdImage = (

              <img src={props.img} />

          );
        }else{
          pdImage = <img src={noimage} />
        }

    return(
        <div className='product-card col-6 col-md-4 col-lg-3 mt-3'>
            {pdImage}
            <h5 className='text-center text-capitalize mt-2'>{props.title}</h5>
            <p className='text-center'>{props.cat}</p>
        </div>
    );
}
 
export default Latestproducts;
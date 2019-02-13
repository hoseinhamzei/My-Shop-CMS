import React, { Component } from 'react';
import $ from 'jquery';


class Sidemenu extends Component {

    constructor(props) {

        super(props);
        this.setUpMenu = this.setUpMenu.bind(this);
        this.changePage = this.changePage.bind(this);

        this.state = {mobileMenuOpen:false};
      }


  render() {

     // left navigation menu with mobile toggle

    return (
      <div className='row position-fixed'>
        
        

        <div className="left-menu">
        <ul className="list">
        <li className="top" onClick={()=> this.changePage('home')}><h3>Home</h3></li>
        </ul>
            
        <ul className="list">
        <li className="top"><h3>Products</h3><i class="fa fa-arrow-right"></i></li>
        <li className="sub" onClick={()=> this.changePage('browse products')}><h3>browse products</h3></li>
        <li className="sub" onClick={()=> this.changePage('add new product')}><h3>add new product</h3></li>
        </ul>
            
        <ul className="list">
        <li className="top"><h3>Categories</h3><i class="fa fa-arrow-right"></i></li>
        <li className="sub" onClick={()=> this.changePage('manage categories')}><h3>manage categories</h3></li>
        <li className="sub" onClick={()=> this.changePage('add new category')}><h3>add new category</h3></li>
        </ul>
        </div>

        <div className='hide-desktop menu-toggle pointer'><i className='fa fa-2x fa-bars'></i></div>

      </div>
    );
  }

  // setup menu

  setUpMenu(){
    $('.list').each(function(index){
        
        var topli = $(this).children(":first-child");
        topli.click(function(){
            var parent = $(this).parent();
            var sublis = parent.find(".sub");
            
            if(sublis.is(':visible')){
                
                sublis.slideUp(300);
                topli.find('i').removeClass('rotatedown');
                
            }else{
                sublis.slideDown(300);
                
                topli.find('i').addClass('rotatedown');
                
            }
        })
        
    });


    // handle menu toggle click

    $('.menu-toggle').click(()=>{
        if(this.state.mobileMenuOpen){
            $('.left-menu').css('marginLeft','-220px');
            this.setState({mobileMenuOpen:false});
        } else{
            $('.left-menu').css('marginLeft','0px');
            this.setState({mobileMenuOpen:true});
        }
    });


  }

  // change pages by menu item

  changePage(pageName){
        this.props.onPageChange(pageName);
  }

  componentDidMount(){
      this.setUpMenu();
  }

}

export default Sidemenu;

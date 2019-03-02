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
      <div className='row position-fixed menu-container'>
        
        

        <div className="left-menu">

        <div className='menu-header'>
            <h3 className='logo text-center'>MY SHOP</h3>
        </div>

        <ul className="list">
        <li className="top" onClick={()=> this.changePage('home')}><h3><i className='fa fa-home'></i>Home</h3></li>
        </ul>
            
        <ul className="list">
        <li className="top"><h3><i className='fa fa-shopping-bag'></i>Products</h3><i class="fa fa-angle-right"></i></li>
        <li className="sub" onClick={()=> this.changePage('browse products')}><h3>Browse Products</h3></li>
        <li className="sub" onClick={()=> this.changePage('add new product')}><h3>New Product</h3></li>
        </ul>
            
        <ul className="list">
        <li className="top"><h3><i className='fa fa-tags'></i>Categories</h3><i class="fa fa-angle-right"></i></li>
        <li className="sub" onClick={()=> this.changePage('manage categories')}><h3>Manage Categories</h3></li>
        <li className="sub" onClick={()=> this.changePage('add new category')}><h3>New Category</h3></li>
        </ul>

        <div className='menu-footer'>
            <p className='text-center'><i className='fab fa-github'></i><a href='https://github.com/hoseinhamzei' className='ml-2' target="_blank">Hosein Hamzei</a></p>
        </div>
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
                
                topli.find('i.fa-angle-right').addClass('rotatedown');
                
            }
        })
        
    });


    // handle menu toggle click

    $('.menu-toggle').click(()=>{
        if(this.state.mobileMenuOpen){
            $('.left-menu').css('marginLeft','-193px');
            this.setState({mobileMenuOpen:false});
        } else{
            $('.left-menu').css('marginLeft','0px');
            this.setState({mobileMenuOpen:true});
        }
    });


    if($(window).width() < 768){
        $(document).click((event)=>{
            if ( $(event.target).hasClass('menu-container') ) {

            if(this.state.mobileMenuOpen){

                $('.left-menu').css('marginLeft','-193px');
                this.setState({mobileMenuOpen:false});

            }
        }
        });
    }




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

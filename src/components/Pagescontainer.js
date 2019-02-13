import React, { Component } from 'react';

/// import pages ///
import Home from './Home'
import Browseproducts from './Browseproducts'
import Managecats from './Managecats'
import Newcat from './Newcat'
import Newproduct from './Newproduct'


class Pagescontainer extends Component {


  render() {

    var page = this.props.page;

    return (
      <div className='page-container'>
        <h2 className='page-title text-dark text-capitalize ml-md-5'>{page}</h2>

        <div className='mt-5'>
          <Pagetorender pg={page}/>
        </div>

      </div>
    );
  }

}


// render diffrent page components based on Myshopcmd current page state

function Pagetorender(props){
  var pg = props.pg;

  if(pg === 'home'){
    return <Home/>;
  } 
  
  else if(pg === 'browse products'){
    return <Browseproducts/>;
  } 
  
  else if(pg === 'add new product'){
    return <Newproduct/>
  } 
  
  else if(pg === 'manage categories'){
    return <Managecats/>
  } 
  
  else if(pg === 'add new category'){
    return <Newcat/>
  }
}
 


export default Pagescontainer;

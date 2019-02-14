import React, { Component } from 'react';
import Actionspd from './Actionspd';


class Tablerow extends Component{
    render(){
        if(this.props.type === 'pd'){
        return(
            
                <tr className='tb-row'>
                    <td>{this.props.name}</td>
                    <td>{this.props.cat}</td>
                    <td>{this.props.price}$</td>
                    <td><Actionspd/></td>
                </tr>
            
                );

        } else if(this.props.type === 'cat'){

    }
    }
}



 
export default Tablerow;
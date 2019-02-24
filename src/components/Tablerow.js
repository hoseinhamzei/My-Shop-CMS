import React, { Component } from 'react';
import Actionscat from './Actionscat';
import Actionspd from './Actionspd';


class Tablerow extends Component{
    render(){
        if(this.props.type === 'pd'){
        return(
            
                <tr className='tb-row'>
                    <td>{this.props.name}</td>
                    <td>{this.props.cat}</td>
                    <td>{this.props.price}$</td>
                    <td><Actionspd onView={this.props.onView} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate}/></td>
                </tr>
            
                );

        } else if(this.props.type === 'cat'){

            return(
            <tr className='tb-row'>
                    <td>{this.props.id}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.description}</td>
                    <td><Actionscat onDelete={this.props.onDelete} onUpdate={this.props.onUpdate}/></td>
            </tr>
            );
            
    }
    }
}



 
export default Tablerow;
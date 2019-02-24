import React from 'react';

const Notify = (props) => {
    
    let btn = '';

    if(props.onBtnClick && props.btnText){
        btn = <button style={{height:'40px'}} className={'notify-btn ml-3 btn ' + (props.color ? 'btn-'+props.color : '')} onClick={props.onBtnClick}>{props.btnText}</button>
    }
    

    return (  
        <div className={"notify alert alert-dismissible fade show " + (props.color ? 'alert-'+props.color : '')}>
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <div className='row'>
                <p className='ml-3 mt-2'>{props.message}</p>
                {btn}
            </div>
        </div>
    );
}
 
export default Notify;
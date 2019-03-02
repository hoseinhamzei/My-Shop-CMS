import React, { Component } from 'react';

class Datecard  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year:'',
            month:'',
            day:'',
            hour:'',
            miniute:'',
            second:'',
            date:''
        }

        this.setExactTime = this.setExactTime.bind(this);
    }
    render() {
        var d = this.state;

        return (  
            <div className='date-card col-12 col-md-4'>
            
                <div className='row'>
                    <h1 className='mr-3'>{d.date}</h1>
                    <h1 className='mr-2 text-uppercase'>{d.month}</h1>
                    <h5>{d.year}</h5>
                </div>

                <p className='exact-time'><i className='fa fa-clock mr-2 text-danger'></i>{`${d.hour} : ${d.miniute} : ${d.second}`}</p>
            </div>
        );
    }

    componentDidMount(){
       setInterval(this.setExactTime,1000);
    }

    setExactTime(){
        var time = new Date();
        this.setState({ 
            year:time.getFullYear(),
            month:this.getMonthName(time.getMonth() + 1),
            day: this.getDayName(time.getDay() + 1),
            hour:time.getHours(),
            miniute:time.getMinutes(),
            second:time.getSeconds(),
            date:time.getDate()
        });
    }


    getMonthName(month){

        var mn;

        switch(month){

            case 1:
            mn = 'january'
            break;
        
            case 2:
            mn = 'february'
            break;

            case 3:
            mn = 'march'
            break;

            case 4:
            mn = 'april'
            break;

            case 5:
            mn = 'may'
            break;

            case 6:
            mn = 'june'
            break;

            case 7:
            mn = 'july'
            break;

            case 8:
            mn = 'august'
            break;

            case 9:
            mn = 'september'
            break;

            case 10:
            mn = 'october'
            break;

            case 11:
            mn = 'november'
            break;

            case 12:
            mn = 'december'

        }
        return mn;
    }


    getDayName(dayNumber){
        var day;

switch (dayNumber) {
  case 1:
    day = "Sunday";
    break;
  case 2:
    day = "Monday";
    break;
  case 3:
    day = "Tuesday";
    break;
  case 4:
    day = "Wednesday";
    break;
  case 5:
    day = "Thursday";
    break;
  case 6:
    day = "Friday";
    break;
  case  7:
    day = "Saturday";
}
    return day;
    }


    
}
 
export default Datecard;
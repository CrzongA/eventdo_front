import React from "react";
import ReactDOM from 'react-dom';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log(this.props.event)
    }


    render(){
        let reg, checkin
        if (this.props.event.hasOwnProperty('checkin')) {
            return (
                <div className={'card'}>
                    <span><p>{this.props.event.name}</p></span>
                    <span><p>{this.props.event.time}</p></span>
                    <span><p>{this.props.event.description}</p></span>
                    <span><p>{this.props.event.reg}</p></span>
                    <span><p>{this.props.event.checkin}</p></span>
                    {/* <span><p></p></span> */}
                </div>
            )
        }else {
            return (
                <div className={'card'}>
                    <span><p>{this.props.event.name}</p></span>
                    <span><p>{this.props.event.time}</p></span>
                    <span><p>{this.props.event.description}</p></span>
                    {/* <span><p></p></span> */}
                </div>
            )
        }
    }
}

export default Card
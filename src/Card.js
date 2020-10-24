import React from "react";
import ReactDOM from 'react-dom';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }


    componentDidMount() {

    }




    render(){
        return (
            <div className={'card'}>
                <span><p>{this.props.event.title}</p></span>
                <span><p>{this.props.event.time}</p></span>
                <span><p>{this.props.event.id}</p></span>
                {/* <span><p></p></span> */}
            </div>
        )
    }
}

export default Card
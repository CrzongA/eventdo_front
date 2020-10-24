import React from "react";
import Card from "./Card";

class MainMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cardItems: []
        }
        this.cards = this.cards.bind(this)
    }


    componentDidMount() {
        this.props.retrieveData()   //todo: replace blank with userid later
    }

    cards() {
        let items = [], item = {}, carditems = this.props.cardItems, index = 0;
        if (typeof this.props.cardItems != "undefined") {
            console.log(carditems)
            for (index in carditems) {
                items.push(
                    <Card event={carditems[index]} key={index}/>
                )
                index++
            }
            console.log(carditems[item]);
        }
        return items
    }


    render(){
        return (
            <div className={"page-background"}>
                <h2>Welcome, User {this.props.username}</h2>
                <h3></h3>
                <br/>
                <div className={'cards-wrapper'}>{this.cards()}</div>
                <button className={'idnbutton'}><p className={'idnbutton-text'} onClick={this.props.loadRegistration()}>New Event</p></button>
            </div>
        )
    }
}

export default MainMenu
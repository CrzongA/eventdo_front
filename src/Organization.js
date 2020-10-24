import React from "react";
import Card from "./Card";
import NewEvent from "./NewEvent";

class Organization extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
        this.loadEvents = this.loadEvents.bind(this)
        this.cards = this.cards.bind(this)
    }

    cards(){
        let items=[], item={}, carditems = this.props.cardItems, index = 0;
        if (typeof this.props.cardItems != "undefined"){
            console.log(carditems)
            for (index in carditems){
                items.push(
                    <Card event={carditems[index]} key={index}/>
                )
                index++
            }
            console.log(carditems[item]);
        }
        return items
    }


    loadEvents(){
        this.props.request("GET", `${this.props.serverAddr}/`)
    }

    render(){
        return(
            <div className={"page-background"}>
                <h2>Welcome, Organization {this.props.username}</h2>
                <div className={"content"}>{this.loadRegistration}</div>
                <button onClick={this.props.loadNewEvent}>Create New Event</button>
            </div>
        )
    }

}

export default Organization

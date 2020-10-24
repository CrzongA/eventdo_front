import React from "react";

class MainMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
        this.cards = this.cards.bind(this)
    }


    componentDidMount() {

    }

    cards(){
        let items=[], item={}, carditems = this.props.cardItems, i=0
        if (typeof this.props.cardItems != "undefined"){
            console.log(carditems)
            for (item in carditems){
            items.push(
                <div className={'card'} key={i}>
                    <span><p>{carditems[item].name}</p></span>
                    <span><p>{carditems[item].date}</p></span>
                    <span><p>{carditems[item].id}</p></span>
                    {/* <span><p></p></span> */}
                </div>
            )
            i++
            }
            console.log(carditems[item]);
        }
        return items
    }

    handleNewEvent(){
        
    }

    render(){
        return (
            <div>
                <h2>Events</h2>
                <br/>
                <div className={'cards-wrapper'}>{this.cards()}</div>
                <button className={'idnbutton'}><p className={'idnbutton-text'}>New Event</p></button>
            </div>
        )
    }
}

export default MainMenu
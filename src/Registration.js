import React from "react";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            eventid:'',
            answers:[]
        }

        this.listQuestions = this.listQuestions.bind(this)
        this.handleChangeForm = this.handleChangeForm.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    componentDidMount() {
        // this.setState({eventid: })
    }

    handleChangeForm = (event, ind) => {
        let answers = this.state.answers
        answers[ind] = event.target.value
        this.setState({answers: answers})
        // console.log(ind)
    }

    handleSubmitForm = (e) => {
        e.preventDefault()
        // console.log(this.state.answers)
        this.props.handler(this.state.answers)
    }

    listQuestions(){
        let questions = this.props.details.question, ret=[]
        for (let q=0; q<questions.length; q++){
            ret.push(<label key={q}>{questions[q]}<input type={"text"} onChange={(e)=>this.handleChangeForm(e,q)}/><br/></label>)
        }
        return ret
    }

    render() {
        return(
            <div className={'page-background'}>
                <h2>New Event Registration</h2>
                <h3>{this.props.details.name}</h3>
                <br/>
                <h3>Details</h3>
                <p>{this.props.details.description}</p>
                <form onSubmit={this.handleSubmitForm}>
                    {this.listQuestions()}
                    <br/>
                    <input type={"submit"} value={"Confirm"}/>
                </form>

            </div>
        )
    }
}

export default Registration
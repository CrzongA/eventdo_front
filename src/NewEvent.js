import React from "react";

class NewEvent extends React.Component{
    constructor() {
        super();
        this.state={
            qCount:3,
            time:'',
            name: '',
            description: '',
            questions:[]

        }
        // this.listParams = this.listParams.bind(this)
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this)
        this.handleChangeData = this.handleChangeData.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.addQuestion = this.addQuestion.bind(this)
        this.listQuestions = this.listQuestions.bind(this)
        // this.deleteQuestion = this.deleteQuestion.bind(this)
    }

    componentDidMount() {

    }

    handleChangeData = (event) => {
        let name=event.target.name
        let value=event.target.value
        this.setState({[name]:value})
    }

    handleChangeQuestion = (event, ind) => {
        let questions = this.state.questions
        questions[ind] = event.target.value
        this.setState({questions: questions})
    }

    handleSubmitForm = (e) => {
        e.preventDefault()
        this.props.handler(this.state)
    }

    listQuestions(){
        let ret=[], qs=this.state.questions
        for (let q=0;q<qs.length;q++){
            console.log(q)
            ret.push(
                <div>
                    <label>{qs[q]}
                        <input type={"text"} onChange={(e)=>this.handleChangeQuestion(e, q)}/>
                    </label>
                    <button className={"add"} onClick={this.addQuestion}>+</button>
                    <br/>
                </div>
            )
        }
        return ret
    }

    addQuestion(){
        this.setState({
            qCount: this.state.qCount+1,
        })
    }

/*
    deleteQuestion(ind){
        this.setState({
            qCount: this.state.qCount-1
        })
        let qs = this.state.questions
        qs.splice
    }
*/

    render() {
        return(
            <div className={'page-background'} style={{'zIndex':this.props.order}}>
                <h2>Create Event</h2>
                <hr/>
                <form onSubmit={this.handleSubmitForm}>
                    <label>Time: <input type={"text"} name={"time"} onChange={this.handleChangeData}/></label><br/>
                    <label>Name: <input type={"text"} name={"name"} onChange={this.handleChangeData}/></label><br/>
                    <label>Description: <input type={"text"} name={"description"} onChange={this.handleChangeData}/></label><br/>
                    {this.listQuestions()}
                    <input type={"submit"} value={'Finish'}/>
                </form>
            </div>
        )
    }
}

export default NewEvent

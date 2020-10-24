import React from "react";

class NewUser extends React.Component{
    constructor() {
        super();
        this.state = {
            roleValue: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
    }

    handleSubmit = (e) => {
        console.log(this.state.roleValue)
        this.props.handleSubmit(this.state.roleValue)
    }

    onValueChange = (e) => {
        console.log(e.target.value)
        this.setState({roleValue: e.target.value})
    }

    render() {
        return(
            <div className={'page-background'}>
                <h1>EventDo</h1>
                <div className={'picker'}>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type={'radio'} name={'role'} checked={this.state.roleValue==='1'} value={'1'} onChange={this.onValueChange}/>
                            Personal
                        </label>
                        <label>
                            <input type={'radio'} name={'role'} checked={this.state.roleValue==='2'} value={'2'} onChange={this.onValueChange}/>
                            Organization
                        </label>
                        <br/>
                        <input type='submit' value='Submit'/>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewUser

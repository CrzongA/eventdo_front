import React from "react";
import ReactDOM from 'react-dom';
import liff from '@line/liff'
import MainMenu from './MainMenu';
import Organization from './Organization'
import NewUser from "./NewUser";

import './App.css'
import Registration from "./Registration";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      loading: 1,
      role: '', // 'personal' or 'organization',
      userid: '',
      username: '',
      page: 'main',
      carditems: [],
      serverAddr: 'http://a36809060763.ngrok.io',
      popup: ''
    }
    this.retrieveData = this.retrieveData.bind(this)
    this.request = this.request.bind(this)
    this.loadByRole = this.loadByRole.bind(this)
    this.initRole = this.initRole.bind(this)
    this.checkAccType = this.checkAccType.bind(this)
    this.loadRegistration = this.loadRegistration.bind(this)
    this.registerEvent = this.registerEvent.bind(this)
  }

  componentDidMount(){
    // test data, disable in production!!
    this.request("GET", `${this.state.serverAddr}/liff-id`, undefined, undefined, (http) => {
      if (http.readyState == 4 && http.status == 200) {
        const liffid = JSON.parse(http.responseText);
        console.log(liffid);
        liff
        .init(liffid)
        .then(()=>{
          // initializeApp();
          console.log(liff.isLoggedIn());
          if(!liff.isLoggedIn())
            liff.login();
          else {
            // this.retrieveData();
            let token=liff.getDecodedIDToken()
            this.setState({userid:token.sub, username: token.name}, ()=>{
              this.checkAccType()
            })
          }
        })
        .catch((err)=>{})
      }
    })
  }

  request(method, url, par, setting, callback){
    var http = new XMLHttpRequest();
    http.open(method, url, true);
    if (typeof(setting) === "function")
    setting(http);
    http.onreadystatechange = function() {
      callback(http);
    };
    http.send(par);
  }

  initRole(role){
    //todo: call update role api
    this.setState({role: role},()=> {
      this.loadByRole()
      let value = {
        "id": this.state.userid,
        "type": this.state.role
      }
      console.log(this.state.userid)
      this.request("POST", `${this.state.serverAddr}/account_reg`, JSON.stringify(value), (http) => {
        http.setRequestHeader('Content-type', 'application/json');
      }, (http) => {});
      this.setState({loading: 0})
    })
  }

  loadByRole(){
    let ret;
    if (this.state.role=='1' && !this.state.loading){  //personal
      ret = <MainMenu
          username={this.state.username}
          cardItems={this.state.carditems}
          request={this.request}
          loadRegistration={this.loadRegistration}
          retrieveData={this.retrieveData}
          serverAddr={this.state.serverAddr}/>
    }
    else if (this.state.role=='2' && !this.state.loading){ // organization
      ret = <Organization
          username={this.state.username}
          request={this.request}
          serverAddr={this.state.serverAddr}
      />
    }
    else if (!this.state.loading){
      ret = <NewUser
          checkAccType={this.checkAccType}
          handleSubmit={this.initRole}/>
    }
    else{
      ret = <div className={"page-background"}><h1>Loading...</h1></div>
    }
    return ret;
  }

  retrieveData(i_userid){
    // const token = liff.getDecodedIDToken();
    // const userID = "samuel2"; //token.sub;
    const userID = this.state.userid; //todo: activate this line when backend data is complete
    this.request("GET", `${this.state.serverAddr}/query_event/?id=${userID}`, undefined, undefined, (http) => {
        if (http.readyState == 4 && http.status == 200) {
          const events = JSON.parse(http.responseText);
          this.setState({carditems: events});
          this.checkAccType()
          // console.log(events);
        }
    })
  }

  checkAccType(){
    const userID = this.state.userid;
    this.request("GET", `${this.state.serverAddr}/account_type/?id=${userID}`, undefined, undefined, (http) => {
      if (http.readyState == 4 && http.status == 200) {
        const acc_type = http.responseText;
        // this.setState({carditems: events});
        console.log(acc_type);
        if (acc_type=='1'){
          this.setState({role: '1'})
        }else if (acc_type=='2')
          this.setState({role:'2'})
      }
      this.setState({loading: 0});
    })

  }


  loadRegistration(){
    this.request("GET", `${this.state.serverAddr}/reg_event/?code=405445`, undefined, undefined, (http) => {
      if (http.readyState == 4 && http.status == 200) {
        const eventdetails = JSON.parse(http.responseText);
        // this.setState({carditems: eventdetails});
        console.log(eventdetails);
        this.setState({popup:
              <Registration details={eventdetails} handler={this.registerEvent}/>
        })
      }
    })
  }

  registerEvent(answers){
    // console.log(answers)
    let data={
      id: this.state.userid,
      code: '405445',
      question: answers
    }
    this.request("POST", `${this.state.serverAddr}/reg_event`, JSON.stringify(data), (http) => {
      http.setRequestHeader('Content-type', 'application/json');
    }, (http) => {});
    console.log("registered")
    this.setState({popup: null})
    this.retrieveData()
  }

  loadEventDetail(){

  }

  render(){
    return (
      <div className="App">
        {this.loadByRole()}
        {this.state.popup}
      </div>
    )
  }
}


export default App;

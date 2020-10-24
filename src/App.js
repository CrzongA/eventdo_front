import './App.css';
import MainMenu from './MainMenu';
import React from "react";
import liff from '@line/liff'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      carditems:[{name:"meichuhack", date: '20201024', id:10231234},],
      serverAddr: 'http://44f856664f6d.ngrok.io'
    }
    this.retrieveData = this.retrieveData.bind(this)
  }

  componentDidMount(){
    // test data, disable in production!!
    this.setState({carditems:[{name:"meichuhack", date: '20201024', id:10231234},]})
    request("GET", `${this.state.serverAddr}/liff-id`, undefined, undefined, (http) => {
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
            this.retrieveData();
          }
        })
        .catch((err)=>{})
      }
    })
  }


  retrieveData(){
    const token = liff.getDecodedIDToken();
    const userID = "samuel"; //token.sub;
    request("GET", `${this.state.serverAddr}/query-user-event/?userID=${userID}`, undefined, undefined, (http) => {
        if (http.readyState == 4 && http.status == 200) {
          const events = JSON.parse(http.responseText);
          console.log(events);
        }
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <MainMenu cardItems={this.state.carditems}/>
        </div>
    )
  }
}

const request = (method, url, par, setting, callback) => {
  var http = new XMLHttpRequest();
  http.open(method, url, true);
  if (typeof(setting) === "function")
    setting(http);
  http.onreadystatechange = function() {
    callback(http);
  };
  http.send(par);
}

export default App;

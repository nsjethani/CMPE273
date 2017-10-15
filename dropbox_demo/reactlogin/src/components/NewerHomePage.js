import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import Signup from "./Signup";
import IconMenuExampleSimple from "./MainPageHeader";
import {MainLayout} from "./CreateDirectory"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        rootdir: '',
        message: '',
        userid: '',
        errors: {},
        filelist:[]
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                console.log(JSON.stringify(status));
                if (status.status === 201) {
                    console.log("After Login")
                    localStorage.setItem("userid", status.userid);
                    localStorage.setItem("rootdir", status.rootdir);
                    localStorage.setItem("fname", status.fname)
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to Dropbox..!!",
                        username: userdata.username,
                  //      filelist:status.filelist,
                        rootdir:status.rootdir
                    });
                    this.props.history.push("/welcome");
                    console.log("After sign up of succ login");
                } else if (status === 401) {
                    localStorage.setItem("userid", null);
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            })
    }

    handleSignUp = (userdata) => {
        API.doSignup(userdata)
            .then((res) => {
                if (res.status === '201') {
                this.setState({
                    message: "Successful sign up"
                });
                this.props.history.push("/welcome");
                console.log("After history of sign up")
            }
            else if(res.status==='401')
                {
                    this.setState({
                        errors: res.errors
                    });
                    console.log(this.state.errors);
                    console.log("Neha Jay")
                }

    })};

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <h2>Dropbox</h2>
                        <hr/>
                        <button className="btn btn-success" onClick={() => {
                            this.props.history.push("/login");
                        }}>
                            Login
                        </button>
                        &nbsp;

                        <button className="btn btn-success" onClick={() => {
                            this.props.history.push("/signup");
                        }}>
                            Sign Up
                        </button>

                    </div>
                )}/>

                <Route exact path="/signup" render={() => (
                    <div>
                        <Signup handleSignUp={this.handleSignUp}/>

                        <Message message={JSON.stringify(this.state.errors)}/>
                    </div>
                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/welcome" render={() => (
                    <div>
                        <Welcome username={this.state.username} />
                        <div>
                            <MuiThemeProvider><IconMenuExampleSimple /></MuiThemeProvider>
                        </div>
                        <div>
                            <MuiThemeProvider><MainLayout data={this.state}></MainLayout></MuiThemeProvider>
                        </div>
                        </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);
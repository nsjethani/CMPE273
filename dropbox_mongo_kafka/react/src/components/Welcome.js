import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import * as API from '../api/API';
import PropTypes from 'prop-types';
var fl ={float:"right"}
class Welcome extends Component {

    state = {
        username : ''
    };

    componentWillMount(){
        this.setState({
            username : this.props.username
        });
        //document.title = `Welcome, ${this.state.username} !!`;
    }

    componentDidMount(){
        document.title = `Welcome, ${localStorage.getItem("fname")} !!`;
    }

    logout = () =>
    {

        API.logout()
            .then((status) => {
                if (status.status == 201) {
                   // this.props.signout();
                    console.log("logged out");
                    this.props.history.push("/login");
                }
            })
    }


    render(){
        return(
            <div className="row justify-content-md-center">
                <div className="col-md-12">
                    <div  role="alert">
                        &nbsp; &nbsp;

                    {/*    {localStorage.getItem("fname")}, welcome to Dropbox
                    */}</div>
                    <button style={fl} className="btn btn-info" onClick={() =>  this.logout()}>Logout</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);
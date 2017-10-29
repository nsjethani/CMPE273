import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import * as API from '../api/API';
import PropTypes from 'prop-types';

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
                <div className="col-md-3">
                    <div className="alert alert-warning" role="alert">
                        {localStorage.getItem("fname")}, welcome to Dropbox
                    </div>
                    <button onClick={() =>  this.logout()}>Logout</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);
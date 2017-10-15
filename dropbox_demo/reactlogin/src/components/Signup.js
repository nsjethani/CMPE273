import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Signup extends Component {

    static propTypes = {
        handleSignUp: PropTypes.func.isRequired
    };

    state = {
        fname : '',
        lname : '',
        email : '',
        pass : ''
    };

    componentWillMount(){
        this.setState({
            fname : '',
            lname : '',
            email : '',
            pass : ''
        });
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <h1>Sign Up</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="fname"
                                placeholder="First Name"
                                value={this.state.fname}
                                onChange={(event) => {
                                    this.setState({
                                        fname: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="lname"
                                placeholder="Last Name"
                                value={this.state.lname}
                                onChange={(event) => {
                                    this.setState({
                                        lname: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                label="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                value={this.state.pass}
                                onChange={(event) => {
                                    this.setState({
                                        pass: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSignUp(this.state)}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormErrors from "./FormErrors";

class Signup extends Component {

    static propTypes = {
        handleSignUp: PropTypes.func.isRequired
    };

    state = {
        fname : '',
        lname : '',
        email : '',
        pass : '',
        formErrors: {email: '', password: '',fname:'',lname:''},
        emailValid: false,
        passwordValid: false,
        fnameValid: false,
        lnameValid: false,
        formValid: false
    };

    componentWillMount(){
        this.setState({
            fname : '',
            lname : '',
            email : '',
            pass : ''
        });
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let fnameValid = this.state.fnameValid;
        let lnameValid = this.state.lnameValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
                fieldValidationErrors.password = passwordValid ? '': ' must include one lowercase character, one uppercase character, a number, and a special character and should be 8 characters long.';
                break;
            case 'firstname':
                fnameValid = value.length != 0;
                fieldValidationErrors.firstname = fnameValid ? '': ' is required';
                break;

            case 'lastname':
                lnameValid = value.length != 0 ;
                fieldValidationErrors.lastname = lnameValid ? '': ' is required';
                break;

            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            fnameValid:fnameValid,
            lnameValid:lnameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.fnameValid && this.state.lnameValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    render() {
        return (
<div>
            <div className='panel panel-default'>
                <FormErrors formErrors={this.state.formErrors} />
            </div>

            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <h1>Sign Up</h1>
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.fname)}`}>
                            <input
                                className="form-control"
                                type="text"
                                label="fname"
                                placeholder="First Name"
                                value={this.state.fname}
                                onChange={(event) => {
                                    const name="firstname"
                                    const value=event.target.value
                                    this.setState({
                                        fname: event.target.value
                                    }, () => { this.validateField(name, value) });
                                }}
                            />
                        </div>

                        <div className={`form-group ${this.errorClass(this.state.formErrors.lname)}`}>
                            <input
                                className="form-control"
                                type="text"
                                label="lname"
                                placeholder="Last Name"
                                value={this.state.lname}
                                onChange={(event) => {
                                    const name="lastname"
                                    const value=event.target.value
                                    this.setState({
                                        lname: event.target.value
                                    }, () => { this.validateField(name, value) });
                                }}
                            />
                        </div>

                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                            <input
                                className="form-control"
                                type="email"
                                label="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={(event) => {
                                    const name="email"
                                    const value=event.target.value
                                    this.setState({
                                        email: event.target.value
                                    }, () => { this.validateField(name, value) });
                                }}
                            />
                        </div>

                        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                value={this.state.pass}
                                onChange={(event) => {
                                    const name="password"
                                    const value=event.target.value
                                    this.setState({
                                        pass: event.target.value
                                    }, () => { this.validateField(name, value) });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                disabled={!this.state.formValid}
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSignUp(this.state)}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
</div>
        );
    }
}

export default Signup;
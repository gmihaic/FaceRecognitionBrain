import React, {Component} from 'react';
import './Signin.css'
import Validation from './../../SubComponents/Validation/Validation';
import {is_email_valid} from 'node-email-validation';

class Signin extends Component {

    constructor(props) {       
        super(props);  
        this.props = props;   
        
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errors: [],
            is_loading: false          
        }         
    }   

    onEmailChange = (event) => {
        this.setState(
            {signInEmail: event.target.value}
        );
    }

    onPasswordChange = (event) => {
        this.setState(
            {signInPassword: event.target.value}
        );
    }

    onSubmitSignIn = () => {

        let {signInEmail, signInPassword} = this.state;

        const errors = [];

        signInEmail = signInEmail.trim();
        signInPassword = signInPassword.trim();
                
        if (signInEmail.length === 0 || !is_email_valid(signInEmail)) {
            errors.push("Please enter a valid email");
        } 

        if (signInPassword.length === 0 || signInPassword.length < 8) {
            errors.push("Please enter a password of at least 8 characters");
        }
     
        if (errors.length > 0) {
            
            this.setState({
                errors: errors
            });

            return;

        } else {
            this.setState({
                errors: []
            });            
        }

        this.setState({
            is_loading: true
        });

        fetch(process.env.REACT_APP_BACKEND_URL + "/signin", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
         .then((response) => response.json())
         .then((data) => {

            this.setState({
                is_loading: false
            });

             if (data && data?.email) {
                this.props.loadUser(data); 
                this.props.onRouteChange("home");
             } else {   
                this.setState({
                    errors: ["Could not sign in"]
                });             
             }
         })
         .catch((err) => {
            this.setState({
                errors: ["Could not sign in"],
                is_loading: false
            });
         })                        
    }

    checkEnterSubmit = (event) => {
        if (event.keyCode === 13) {
            this.onSubmitSignIn();
        }
    }    
           
    render() {           
        
        const { onRouteChange } = this.props;

        return (
            <>            
                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">      
                    <main className="pa4 black-80">
                        <div className="measure">

                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onKeyUp={this.checkEnterSubmit} onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onKeyUp={this.checkEnterSubmit} onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                                </div>                            
                            </fieldset>

                            <Validation key="SigninValidation" type="signin" errors={this.state.errors} />

                            {!this.state.is_loading ?
                                <>
                                    <div className="">
                                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                                    </div>

                                    <div className="lh-copy mt3">
                                        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>                            
                                    </div>
                                </>
                                :
                                <div>
                                    Signing in...
                                </div>
                            }
                        </div>
                    </main>         
                    </article>                      
            </>
        );
    }
}

export default Signin;
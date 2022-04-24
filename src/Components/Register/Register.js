import React, {Component} from 'react';
import {countries} from 'countries-list';
import Validation from './../../SubComponents/Validation/Validation';
import {is_email_valid} from 'node-email-validation';

class Register extends Component {

    constructor(props) {
       
        super();  
        this.props = props;    
        
        this.state = {
            email: '',
            password: '',
            name: '',
            country: '',            
            errors: [],
            is_loading: false
        }  
    }   

    onNameChange = (event) => {
        this.setState(
            {name: event.target.value}
        );
    }    

    onEmailChange = (event) => {
        this.setState(
            {email: event.target.value}
        );
    }

    onPasswordChange = (event) => {
        this.setState(
            {password: event.target.value}
        );
    }

    onCountryChange = (event) => {
        this.setState(
            {country: event.target.value}
        );
    }    

    onSubmitRegister = () => {     
        
        let {email, password, name, country} = this.state;

        const errors = [];

        email = email.trim();
        password = password.trim();
        name = name.trim();
        country = country.trim();
          
        if (email.length === 0 || !is_email_valid(email)) {
            errors.push("Please enter a valid email");
        } 

        if (password.length === 0 || password.length < 8) {
            errors.push("Please enter a password of at least 8 characters");
        }

        if (name.length === 0) {
            errors.push("Please enter your name");
        }

        if (country.length === 0) {
            errors.push("Please select your country");
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
        
        fetch(process.env.REACT_APP_BACKEND_URL + "/register", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                country: country
            })
        })
         .then((response) => response.json())
         .then((user) => {

            this.setState({
                is_loading: false
            });

             if (user && user?.email) {

                this.props.loadUser(user);  
                this.props.onRouteChange("home");
                
             } else {    
                this.setState({
                    errors: ["Could not register"]
                });       
             }
         })
         .catch((err) => {
            this.setState({
                errors: ["Could not register"],
                is_loading: false
            });
         })                 
    }    

    getCountrySelectOptions = () => {
        const options = [];

        options.push(<option key={"countryOption" + "Nuffin"} value="">Please choose</option>)

        for (let countryCode in countries) {
            options.push(<option key={"countryOption" + countryCode} value={countries[countryCode].name}>{countries[countryCode].name}</option>);
        }

        return options;
    }

    checkEnterSubmit = (event) => {
        if (event.keyCode === 13) {
            this.onSubmitRegister();
        }
    }
           
    render() {         
        
        const {onRouteChange} = this.props;

        return (
            <>            
                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">      
                    <main className="pa4 black-80">
                        <div className="measure">
                            
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input onKeyUp={this.checkEnterSubmit} onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onKeyUp={this.checkEnterSubmit} onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onKeyUp={this.checkEnterSubmit} onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                                </div>    
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="country">Country</label>
                                    <select onChange={this.onCountryChange} id="country" name="country" className="b pa2 ba bg-transparent hover-bg-black hover-white w-100" >
                                        {this.getCountrySelectOptions()}
                                    </select>
                                </div>                        
                            </fieldset>

                            <Validation key="RegisterValidation" type="register" errors={this.state.errors} />

                            {!this.state.is_loading ?
                                <>
                                    <div className="">
                                        
                                            <input onClick={() => this.onSubmitRegister()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />                                                                     
                                    </div>

                                    <div className="lh-copy mt3">
                                        <p onClick={() => onRouteChange('signin')} className="f6 link dim black db pointer">Sign in</p>                   
                                    </div>
                                </> 
                                :
                                <div>
                                    Registering...
                                </div>
                            }

                        </div>
                    </main>         
                    </article>                      
            </>
        );
    }
}

export default Register;
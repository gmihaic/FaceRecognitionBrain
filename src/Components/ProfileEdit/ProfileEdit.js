import React, {Component} from 'react';
import {countries} from 'countries-list';
import Validation from './../../SubComponents/Validation/Validation';
import {is_email_valid} from 'node-email-validation';

class Register extends Component {

    constructor(props) {
       
        super();  
        this.props = props;    
        
        this.state = {
            user_id: this.props.user.id,
            email: this.props.user.email,
            name: this.props.user.name,
            country: this.props.user.country,     
            current_password: '',
            new_password: '',             
            errors: [],
            is_loading: false
        }  
    }   

    onInputValueChange = (event) => {
        this.setState(
            {
                name: document.getElementById("profileNameInput").value,
                country: document.getElementById("profileCountryInput").value,
                current_password: document.getElementById("profileCurrentPasswordInput").value,
                new_password: document.getElementById("profileNewPasswordInput").value              
            }
        );
    }        

    onSubmitProfileEdit = () => {     
        
        let {name, country, current_password, new_password} = this.state;        
        const errors = [];
               
        name = name.trim();
        country = country.trim();

        current_password = current_password.trim();
        new_password = new_password.trim();
                      
        if (name.length === 0) {
            errors.push("Please enter your name");
        }

        if (country.length === 0) {
            errors.push("Please select your country");
        }

        if (current_password.length > 0 || new_password.length > 0) {
            if (current_password.length < 8 || new_password.length < 8) {
                errors.push("If changing the password, the new password must be at least 8 characters");
            }
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
        
        fetch(process.env.REACT_APP_BACKEND_URL + "/editprofile", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.state.user_id,
                name: name,
                country: country,
                current_password: current_password,
                new_password: new_password
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
                    errors: ["Could not update profile"]
                });       
             }
         })
         .catch((err) => {
            this.setState({
                errors: ["Could not update profile"],
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
            this.onSubmitProfileEdit();
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
                                <legend className="f1 fw6 ph0 mh0">My Profile</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="profileNameInput">Name</label>
                                    <input onKeyUp={this.checkEnterSubmit} onChange={this.onInputValueChange} value={this.state.name} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="profileNameInput" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="profileEmailInput">Email</label>
                                    <input onKeyUp={this.checkEnterSubmit} onChange={this.onInputValueChange} readOnly={true} value={this.state.email} className="pa2 input-reset ba bg-dark-gray hover-bg-black white hover-white w-100" type="email" name="email-address"  id="profileEmailInput" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="profileCountryInput">Country</label>
                                    <select onChange={this.onInputValueChange} value={this.state.country} id="profileCountryInput" name="country" className="b pa2 ba bg-transparent hover-bg-black hover-white w-100" >
                                        {this.getCountrySelectOptions()}
                                    </select>
                                </div>     
                                <hr></hr>
                                If you wish to change your password, type in your current password and the new password.
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="profileCurrentPasswordInput">Current Password</label>
                                    <input onKeyUp={this.checkEnterSubmit} onChange={this.onInputValueChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="currentPassword" id="profileCurrentPasswordInput" />
                                </div>    
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="profileNewPasswordInput">New Password</label>
                                    <input onKeyUp={this.checkEnterSubmit} onChange={this.onInputValueChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="currentPassword" id="profileNewPasswordInput" />
                                </div>                                  
                                <hr></hr>                                                 
                            </fieldset>

                            <Validation key="ProfileEditValidation" type="register" errors={this.state.errors} />

                            {!this.state.is_loading ?
                                <>
                                    <div className="">                                        
                                            <input onClick={() => this.onSubmitProfileEdit()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Edit Profile" />                                                                     
                                    </div>

                                    <div className="lh-copy mt3">
                                        <p onClick={() => onRouteChange('home')} className="f6 link dim black db pointer">Back to Home</p>                   
                                    </div>
                                </> 
                                :
                                <div>
                                    Updating profile...
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
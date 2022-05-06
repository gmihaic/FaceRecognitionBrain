import React, {Component} from 'react';

class Nav extends Component {

    constructor(props) {

        super();
        this.props = props;
    }   
           
    render() {
                                    
        if (this.props.isSignedIn) {    
            return ( 
                <nav style={{display: "flex", justifyContent: "flex-end"}}>
                { this.props.route !== "compare" 
                        ? <p onClick={() => this.props.onRouteChange('compare')} className='f3 link dim black underlined pa3 pointer'>Compare</p> 
                        : <p onClick={() => this.props.onRouteChange('home')} className='f3 link dim black underlined pa3 pointer'>Home</p>
                    }    
                                              
                    { this.props.route !== "profile" 
                        ? <p onClick={() => this.props.onRouteChange('profile')} className='f3 link dim black underlined pa3 pointer'>My Profile</p>
                        : <p onClick={() => this.props.onRouteChange('home')} className='f3 link dim black underlined pa3 pointer'>Home</p>
                    }             
                    <p onClick={() => this.props.onRouteChange('signout')} className='f3 link dim black underlined pa3 pointer'>Sign Out</p>                           
                </nav>
            );
        } else {
            return (
                <>
                    <nav style={{display: "flex", justifyContent: "flex-end"}}>
                        <p onClick={() => this.props.onRouteChange('signin')} className='f3 link dim black underlined pa3 pointer'>Sign In</p>
                        <p onClick={() => this.props.onRouteChange('register')} className='f3 link dim black underlined pa3 pointer'>Register</p>
                    </nav>                    
                </>
            );
        }
                
    }
}

export default Nav;
import React, {Component} from 'react';

class Nav extends Component {

    constructor() {

        super();
       
    }   
           
    render() {
             
        return (
            <>            
               <nav style={{display: "flex", justifyContent: "flex-end"}}>
                   <p className='f3 link dim black underlined pa3 pointer'>Sign Out</p>
                </nav>
            </>
        );
    }
}

export default Nav;
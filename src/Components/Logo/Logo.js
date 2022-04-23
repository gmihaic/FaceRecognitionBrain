import React, {Component} from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'

class Logo extends Component {

    constructor() {

        super();
       
    }   
           
    render() {             
        return (
            <>                          
                <div className='logoContainer ma4 mt0'>
                    <Tilt className="Tilt br2 shadow-2 pa3">
                        <div>
                            <img alt="Logo" src={brain} />
                        </div>
                    </Tilt>
                </div>              
            </>
        );
    }
}

export default Logo;
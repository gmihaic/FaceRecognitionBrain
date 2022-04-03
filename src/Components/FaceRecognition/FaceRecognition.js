import React, {Component} from 'react';
import './FaceRecognition.css'

class FaceRecognition extends Component {

    constructor(props) {
       
        super();  
        this.props = props;              
    }   
           
    render() {             
        return (
            <>                          
                <div className='center ma'> 
                    <div className='absolute mt2'>
                        <img alt='' src={this.props.imageURL} width='500px' height='auto' />       
                    </div>                                
                </div>              
            </>
        );
    }
}

export default FaceRecognition;
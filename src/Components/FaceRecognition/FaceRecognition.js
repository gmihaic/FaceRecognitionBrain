import React, {Component} from 'react';
import './FaceRecognition.css'

class FaceRecognition extends Component {

    constructor(props) {
       
        super();                
    }   
           
    render() {             
        return (
            <>                          
                <div className='center'> 
                    <img alt='' src={'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgwNTA1Mzc0MzgwNTMzMzky/gettyimages-150327735-copy.jpg'} />
                </div>              
            </>
        );
    }
}

export default FaceRecognition;
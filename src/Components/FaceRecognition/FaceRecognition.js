import React, {Component} from 'react';
import './FaceRecognition.css'
import Validation from './../../SubComponents/Validation/Validation';

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
                        <Validation key="FacereqValidation" type="facereq" errors={this.props.image_errors} />
                        {(this.props.image_errors.length === 0) ? <>
                        <img id='faceRecognitionImage' alt='' src={this.props.imageURL} width='500px' height='auto' />       
                        <div className="bounding-box" style={{top: this.props.box.topRow, right: this.props.box.rightCol, bottom: this.props.box.bottomRow, left: this.props.box.leftCol}}></div>
                        </> : <></>}
                    </div>                                
                </div>              
            </>
        );
    }
}

export default FaceRecognition;
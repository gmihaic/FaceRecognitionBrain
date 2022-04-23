import React, {Component} from 'react';

class BoundingBox extends Component {

    constructor(props) {       
        super();  
        this.props = props;                  
    }   

    componentWillUnmount() {
        window.removeEventListener('load', this.setBoundingBox);
    }

    componentDidMount() {            
        setTimeout(() => {
            this.setBoundingBox();
        }, 500);                                 
    }

    componentDidUpdate() {             
        this.setBoundingBox();                 
    }
    
    setBoundingBox = () => {             
        const faceBox = this.getBoundingBoxCoords();
        const boundingBox = document.getElementById(this.props.bbid);
                       
        boundingBox.style.top = faceBox.topRow + "px";
        boundingBox.style.right = faceBox.rightCol + "px";
        boundingBox.style.bottom = faceBox.bottomRow + "px";
        boundingBox.style.left = faceBox.leftCol + "px";    

        if (this.props.onBoxLoaded) {           
            this.props.onBoxLoaded();
        }
    }
    
    getBoundingBoxCoords = () => {                        
        const clarifaiFace = this.props.detection; //server API returns bounding box
        
        const image = document.querySelectorAll(this.props.qSel)[0];
        const width = Number(image.width);
        const height = Number(image.height);
                        
        const faceBox = {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        };
           
        return faceBox;           
    }

    check = () => {       
        return null;
    }
               
    render() {                       
        return (
            <div key={this.props.bbid} id={this.props.bbid} className="bounding-box">{this.check()}</div>            
        );
    }
}

export default BoundingBox;
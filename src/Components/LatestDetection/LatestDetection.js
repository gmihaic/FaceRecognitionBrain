import React, {Component} from 'react';
import './LatestDetection.css';
import BoundingBox from './../../SubComponents/BoundingBox/BoundingBox';

class LatestDetection extends Component {

    constructor(props) {       
        super();  
        this.props = props;                  

        this.state = {
            detection: null
        };               
    }   

    loadNewData = () => {                

        let fetchURL = "http://localhost:3610/latestimage";
        fetchURL += "/" + (new Date().getTime() - 20000);

        if (this?.props?.user?.id) {
            fetchURL += "/" + this.props.user.id;
        }
       
        fetch(fetchURL, {
                method: 'get',                                
            })
            .then((response) => response.json())
            .then((data) => {               
                if (data && data.image_url) {                                        
                    this.setState({
                        detection: data
                    });
                } else {    
                    this.setState({
                        detection: null
                    });           
                }
            });
    }

    componentWillUnmount() {
        clearInterval(this.updateTimer);
    }

    componentDidMount() {       
        this.updateTimer = setInterval(() => this.loadNewData(), 20000);
    }
   
    onBoxLoaded = () => {       
        const latestDetectionContainer = document.getElementById("latestDetectionContainer");
        latestDetectionContainer.classList.add("latestDetectionContainerShown");        

        setTimeout(() => {
            latestDetectionContainer.classList.remove("latestDetectionContainerShown");
        }, 15000);
    }
               
    render() {         
        
        const {detection} = this.state;

        if (!detection) {
            return(
                <>
                </>
            );
        }        

        return (
            <>            
                <div key={"latestDetectedImageBoundingContainer"} id="latestDetectionContainer">                 
                    <span className="dark-blue b ttu">{detection.user.name}</span> from <span className="dark-blue b ttu">{detection.user.country}</span> just detected a face on an image!   
                    <div className="relative">  
                        <img className="mt2 latestDetectedImage" alt='' src={detection.image_url} width='100%' height='auto' />     
                        <BoundingBox key={"latestDetectedImageBoundingBox"} qSel=".latestDetectedImage" bbid="latestDetectionBoundingBox" detection={detection.detect_data} onBoxLoaded={this.onBoxLoaded} />                                                                                
                    </div>
                </div>                              
            </>
        );
    }
}

export default LatestDetection;
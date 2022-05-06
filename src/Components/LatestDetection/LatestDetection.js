import React, {Component} from 'react';
import './LatestDetection.css';

class LatestDetection extends Component {

    constructor(props) {       
        super();  
        this.props = props;                  

        this.state = {
            detection: null,
            displaying_current: false,
            last_timestamp: (new Date().getTime() - 20000) //initial timestamp is 20 secs ago
        };               
    }   

    loadNewData = () => {         
        
        if (this.state.displaying_current) {
            return false;
        }

        let fetchURL = process.env.REACT_APP_BACKEND_URL + "/latestimage";
        fetchURL += "/" + this.state.last_timestamp;

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
                        detection: data,
                        displaying_current: true,
                        last_timestamp: (new Date().getTime() + 5000)
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
        this.updateTimer = setInterval(() => this.loadNewData(), 5000);
    }
   
    onBoxLoaded = () => {       
        const latestDetectionContainer = document.getElementById("latestDetectionContainer");
        latestDetectionContainer.classList.add("latestDetectionContainerShown");        

        setTimeout(() => {
            latestDetectionContainer.classList.remove("latestDetectionContainerShown");
            
            setTimeout(() => {
                this.setState({
                    detection: null,
                    displaying_current: false,
                    last_timestamp: (new Date().getTime() + 5000)                 
                });
            }, 4000);

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
                    </div>
                </div>                              
            </>
        );
    }
}

export default LatestDetection;
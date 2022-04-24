import React, {Component} from 'react';
import './TopUserImages.css';
import BoundingBox from './../../SubComponents/BoundingBox/BoundingBox';

class TopUserImages extends Component {

    constructor(props) {       
        super();  
        this.props = props;    
        
        this.state = {
            "images": [],
            "entries": props.entries,
            "calcEntries": 0
        };        
    }   

    componentDidMount() {            
        this.loadNewData();
    }    

    componentDidUpdate() {          
        if (this.props.entries > this.state.calcEntries) {
            this.loadNewData();
        }
    }       

    loadNewData = () => {         
                        
        const fetchURL = `${process.env.REACT_APP_BACKEND_URL}/topforuser/${this.props.user.id}/3`;
                      
        fetch(fetchURL, {
                method: 'get',                                
            })
            .then((response) => response.json())
            .then((data) => {               
                if (data && data.length > 0) {                                        
                    this.setState({
                        images: data,
                        calcEntries: this.props.entries           
                    });
                } else {    
                    this.setState({
                        images: []
                    });           
                }
            });
    }              
               
    render() {         
        
        const {images} = this.state;

        if (!images || images.length === 0) {
            return(
                <>
                </>
            );
        }        

        return (
            <>
                <h2>Your top images</h2>                
                <div className="imageListContainer">                    
                    {images.map((elem, idx) => {
                        return (
                            <div key={"topUserImageElementContainer" + this.props.prependK + idx} className="imageListElement dib grow shadow-2">
                                <div className="relative"> 
                                    <div className="imageListElementDetectionCount br-100 shadow-3 pa2 bg-light-blue f5 fw-4 avenir">{elem.detections}</div>
                                    <img key={"topUserImage" + this.props.prependK + idx} id={"topUserImage" + this.props.prependK + idx} className="topUserImage" alt='' src={elem.image_url} />
                                    {<BoundingBox key={"topUserImageBoundingBox" + this.props.prependK + idx} qSel={"#topUserImage" + this.props.prependK + idx} bbid={"topUserImageBoundingBox" + this.props.prependK+ idx} detection={elem.detect_data} />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

export default TopUserImages;
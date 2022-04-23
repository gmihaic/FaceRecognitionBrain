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

        console.log("props", props);
    }   

    componentDidMount() {    
        console.log("mounted");   
        this.loadNewData();
    }    

    componentDidUpdate() {    
        console.log("updated");   
        //this.loadNewData();
        console.log("tui props", this.props);
        console.log("tui state", this.state);

        if (this.props.entries > this.state.calcEntries) {
            this.loadNewData();
        }
    }       

    loadNewData = () => {         
                
        console.log("loading TUI data");
        const fetchURL = `http://localhost:3610/topforuser/${this.props.user.id}/3`;
                      
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
                            <div key={"topUserImageElementContainer" + idx} className="imageListElement dib grow shadow-2">
                                <div className="relative"> 
                                    <img key={"topUserImage" + idx} id={"topUserImage" + idx} className="topUserImage" alt='' src={elem.image_url} width='100%' height='auto' />
                                    {<BoundingBox key={"topUserImageBoundingBox" + idx} qSel={"#topUserImage" + idx} bbid={"topUserImageBoundingBox" + idx} detection={elem.detect_data} />}
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
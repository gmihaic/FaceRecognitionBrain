import React, {Component} from 'react';
import './Rank.css'

class Rank extends Component {

    constructor(props) {

        super();
        this.props = props;
    }   
           
    render() {    

        const {name, entries} = this.props;

        return (
            <>                          
                <div>      
                    <div className="white f3">
                        {name}, your current entry count is ...                       
                    </div>   
                    <div className="white f1">
                        {entries}
                    </div>                                   
                </div>              
            </>
        );
    }
}

export default Rank; 
import React, {Component} from 'react';
import './Rank.css'

class Rank extends Component {

    constructor() {

        super();
       
    }   
           
    render() {             
        return (
            <>                          
                <div>      
                    <div className="white f3">
                        {'Andrei, your current rank is ...'}
                    </div>   
                    <div className="white f1">
                        {'#5'}
                    </div>                                   
                </div>              
            </>
        );
    }
}

export default Rank; 
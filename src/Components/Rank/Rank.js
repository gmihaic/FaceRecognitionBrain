import React, {Component} from 'react';
import './Rank.css'
import TopUserImages from './../TopUserImages/TopUserImages';

class Rank extends Component {

    constructor(props) {

        super();
        this.props = props;
    }      
           
    render() {    

        const {name, entries, user} = this.props;

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

                <TopUserImages entries={entries} prependK={this.props.prependK} key={this.props.prependK + "topUserImages"} user={user} />            
            </>
        );
    }
}

export default Rank; 
import React, {Component} from 'react';
import md5 from 'md5';
import './Validation.css'

class Validation extends Component {

    constructor(props) {

        super();
        this.props = props;
    }   
           
    render() {    

        const {errors, type} = this.props;

        if (errors.length === 0) {
            return(
                <></>
            );
        }

        return (
            <>                          
               <div className="errorsContainer bg-light-pink dark-red mb3">
                   {errors.map((elem) => {
                       return <div key={`errorElement-${type}-{${md5(elem)}}`} className="errorElement pa1">{elem}</div>
                   })}
               </div>    
            </>
        );
    }
}

export default Validation; 
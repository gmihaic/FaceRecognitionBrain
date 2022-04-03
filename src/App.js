import React, {Component} from 'react';
import Nav from './Components/Nav/Nav'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Rank from './Components/Rank/Rank'
import Particles from 'react-tsparticles';
import Clarifai from 'clarifai';
import {particleOptions} from './config.js'
import './App.css';

const cApp = new Clarifai.App({
  apiKey: "b54fcccc6684474aaaa1c2bcb8b76479"
});

class App extends Component {  

  constructor() {
    super();
    this.state = {
      input: ''
    }   
  }

  onInputChange = (event) => {    
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    console.log("click");

    cApp.models.predict(
      Clarifai.FACE_DETECT_MODEL, //model
      "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgwNTA1Mzc0MzgwNTMzMzky/gettyimages-150327735-copy.jpg").then(
      (response) => {
        console.log(response);
      },
      (error) => {

      }
    );

  }

  render() {      
      return (
        <div className="App">
              <Particles
                className="particles"
                id="tsparticles"           
                options={particleOptions}
              />    
    
          <Nav title="test" />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />                    
          <FaceRecognition />         
        </div>
      );
  }
  
}

export default App;

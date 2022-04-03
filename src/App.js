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
      input: '',
      imageURL: ''
    }   

    this.inputURL = "";
  }

  onInputChange = (event) => {    
    this.setState({
      "input": event.target.value
    });
  }

  onButtonSubmit = (event) => {
    
    this.setState(
      {imageURL: this.state.input}
    );

    cApp.models.predict(
      Clarifai.FACE_DETECT_MODEL, //model
      this.state.input).then(
      (response) => {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
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
          <FaceRecognition imageURL={this.state.imageURL} />         
        </div>
      );
  }
  
}

export default App;

import React, {Component} from 'react';
import Nav from './Components/Nav/Nav'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
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
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }   

    this.inputURL = "";
  }

  /*componentDidMount() {
    fetch("http://localhost:3610")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }*/

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('faceRecognitionImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayFaceBox = (box) => {       
    this.setState(
      {box: box}
    );
  }

  onInputChange = (event) => {    
    this.setState({
      "input": event.target.value
    });
  }

  onButtonSubmit = (event) => {
    
    this.setState(
      {
        imageURL: this.state.input,
        box: {}
      }
    );

    cApp.models.predict(
        Clarifai.FACE_DETECT_MODEL, //model
        this.state.input
      )
      .then(
        (response) => {
          //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
          this.displayFaceBox(this.calculateFaceLocation(response));
        }      
      )
      .catch((err) => {
        console.error(err);
      });

  }

  onRouteChange = (route) => {   
    
    this.setState({
      route: route,
      isSignedIn: (route === "home") ? true : false
    });    
  }  

  render() {          
    
      const { isSignedIn, imageURL, route, box } = this.state;

      return (
       
        <div className="App">
              <Particles
                className="particles"
                id="tsparticles"           
                options={particleOptions}
              />    
    
          <Nav isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} title="test" />
         
          { route === 'home' ?
            <>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />                    
            <FaceRecognition key="facereq" box={box} imageURL={imageURL} />     
            </>
            :
            (
              (route === 'signin' || route === 'signout') ? <Signin onRouteChange={this.onRouteChange} /> :
              <Register onRouteChange={this.onRouteChange} />
            )
         }
        </div>
      );
  }
  
}

export default App;

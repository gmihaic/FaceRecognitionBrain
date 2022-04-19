import React, {Component} from 'react';
import Nav from './Components/Nav/Nav'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
import Rank from './Components/Rank/Rank'
import Particles from 'react-tsparticles';
import {particleOptions} from './config.js'
import './App.css';

class App extends Component {  

  constructor() {
    super();
    
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',       
        email: '',
        entries: 0,
        joined: ''
      }
    }   

    this.inputURL = "";
  }

  /*componentDidMount() {
    fetch("http://localhost:3610")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }*/

  loadUser = (data) => {   
    this.setState({
      "user": {
        id: data.id,
        name: data.name,       
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  calculateFaceLocation = (data) => {
    //const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const clarifaiFace = data; //server API returns bounding box
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

    const imageAPIURL = 'http://localhost:3610/recogniseImage';

    fetch(imageAPIURL, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "imageURL": this.state.input            
        })
    })
      .then((response) => response.json())
      .then((imageData) => {
          if (imageData && imageData?.top_row) {
            
            //incr image hits
            fetch("http://localhost:3610/image", {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id                    
                })
            })
            .then((response) => response.json())
            .then((data) => {
                //if (data === 'success') {
                if (data) {
                    //const userState = {...this.state.user};
                    //userState.entries = data;
                    //this.loadUser(userState);
                    
                    this.setState(Object.assign(this.state.user, {entries: data}));
                } else {               
                }
            });

            //display face box
            this.displayFaceBox(this.calculateFaceLocation(imageData));
          } else {   

          }
      });

    /*cApp.models.predict(
        Clarifai.FACE_DETECT_MODEL, //model
        this.state.input
      )
      .then(
        (response) => {
          //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
          if (response) {            
            fetch("http://localhost:3610/image", {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id                    
                })
            })
            .then((response) => response.json())
            .then((data) => {
                //if (data === 'success') {
                if (data) {
                    //const userState = {...this.state.user};
                    //userState.entries = data;
                    //this.loadUser(userState);
                    
                    this.setState(Object.assign(this.state.user, {entries: data}));
                } else {               
                }
            });  
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
        }      
      )
      .catch((err) => {
        console.error(err);
      });*/

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
            <Rank key="facerank" name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />                    
            <FaceRecognition key="facereq" box={box} imageURL={imageURL} />     
            </>
            :
            (
              (route === 'signin' || route === 'signout') ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
         }
        </div>
      );
  }
  
}

export default App;

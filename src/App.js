import React, {Component} from 'react';
import Session from 'react-session-api';
import Nav from './Components/Nav/Nav';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import ProfileEdit from './Components/ProfileEdit/ProfileEdit';
import Rank from './Components/Rank/Rank';
import LatestDetection from './Components/LatestDetection/LatestDetection';
import Particles from 'react-tsparticles';
import {particleOptions} from './config.js'
import './App.css';

class App extends Component {  

  constructor() {
    super();
    
    Session.config(true, 14400);

    const userData = this.getUserData();

    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: (userData && userData.id) ? 'home' : 'signin',
      isSignedIn: (userData && userData.id) ? true : false,      
      user: userData,
      image_errors: [],
      image_is_loading: false
    }       

    this.inputURL = "";        
  }  

  loadUser = (data) => {   

    const newUserObj = {
      id: data.id,
      name: data.name,       
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      country: data.country
    };
    
    Session.set("user", JSON.stringify(newUserObj));

    this.setState({
      "user": this.getUserData()
    });
  }

  getUserData = () => {
    
    let sessionUser = Session.get("user");

    if (sessionUser && typeof(sessionUser) === "string" && sessionUser.length > 0) {      
      sessionUser = JSON.parse(sessionUser);
    }
    
    if (!sessionUser || !sessionUser.id) {
      sessionUser = {
        id: '',
        name: '',       
        email: '',
        entries: 0,
        joined: ''
      };      
    }

    return sessionUser;
  }

  calculateFaceLocation = (data) => {    
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
      "input": event.target.value.trim()
    });
  }

  onDetect = (event) => {
    
    const errors = [];
       
    try {       
        if (!this.state.input || (this.state.input.substr(0, 7) != "http://" && this.state.input.substr(0, 8) != "https://") ) {
          throw "invalid image";
        }               
    } 
    catch (err) {        
        errors.push("Invalid image URL");
    }

    if (errors.length > 0) {
      
      this.setState({
        "image_errors": errors
      });

      return;

    } else {
      this.setState({
        "image_errors": []
      });
    }

    this.setState(
      {
        imageURL: this.state.input.trim(),
        image_is_loading: true,
        box: {}
      }
    );    
    
    const imageAPIURL = process.env.REACT_APP_BACKEND_URL + '/recogniseImage';

    fetch(imageAPIURL, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "imageURL": this.state.input            
        })
    })
      .then((response) => response.json())
      .then((imageData) => {

          this.setState(
            {           
              image_is_loading: false,
              input: ""         
            }
          );    

          document.getElementById("imageDetectUrlInput").value = "";

          if (imageData && imageData?.top_row) {
            
            //incr image hits
            fetch(process.env.REACT_APP_BACKEND_URL + "/image", {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id,
                    imageURL: this.state.imageURL,
                    detectData: imageData                
                })
            })
            .then((response) => response.json())
            .then((data) => {               
                if (data) {                                        
                    this.setState(Object.assign(this.state.user, {entries: data}));                                        
                } else {               
                }
            })
            .catch((err) => {
                this.setState({
                  "image_errors": ["Could not detect the face on the image"]
                });
            }) 

            //display face box
            this.displayFaceBox(this.calculateFaceLocation(imageData));
          } else {   
            this.setState({
              "image_errors": ["Could not detect the face on the image"]
            });
          }
      })
      .catch((err) => {
        this.setState(
          {           
            image_is_loading: false,
            "image_errors": ["Could not detect the face on the image"]
          }
        );    
      }) 
  }

  onRouteChange = (route) => {   
    
    if (route === "signout") {
      
      Session.set("user", null);

      this.setState({
        imageURL: ""
      });      
    }
    
    this.setState({
      route: route,
      isSignedIn: (route === "home" || route === "profile") ? true : false
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
    
          <Nav isSignedIn={isSignedIn} route={this.state.route} onRouteChange={this.onRouteChange} title="test" />
         
          { route === 'home' ?
            <>
              <Logo />
              <LatestDetection user={this.state.user} />
              <Rank user={this.state.user} prependK={"homeRank"} key="facerank" name={this.state.user.name} entries={this.state.user.entries} />                        
              <ImageLinkForm image_is_loading={this.state.image_is_loading} onInputChange={this.onInputChange} onDetect={this.onDetect} />                    
              <FaceRecognition image_errors={this.state.image_errors} key="facereq" box={box} imageURL={imageURL} />                 
            </>
            :
            (
              (route === 'profile')
              ?
              (
                <>
                  <Logo />
                  <ProfileEdit user={this.state.user} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  <Rank user={this.state.user} prependK={"profileRank"} key="facerankprofile" name={this.state.user.name} entries={this.state.user.entries} />                  
                </>
              )
              :
              (
                (route === 'signin' || route === 'signout') 
                ? 
                  <>
                    <Logo />
                    <LatestDetection />
                    <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  </> 
                :
                <>
                  <Logo />
                  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                </>
              )
              
            )
         }
        </div>
      );
  }
  
}

export default App;

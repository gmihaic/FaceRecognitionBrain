import React, { Component } from "react";
import Session from "react-session-api";
import Nav from "./Components/Nav/Nav";
import Logo from "./Components/Logo/Logo";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import ProfileEdit from "./Components/ProfileEdit/ProfileEdit";
import Rank from "./Components/Rank/Rank";
import LatestDetection from "./Components/LatestDetection/LatestDetection";
import Particles from "react-tsparticles";
import { particleOptions } from "./config.js";
import "./App.css";
import FaceCompare from "./Components/FaceCompare/FaceCompare";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";

class App extends Component {
  constructor() {
    super();

    Session.config(true, 14400);

    const userData = this.getUserData();

    this.state = {
      route: userData && userData.id ? "home" : "signin",
      isSignedIn: userData && userData.id,
      user: userData,
      imageUrl: "",
    };
  }

  loadUser = (data) => {
    const newUserObj = {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      country: data.country,
    };

    Session.set("user", JSON.stringify(newUserObj));

    this.setState({
      user: this.getUserData(),
    });
  };

  getUserData = () => {
    let sessionUser = Session.get("user");

    if (
      sessionUser &&
      typeof sessionUser === "string" &&
      sessionUser.length > 0
    ) {
      sessionUser = JSON.parse(sessionUser);
    }

    if (!sessionUser || !sessionUser.id) {
      sessionUser = {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      };
    }

    return sessionUser;
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      Session.set("user", null);
    }

    this.setState({
      route: route,
      isSignedIn:
        route === "home" || route === "profile" || route === "compare",
    });
  };

  handleImgClick = (url) => {
    this.setState({ imageUrl: url });
  };

  handleCompare = () => {
    this.setState({ route: "compare" });
  };

  render() {
    const { isSignedIn, route } = this.state;

    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          options={particleOptions}
        />

        <Nav
          isSignedIn={isSignedIn}
          route={this.state.route}
          onRouteChange={this.onRouteChange}
          title="test"
        />

        {route === "home" ? (
          <>
            <Logo />
            <Rank
              user={this.state.user}
              name={this.state.user.name}
              entries={this.state.user.entries}
              onImgClick={this.handleImgClick}
            />
            <ImageLinkForm
              userId={this.state.user.id}
              initialUrl={this.state.imageUrl}
              onCompare={this.handleCompare}
              onUrlChange={({ target }) => {
                this.setState({ imageUrl: target.value.trim() })
              }
              }
              url={this.state.imageUrl}
            />
          </>
        ) : route === "compare" ? (
          <FaceCompare
            userId={this.state.user.id}
            imageUrl={this.state.imageUrl}
          />
        ) : route === "profile" ? (
          <>
            <Logo />
            <ProfileEdit
              user={this.state.user}
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
            <Rank
              user={this.state.user}
              prependK={"profileRank"}
              key="facerankprofile"
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
          </>
        ) : route === "signin" || route === "signout" ? (
          <>
            <Logo />
            <LatestDetection />
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </>
        ) : (
          <>
            <Logo />
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;

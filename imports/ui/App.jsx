import { withTracker } from 'meteor/react-meteor-data';
import Webcam from "react-webcam"
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/task.jsx'
import Form from "./form";
import Post from "./post";
import Nav from "./nav";
import "./app.css"

// App component - represents the whole app
class App extends Component {

  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    this.startCam();
  }

  startCam(){
    const video = document.getElementById("webcam")
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err0r) {
          console.log("Something went wrong!" + err0r);
        });
    }
  }

  getPhoto(){
    const video = document.getElementById("webcam");
    const track = video.srcObject.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track)
    imageCapture.takePhoto()
    .then(blob => createImageBitmap(blob))
    .then(imageBitmap => {
      const img = document.getElementById("image");
      img.src = "data:image/bmp,base64," + imageBitmap
      console.log(imageBitmap)
    })
    .catch(error => console.log(error));
  }

  
  render() {
    return (
      <div>
        <Nav></Nav>  
        <div className="main-container">
          <div className="main">
            <div className="main-top">
              <div className="form"> <Form/> </div>
              <div className="profile-user">
                <div onClick={()=>this.getPhoto()}>
                  <video id="webcam" style={{ height: 200, borderRadius:500, filter: "grayscale(50)"}}/>
                </div>
                <p>this is user profile</p>
              </div>
            </div>
            <div className="main-body">
              {/* left conatiner */}
              <div className="main-left">
                <div className="post-list"> <Post/> </div>
              </div>
            </div>
          </div>
      </div>
      <div className="footer">
        <span>&times; Post v2.0 &copy; 2019-2020 &times;</span>
      </div>
    </div>
    )
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
  };
})(App);
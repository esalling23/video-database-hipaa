import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoSrc: null, 
      streaming: false, 
      browser: null
    };

  }

  componentDidMount() {
    var video = this.refs.video;
    var canvas = this.refs.canvas;
    var streaming = this.state.streaming;
    var width = 320;
    var that = this;

    // console.log(video);


    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {

        // TO DO: Browser Detection for functionality on all browsers
        // that.browserDetection();

        // var source = that.state.browswer == 'Safari' ? stream : window.URL.createObjectURL(stream);

        that.setState({
          videoSrc: window.URL.createObjectURL(stream)
        });

        video.play();
    })
    .catch(function(err) {
        console.log("An error occured! " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        var height = video.videoHeight / (video.videoWidth/width);
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
  }

  // browserDetection() {
  //   //Check if browser is IE
  //   if (navigator.userAgent.search("MSIE") & gt; = 0) {
  //       // insert conditional IE code here
  //       this.setState({
  //         browser: 'IE'
  //       });

  //   }
  //   //Check if browser is Chrome
  //   else if (navigator.userAgent.search("Chrome") & gt; = 0) {
  //       // insert conditional Chrome code here
  //       this.setState({
  //         browser: 'Chrome'
  //       });
  //   }
  //   //Check if browser is Firefox 
  //   else if (navigator.userAgent.search("Firefox") & gt; = 0) {
  //       // insert conditional Firefox Code here
  //       this.setState({
  //         browser: 'Firefox'
  //       });
  //   }
  //   //Check if browser is Safari
  //   else if (navigator.userAgent.search("Safari") & gt; = 0 & amp; & amp; navigator.userAgent.search("Chrome") & lt; 0) {
  //       // insert conditional Safari code here
  //       this.setState({
  //         browser: 'Safari'
  //       });
  //   }
  //   //Check if browser is Opera
  //   else if (navigator.userAgent.search("Opera") & gt; = 0) {
  //       // insert conditional Opera code here
  //       this.setState({
  //         browser: 'Opera'
  //       });
  //   }

  // }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div className="camera">
          <video src={this.state.videoSrc} autoPlay="true" ref="video" />
          <button ref="startbutton" >Take video</button>
        </div>

        <canvas ref="canvas">
        </canvas>
        <div className="output">
          <img ref="photo" alt="The screen capture will appear in this box."/>
        </div>
      </div>
    );
  }

}

export default App;

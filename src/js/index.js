//jshint esversion:6

const video = document.getElementById("video");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUrl("./models"),
  faceapi.nets.faceLandmar68Net.loadFromUrl("./models"),
  faceapi.nets.faceRecognitionNet.loadFromUrl("./models"),
  faceapi.nets.faceExpressionNet.loadFromUrl("./models"),
]).then(startVideo);

//get access to webcam and stream video to browser
function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: {} })
    .then((stream) => (video.srcObject = stream))
    .catch((err) => console.error(err));
}

startVideo();

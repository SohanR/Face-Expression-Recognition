//jshint esversion:8

const video = document.getElementById("video");

Promise.all([
  faceapi.loadFaceLandmarkTinyModel("/models"),
  faceapi.loadFaceLandmarkModel("/models"),
  faceapi.loadFaceRecognitionModel("/models"),
  faceapi.loadFaceExpressionModel("/models"),
]).then(startVideo);

// get access to webcam and stream video to browser
function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: {} })
    .then((stream) => (video.srcObject = stream))
    .catch((err) => console.error(err));
}

startVideo();

//event listenrs for video
video.addEventListener("playing", () => {
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log(detections);
  }, 10000);
});

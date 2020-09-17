
const video = document.getElementById("video");
var id=1;
  console.log(event);
navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: 600,
      height: 500
    }
  })
  .then(stream => {
    video.srcObject = stream
    video.onloadedmetadata = () => {
      
      video.play();
      
  setTimeout(function(){cocoSsd.load().then(model => {
    // detect objects in the image.

          detectFrame(video,model);
  });}, 350);
    }
  });
  function detectFrame (video, model) {
    model.detect(video).then(predictions => {
    renderOurPredictions(predictions);
    requestAnimationFrame(() => {
       detectFrame(video, model);});
    });
  }
  function renderOurPredictions(predictions) {
    const canvas =  document.getElementById ("canvas");
    
    const ctx = canvas.getContext("2d");
    canvas.width  = 600;
    canvas.height = 500;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Fonts
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(video,0, 0,600,500);
  predictions.forEach(function(prediction,i) {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];
    
    // Bounding box
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 2;
    // Label background
    ctx.fillStyle = "#00FFFF";
    var box=document.getElementById('box'+(i+1));
    var price=getRand(1,10).toFixed(2);
    box.style.height=height+"px";
    box.style.width=width+"px";
    box.style.top=y+1200+"px";
    box.style.left=x+490+"px";
    box.style.display='block';
    boxes[i+1]=prediction.class;
    $("#box"+(i+1)).click(function(){
      boxClick(prediction.class,i+1);
    });
  
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
  });
  for(var j=4;j>predictions.length;j--){
    var box=document.getElementById('box'+(j));
     box.style.display='none';
    removeFromArray(j);
  }
  predictions.forEach(prediction => {
    
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
  });
};

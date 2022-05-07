import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ box, imgUrl, ...rest }) => {
  const imgRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const img = imgRef.current;
  const canvas = canvasRef.current;
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    if (img && canvas) {
      setWidth(img.offsetWidth);
      setHeight(img.offsetHeight);

      if (box) {
        console.log(box, "redraw");
        const context = canvas.getContext("2d");
        context.strokeStyle = "lime";
        context.lineWidth = 3;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(
          box.x * canvas.width,
          box.y * canvas.height,
          box.width * canvas.width,
          box.height * canvas.height
        );
      }
    }
  }, [box, canvas, img, imgUrl]);

  return (
    <div className="face-detection-root" {...rest}>
      <div className="face-detection-wrapper">
        <img ref={imgRef} src={imgUrl} />
        <canvas
          className="face-detection-canvas"
          ref={canvasRef}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;

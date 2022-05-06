import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ box, imgProps, ...rest }) => {
  const imgRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const img = imgRef.current;
  const canvas = canvasRef.current;

  React.useLayoutEffect(() => {
    if (img && canvas) {
      canvas.width = img.offsetWidth;
      canvas.height = img.offsetHeight;

      if (box) {
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
  }, [box, canvas, img]);

  return (
    <div className="face-detection-root" {...rest}>
      <img ref={imgRef} {...imgProps} />
      <canvas className="face-detection-canvas" ref={canvasRef} />
    </div>
  );
};

export default FaceRecognition;

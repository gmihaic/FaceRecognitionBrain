import React from "react";
import Validation from "../../SubComponents/Validation/Validation";
import { isUrlValid } from "../../utils/urlUtils";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import "./FaceCompare.css";

const FaceCompare = ({ userId, imageUrl }) => {
  const [loading, setLoading] = React.useState(false);
  const [url1, setUrl1] = React.useState(imageUrl);
  const [url2, setUrl2] = React.useState("");
  const [match, setMatch] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [box1, setBox1] = React.useState(null);
  const [box2, setBox2] = React.useState(null);
  const color = match > 70 ? "green" : match > 40 ? "orange" : "red";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUrlValid(url1)) {
      setError("First url is invalid.");
      return;
    }

    if (!isUrlValid(url2)) {
      setError("Second url is invalid.");
      return;
    }

    setMatch(null);
    setLoading(true);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/compare`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, images: [url1, url2] }),
    });
    const {
      distance,
      detections: [box1, box2],
    } = await res.json();
    setBox1(box1);
    setBox2(box2);
    setMatch(100 - distance * 100);
    setLoading(false);
    setError(null);
  };

  return (
    <div className="face-compare-root">
      <p className="f3">This Magic Brain will compare faces in two images.</p>
      <form
        className="face-compare-form center pa4 br3 shadow-5"
        onSubmit={handleSubmit}
      >
        <div className="face-compare-image-container pb2">
          <FaceRecognition
            imgUrl={url1}
            boxes={[box1]}
            style={{ maxWidth: "40%" }}
          />
          {match !== null && (
            <span
              className="face-compare-match f3 b"
              style={{
                color: color,
              }}
            >
              {Math.round(match)}%
            </span>
          )}
          <FaceRecognition
            imgUrl={url2}
            boxes={[box2]}
            style={{ maxWidth: "40%" }}
          />
        </div>
        <div className="face-compare-input-container">
          <input
            className="f4 pa2 w-70"
            type="text"
            onChange={({ target }) => {
              setBox1(null);
              setUrl1(target.value);
            }}
            value={url1}
          />
          {loading ? (
            <div className="pt3">Comparing images...</div>
          ) : (
            <button
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
              type="submit"
            >
              Compare
            </button>
          )}
          <input
            className="f4 pa2 w-70"
            type="text"
            onChange={({ target }) => {
              setBox2(null);
              setUrl2(target.value);
            }}
            value={url2}
          />
        </div>
      </form>
      <Validation errors={error ? [error] : []} />
    </div>
  );
};

export default FaceCompare;

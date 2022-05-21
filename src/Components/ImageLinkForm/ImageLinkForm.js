import React from "react";
import Validation from "../../SubComponents/Validation/Validation";
import { isUrlValid } from "../../utils/urlUtils";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ userId, url, onUrlChange, onCompare }) => {
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [boxes, setBoxes] = React.useState([]);

  React.useEffect(() => setBoxes([]), [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setBoxes([]);

    if (!isUrlValid(url)) {
      setErrors(["Invalid image URL"]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/recogniseImage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            imageURL: url,
          }),
        }
      );
      const { boxes } = await res.json();
      setBoxes(boxes);
    } catch {
      setErrors(["Could not detect the face on the image"]);
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <p className="f3">
          {
            "This Magic Brain will detect faces in your pictures. Give it a try!"
          }
        </p>

        <div className="center">
          <form
            className="image-link-form center pa4 br3 shadow-5"
            onSubmit={handleSubmit}
          >
            <FaceRecognition boxes={boxes} imgUrl={url} />
            <div className="image-link-form-input-container">
              <input
                className="f4 pa2 flex-auto"
                type="text"
                onChange={(e) => {
                  onUrlChange(e);
                }}
                value={url}
              />
              {loading ? (
                <div className="pt3">Detecting image...</div>
              ) : (
                <button
                  className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                  type="submit"
                >
                  Detect
                </button>
              )}
              {boxes.length > 0 && (
                <button
                  className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                  onClick={onCompare}
                >
                  Compare
                </button>
              )}
            </div>
            <Validation errors={errors} />
          </form>
        </div>
      </div>
    </>
  );
};

export default ImageLinkForm;

import React from "react";
import "./Rank.css";

const Rank = ({ name, entries, user, onImgClick }) => {
  const [images, setImages] = React.useState([]);

  const fetchImages = React.useCallback(async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/topforuser/${user.id}/20`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    setImages(data);
  }, [user.id]);

  React.useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <>
      <div>
        <div className="white f3">{name}, your current entry count is ...</div>
        <div className="white f1">{entries}</div>
      </div>
      <h2>Your recently used images</h2>
      <div className="imageListContainer">
        {images.map((elem, idx) => {
          return (
            <img
              key={`topUserImage${idx}`}
              className="topUserImage"
              alt=""
              src={elem.image_url}
              onClick={() => onImgClick(elem.image_url)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Rank;

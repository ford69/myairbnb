import React from "react";
import "../styles/ListingCard.scss";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const ListingCard = () => ({
  listingId,
    creator,
    listingPhotoPaths,
    city,
    province,
    country,
    category,
    type,
    price,
 }) => {
  return (
    <div className="listing-card">
      <div className="slider-container">
        <div className="slider">
        {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
                <img src={`http://localhost:3001/${photo.replace("public", "")}`} alt={`photo ${index + 1}`} />
                <div className="prev-button">
                    <IoArrowBack sx={{ fontSize: "15px"}} />
                </div>
                <div className="prev-button">
                    <IoArrowForward sx={{ fontSize: "15px"}} />
                </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

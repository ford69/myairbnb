import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Failed", err);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  console.log(listings);

  return (
    <>
    <div className="category-list">
      {categories?.map((category, index) => (
        <div
          className="category"
          key={index}
          onClick={() => setSelectedCategory(category.label)}
        >
          <div className="category_icon">{category.icon}</div>
          <p>{category.label}</p>
        </div>
      ))}
    </div>

      {loading ? <Loader /> : (
        <div className="listings">
            {listings.map((listing) => (<ListingCard/>))}
        </div>

      )}

    </>
    
  );
};

export default Listings;

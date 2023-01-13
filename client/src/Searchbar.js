import React, { useState } from "react";
import "./Searchbar.css";
import axios from "axios";

function Searchbar(props) {
  const [input, setInput] = useState(null);
  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(input);
  };
  const handleSubmit = (e) => {
    console.log("Fired");
    e.preventDefault();
    axios
      .get(`http://localhost:3001/search/${input}`)
      .then((data) => {
        props.func(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="container">
        <form className={"search-form"} onSubmit={handleSubmit}>
          <button type="submit" className="search-button">
            <svg
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.0398 40.3585L23.9943 27.2945C22.8295 28.2276 21.4901 28.9663 19.9759 29.5107C18.4616 30.055 16.8504 30.3272 15.142 30.3272C10.91 30.3272 7.32875 28.8598 4.39818 25.9251C1.46606 22.9888 0 19.4016 0 15.1636C0 10.9256 1.46606 7.3384 4.39818 4.40211C7.32875 1.46737 10.91 0 15.142 0C19.3741 0 22.9561 1.46737 25.8882 4.40211C28.8188 7.3384 30.2841 10.9256 30.2841 15.1636C30.2841 16.8743 30.0123 18.4879 29.4688 20.0043C28.9252 21.5206 28.1875 22.862 27.2557 24.0284L40.3594 37.1508C40.7865 37.5785 41 38.1034 41 38.7255C41 39.3476 40.767 39.8919 40.3011 40.3585C39.8741 40.7862 39.3305 41 38.6705 41C38.0104 41 37.4669 40.7862 37.0398 40.3585ZM15.142 25.6614C18.054 25.6614 20.5295 24.6412 22.5686 22.6007C24.6062 20.5587 25.625 18.0797 25.625 15.1636C25.625 12.2475 24.6062 9.76846 22.5686 7.72643C20.5295 5.68595 18.054 4.66572 15.142 4.66572C12.2301 4.66572 9.75458 5.68595 7.71545 7.72643C5.67788 9.76846 4.65909 12.2475 4.65909 15.1636C4.65909 18.0797 5.67788 20.5587 7.71545 22.6007C9.75458 24.6412 12.2301 25.6614 15.142 25.6614Z"
                fill="black"
              />
            </svg>
          </button>

          <input
            onChange={handleChange}
            type="text"
            className="search-input"
            placeholder="Search a track"
          ></input>
        </form>
      </div>
    </>
  );
}
export default Searchbar;

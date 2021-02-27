import React from "react";

const NewsletterInput = () => {
  return (
    <div className="search-bar mt-1">
            <div className="d-flex">
              <input
                type="text"
                placeholder="Zadejte Váš email"
                className="border-grey"
              />
              <button className="btn bg-blue text-white ">
                <span>Odebírat</span>
              </button>
            </div>
          </div>
  );
};

export default NewsletterInput;
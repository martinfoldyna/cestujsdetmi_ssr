import React from "react";

const NewsletterInput = ({ className, padding }) => {
  return (
    <div className={`search-bar ${className ? className : ""}`}>
      <div className='d-flex'>
        <input
          type='text'
          placeholder='Zadejte Váš email'
          className={`border-grey ${padding ? `p-${padding}` : ""}`}
        />
        <button className='btn bg-blue text-white '>
          <span>Odebírat</span>
        </button>
      </div>
    </div>
  );
};

export default NewsletterInput;

import React from "react";
import PropTypes from "prop-types";
import { addToFavorite, removeFromFavorite } from "../helpers/user";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const AddToFavoriteButton = ({ user, submitProps, post }) => {
  return user ? (
    <>
      {post.verejni_uzivatele.find(
        (publicUser) => publicUser.email === user?.email
      ) && (
        <button
          className={`btn ghost text-yellow d-flex align-items-center add-to-favorite`}
          onClick={() => removeFromFavorite({ ...submitProps, user })}
        >
          <AiFillHeart className='btn-icon text-red' />
          Odebrat z oblíbených
        </button>
      )}
    </>
  ) : (
    <button
      className={`btn ghost text-yellow d-flex align-items-center add-to-favorite`}
      onClick={() => addToFavorite({ ...submitProps, user })}
    >
      <AiOutlineHeart className='btn-icon text-red' />
      Do oblíbených
    </button>
  );
};

AddToFavoriteButton.propTypes = {
  user: PropTypes.object,
  submitProps: PropTypes.object,
  post: PropTypes.object,
};

export default AddToFavoriteButton;

import React from "react";
import PropTypes from "prop-types";
import { addToFavorite, removeFromFavorite } from "../helpers/user";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const RemoveFromFavorite = ({ submitProps, user }) => (
  <button
    className={`btn ghost text-yellow d-flex align-items-center add-to-favorite`}
    onClick={() => removeFromFavorite({ ...submitProps, user })}
  >
    <AiFillHeart className='btn-icon text-red' />
    Odebrat z oblíbených
  </button>
);

const AddToFavorite = ({ submitProps, user }) => (
  <button
    className={`btn ghost text-yellow d-flex align-items-center add-to-favorite`}
    onClick={() => {
      addToFavorite({ ...submitProps, user });
    }}
  >
    <AiOutlineHeart className='btn-icon text-red' />
    Do oblíbených
  </button>
);

const AddToFavoriteButton = ({ user, submitProps, post }) => {
  const buttonProps = { submitProps, user };

  return user ? (
    <>
      {post.verejni_uzivatele?.find(
        (publicUser) => publicUser.email === user?.email
      ) ? (
        <RemoveFromFavorite {...buttonProps} />
      ) : (
        <AddToFavorite {...buttonProps} />
      )}
    </>
  ) : (
    // <button
    //   className={`btn ghost text-yellow d-flex align-items-center add-to-favorite`}
    //   onClick={() => addToFavorite({ ...submitProps, user })}
    // >
    //   <AiOutlineHeart className='btn-icon text-red' />
    //   Do oblíbených
    // </button>
    <AddToFavorite {...buttonProps} />
  );
};

AddToFavoriteButton.propTypes = {
  user: PropTypes.object,
  submitProps: PropTypes.object,
  post: PropTypes.object,
};

export default AddToFavoriteButton;

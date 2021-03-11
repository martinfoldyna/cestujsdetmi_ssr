import React, { useEffect } from "react";
import { trimString } from "../helpers/helpers";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const VerticalPost = ({ post, useNextImg = true, wordLength = 18 }) => {
  const router = useRouter();

  const images =
    post?.galerie && post?.galerie?.length > 0
      ? post?.galerie
      : post?.relative_galerie && post?.relative_galerie?.length > 0
      ? post?.relative_galerie
      : null;

  console.log(images);

  return (
    <Link
      href={
        router.pathname.includes("/detail/")
          ? { path: router.pathname, query: { hodnota: post.hodnota } }
          : router.pathname + "/detail/" + post.hodnota
      }
    >
      <div className='post'>
        {(post?.galerie || post?.image_filename || post?.obrazek) &&
          images !== null && (
            <div className='post-thumbnail-wrapper'>
              {useNextImg ? (
                <Image
                  src={
                    typeof images[0] === "string"
                      ? images[0]
                      : images[0].relativeUrl
                      ? `https://www.cestujsdetmi.cz/${images[0].relativeUrl}`
                      : images[0].formats.small.url
                  }
                  alt={
                    typeof images[0] === "string"
                      ? images[0]
                      : images[0].alternativeText
                      ? images[0].alternativeText
                      : `${post.nazev}`
                  }
                  layout='fill'
                  objectFit='cover'
                  className='border-radius'
                />
              ) : (
                <img
                  src={
                    typeof images[0] === "string"
                      ? images[0]
                      : images[0].relativeUrl
                      ? `https://www.cestujsdetmi.cz/${images[0].relativeUrl}`
                      : images[0].formats.small.url
                  }
                  alt={
                    images[0].alternativeText
                      ? images[0].alternativeText
                      : `${post.nazev}`
                  }
                  className='post-thumbnail'
                />
              )}
            </div>
          )}
        <div>
          <h3 className='post-heading'>
            {post.nazev.includes("Webkamera - ") ||
            post.nazev.includes("Webkamery - ")
              ? post.nazev.replace(/Webkamera - |Webkamery - /gi, "")
              : post.nazev}
          </h3>
          <p className='post-description'>
            {post.perex
              ? trimString(post.perex, wordLength)
              : trimString(post.popis, wordLength)}
            ...
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VerticalPost;

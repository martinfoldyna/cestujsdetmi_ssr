import React, { Suspense } from "react";
import { trimString } from "../helpers/helpers";
import Link from "next/link";
import { useRouter } from "next/router";

const ImageComponent = React.lazy(() => import("./../layouts/ImageComponent"));

const Post = ({ post }) => {
  const router = useRouter();
  const image = post.image_filename
    ? `https://www.cestujsdetmi.cz/${post.image_filename}`
    : post.galerie && post.galerie.length > 0
    ? typeof post.galerie[0] === "object"
      ? post.galerie[0].formats.thumbnail.url
      : typeof post.galerie[0] === "string"
      ? post.galerie[0]
      : ""
    : post.obrazek
    ? post.obrazek.formats.thumbnail.url
    : "";

  console.log(image);

  return (
    <Link href={router.pathname + "/detail/" + post.hodnota}>
      <div className="post">
        {(post.galerie || post.image_filename || post.obrazek) && (
          <div className="post-thumbnail-wrapper">
            <Suspense fallback={<div>Loading image..</div>}>
              <ImageComponent
                src={image}
                alt={
                  post.galerie && post.galerie[0]?.alternativeText
                    ? post.galerie[0]?.alternativeText
                    : post.obrazek
                    ? post.obrazek.alternativeText
                    : post.nazev
                }
                className="post-thumbnail"
              />
            </Suspense>
          </div>
        )}
        <h3 className="post-heading">{post.nazev}</h3>
        <p className="post-description">
          {post.perex ? trimString(post.perex, 18) : trimString(post.popis, 18)}
          ...
        </p>
      </div>
    </Link>
  );
};

export default Post;

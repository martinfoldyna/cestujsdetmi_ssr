import Link from "next/link";
import { forwardRef } from "react";
import PropTypes from "prop-types";

// `onClick`, `href`, and `ref` need to be passed to the DOM element
// for proper handling
const MyLink = forwardRef(({ onClick, href, className, children }, ref) => {
  return (
    <Link href={href} passHref>
      <a href={href} onClick={onClick} ref={ref} className={className}>
        {children}
      </a>
    </Link>
  );
});

MyLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default MyLink;

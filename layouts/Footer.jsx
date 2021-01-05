import React from "react";
import SiteMap from "./SiteMap";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <SiteMap />
      <div className="d-flex justify-content-between align-items-center footer-wrapper">
        <p>Cestujsdetmi.cz | Copyright © 2010 - 2020</p>
        <p>
          Made by:{" "}
          <Link href="http://monium.cz" target="_blank" rel="noopener">
            monium.cz
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

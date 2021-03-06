import React from "react";
import { Modal } from "react-responsive-modal";
import { Section, SectionContent } from "../layouts/Section";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import NewsletterInput from "./NewsletterInput";

const NewsletterModal = ({ onClose, open }) => {
  return (
    <Modal
      onClose={onClose}
      open={open}
      center
      closeIcon={<IoMdClose className="text-black" />}
    >
      <Section className="newsletter-modal m-0">
        <SectionContent className="text-center border-radius">
          <Image
            src="/img/cestuj-small-icon.svg"
            layout="intrinsic"
            width="132"
            height="82"
            alt="malé logo cestuj s detmi"
          />
          <p className="mt-1">
            Přejete si, aby Vám neunikly žádné novinky, zajímavé články a rady
            kam na výlety a dovolenou s dětmi?
          </p>
          <h1>Přihlašte se k odběru!</h1>
          <NewsletterInput />
        </SectionContent>
      </Section>
    </Modal>
  );
};

export default NewsletterModal;

import React from "react";
import Modal from "react-responsive-modal";
import { Section, SectionContent, SectionHeading } from "../layouts/Section";
import { FiPercent } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import coinsIcon from "@iconify/icons-la/coins";
import discount2 from "@iconify/icons-tabler/discount-2";
import { Icon, InlineIcon } from "@iconify/react";

const CenikModal = ({ cenik, slevy, onClose, open }) => {
  console.log(cenik);
  console.log(slevy);

  const modalParams = {
    onClose,
    open,
    center: true,
    closeIcon: <IoMdClose className='modal-close-icon' />,
  };

  return (
    <Modal {...modalParams} classNames={{ modal: "modalWithOverflow" }}>
      {cenik.length > 0 && (
        <Section className='mt-0'>
          <SectionHeading className='d-flex align-items-center p-0'>
            <InlineIcon
              icon={coinsIcon}
              className='btn-icon left text-blue icon-big'
            />
            <h2>Ceník</h2>
          </SectionHeading>
          <SectionContent className='p-0 price-list-content'>
            <ul className='detail-pricelist-wrapper m-0'>
              <li className='pricelist-item first-row'>
                <div className='column first-column'>
                  <span>Termín</span>
                </div>
                <div className='column second-column'>
                  <span>Popis</span>
                </div>
                <div className='column third-column'>
                  <span>Cena</span>
                </div>
              </li>
              {cenik.map(
                (cenikItem) =>
                  (cenikItem.doba || cenikItem.cena || cenikItem.popis) && (
                    <li className='pricelist-item'>
                      <div className='column first-column'>
                        {cenikItem.doba ? (
                          <p>{cenikItem.doba}</p>
                        ) : (
                          <p className='mb-0'></p>
                        )}
                      </div>
                      <div className='column second-column'>
                        <p className='m-0'>{cenikItem.popis}</p>
                      </div>
                      <div className='column third-column'>
                        <p className='m-0'>{cenikItem.cena}</p>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </SectionContent>
        </Section>
      )}
      <Section className={`${cenik.length > 0 ? "" : "mt-0"}`}>
        <SectionHeading className='d-flex align-items-center p-0'>
          <Icon icon={discount2} className='btn-icon left text-blue icon-big' />

          <h2>Slevy</h2>
        </SectionHeading>
        <SectionContent className='p-0 price-list-content'>
          <ul className='detail-pricelist-wrapper m-0'>
            <li className='pricelist-item first-row'>
              <div className='column first-column'>
                <span>Termín</span>
              </div>
              <div className='column second-column'>
                <span>Popis</span>
              </div>
              <div className='column third-column'>
                <span>Cena</span>
              </div>
            </li>
            {slevy.map(
              (saleItem) =>
                (saleItem.doba || saleItem.cena || saleItem.popis) && (
                  <li className='pricelist-item'>
                    <div className='column first-column'>
                      {saleItem.doba ? (
                        <p>{saleItem.doba}</p>
                      ) : (
                        <p className='mb-0'></p>
                      )}
                    </div>
                    <div className='column second-column'>
                      <p className='m-0'>{saleItem.popis}</p>
                    </div>
                    <div className='column third-column'>
                      <p className='m-0'>{saleItem.cena}</p>
                    </div>
                  </li>
                )
            )}
          </ul>
        </SectionContent>
      </Section>
    </Modal>
  );
};

export default CenikModal;

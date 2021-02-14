import React, { useState } from "react";
import { Section, SectionContent, SectionHeading } from "../layouts/Section";
import { Row, Col } from "react-grid-system";
import { objectToArray, searchParamsToQueryString } from "../helpers/helpers";
import enums from "../enums";
import Checkbox from "../components/form/Checkbox";
import Input from "../components/form/Input";
import { HiHome } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { fetchQuery } from "../helpers/fetch";
import { Modal } from "react-responsive-modal";

const Inquiry = ({ typ_objektu, modalOpen, onModalOpen, onModalClose }) => {
  const { handleSubmit, register } = useForm();

  const listKraje = objectToArray(enums.KRAJ);
  const listCategory = objectToArray(enums.KATEGORIE.UBYTOVANI).sort(
    (a, b) => a.value - b.value
  );

  const onSubmit = async (data) => {
    const fetchParams = {
      adresa_kraj_value: data.kraj.join(","),
      kategorie_value: data.category.join(","),
      typ_objektu,
    };

    console.log(fetchParams);
    const searchResponse = await fetchQuery(
      `emails/create-objekt-inquiry?${searchParamsToQueryString(fetchParams)}`,
      null,
      { method: "POST" }
    );

    console.log(searchResponse);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={onModalClose}
      center
      classNames={{ modal: "modal-width-responsive" }}
    >
      <Section className="inquiry-card pb-2 border-radius">
        <SectionHeading>
          <div className="d-flex justify-content-center align-items-center">
            <HiHome className="bg-blue text-white border-radius icon-heading mr-1" />
            <h2>Hledám ubytování</h2>
          </div>
          <p>
            Pomocí tohoto formuláře zašlete Vaši poptávku na ubytovací zařízení
            ve vybrané oblasti.
          </p>
        </SectionHeading>
        <SectionContent>
          <form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="filter-name">Vyberte umístění *</p>
              <Row>
                <Col md={6}>
                  {listKraje.map(
                    (kraj, index) =>
                      (index + 1) % 2 === 1 && (
                        <Checkbox
                          text={`${kraj.value} kraj`}
                          name="kraj"
                          value={kraj.key}
                          type="checkbox"
                          ref={register}
                          removeErr
                        />
                      )
                  )}
                </Col>
                <Col lg={6}>
                  {listKraje.map(
                    (kraj, index) =>
                      (index + 1) % 2 === 0 && (
                        <Checkbox
                          text={`${kraj.value} kraj`}
                          name="kraj"
                          value={kraj.key}
                          type="checkbox"
                          ref={register}
                          removeErr
                        />
                      )
                  )}
                </Col>
              </Row>
              <p className="filter-name">Vyberte kategorii *</p>
              <Row>
                <Col md={6}>
                  {listCategory.map(
                    (category, index) =>
                      (index + 1) % 2 === 1 && (
                        <Checkbox
                          text={`${category.value}`}
                          name="category"
                          value={category.key}
                          type="checkbox"
                          ref={register}
                          removeErr
                        />
                      )
                  )}
                </Col>
                <Col md={6}>
                  {listCategory.map(
                    (category, index) =>
                      (index + 1) % 2 === 0 && (
                        <Checkbox
                          text={`${category.value}`}
                          name="category"
                          value={category.key}
                          type="checkbox"
                          ref={register}
                          removeErr
                        />
                      )
                  )}
                </Col>
              </Row>
            </div>
            <div>
              <div className="form-item">
                <textarea
                  className={`inputText`}
                  id="question"
                  name="question"
                  required
                  ref={register}
                />
                <label htmlFor="question" className="floating-label">
                  Váš dotaz
                </label>
              </div>
              <Row>
                <Col lg={6}>
                  <Input
                    text="Jméno*"
                    name="name"
                    className="mr-0"
                    ref={register}
                  />
                  <Input
                    text="Přijmení*"
                    name="surname"
                    className="mr-0"
                    ref={register}
                  />
                </Col>
                <Col lg={6}>
                  <Input
                    text="Email*"
                    name="email"
                    type="email"
                    className="ml-0"
                    ref={register}
                  />
                  <Input
                    text="Telefon"
                    name="phone"
                    type="tel"
                    className="ml-0"
                    ref={register}
                  />
                  <div className="d-flex justify-content-end w-100 note">
                    <span className="d-block  mr-1">* nutné vyplnit</span>
                  </div>
                </Col>
              </Row>
              <button className="btn bg-blue text-white m-0-auto">
                Odeslat poptávku
              </button>
            </div>
          </form>
        </SectionContent>
      </Section>
    </Modal>
  );
};

export default Inquiry;

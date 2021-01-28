import React from "react";
import { Section, SectionContent, SectionHeading } from "./Section";
import { Row, Col } from "react-grid-system";
import { objectToArray } from "../helpers/helpers";
import enums from "../enums";
import Checkbox from "../components/form/Checkbox";
import Input from "../components/form/Input";
import { HiHome } from "react-icons/hi";

const Inquiry = () => {
  const listKraje = objectToArray(enums.KRAJ);
  const listCategory = objectToArray(enums.KATEGORIE.UBYTOVANI).sort(
    (a, b) => a.value - b.value
  );
  return (
    <Section className="inquiry-card pb-2">
      <SectionHeading>
        <div className="d-flex justify-content-center align-items-center">
          <HiHome className="bg-blue text-white border-radius icon-heading mr-1" />
          <h2>Hledám ubytování</h2>
        </div>
        <p>
          Pomocí tohoto formuláře zašlete Vaši poptávku na ubytovací zařízení ve
          vybrané oblasti.
        </p>
      </SectionHeading>
      <SectionContent>
        <form>
          <p className="filter-name">Vyberte umístění *</p>
          <Row>
            <Col md={6}>
              {listKraje.map(
                (kraj, index) =>
                  (index + 1) % 2 === 1 && (
                    <Checkbox
                      text={`${kraj.value} kraj`}
                      name={kraj.key}
                      type="checkbox"
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
                      name={kraj.key}
                      type="checkbox"
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
                      name={category.key}
                      type="checkbox"
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
                      name={category.key}
                      type="checkbox"
                      removeErr
                    />
                  )
              )}
            </Col>
          </Row>
          <div className="form-item">
            <textarea
              className={`inputText`}
              id="question"
              name="question"
              required
            />
            <label htmlFor="question" className="floating-label">
              Váš dotaz
            </label>
          </div>
          <Row>
            <Col lg={6}>
              <Input text="Jméno*" name="name" className="mr-0" />
              <Input text="Přijmení*" name="surname" className="mr-0" />
            </Col>
            <Col lg={6}>
              <Input text="Email*" name="email" type="email" className="ml-0" />
              <Input text="Telefon" name="phone" type="tel" className="ml-0" />
              <div className="d-flex justify-content-end w-100 note">
                <span className="d-block  mr-1">* nutné vyplnit</span>
              </div>
            </Col>
          </Row>
          <button className="btn bg-blue text-white m-0-auto">
            Odeslat poptávku
          </button>
        </form>
      </SectionContent>
    </Section>
  );
};

export default Inquiry;

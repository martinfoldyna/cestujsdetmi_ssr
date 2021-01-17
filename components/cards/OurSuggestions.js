import { MdFlag } from "react-icons/md";
import { Section, SectionHeading, SectionContent } from "../../layouts/Section";

const OurSuggestions = () => {
  return (
    <div>
      <Section>
        <SectionHeading className="d-flex align-items-center bg-grey p-0">
          <MdFlag className="icon text-blue" />
          <h3>Naše tipy</h3>
        </SectionHeading>
        <SectionContent className="bg-white border-grey last-minute-small mb-1">
          <h3 className="m-0 suggestion-post-heading">Chateau St. Havelno</h3>
          <p>
            Apart Hotel v Jablonci nad Nisou je rodinné a moderní ubytování s
            vyhlášenou restaurací v blízkosti krásné jablonecké přehrady,
            plaveckého bazénu s aquaparkem a městské sportovní haly. Ideální
            poloha pro dovolenou s dětmi a to jak v létě tak v zimě.
          </p>
        </SectionContent>
      </Section>
      <Section>
        <div className="bg-white border-grey last-minute-small">
          <h3 className="m-0 suggestion-post-heading">
            Rodinná výstava - Skřítci a trpaslíci
          </h3>
          <p>
            Letohrádek Mitrovských na Starém Brně připravil na podzimní měsíce
            originální rodinnou výstavu Skřítci a trpaslíci.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default OurSuggestions;

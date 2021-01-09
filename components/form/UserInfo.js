import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SectionContent, Section, SectionHeading } from "../../layouts/Section";
import Input from "./Input";

const UserInfo = ({ users: { user } }) => {
  return (
    <Section>
      <SectionHeading>
        <h2>Změna osobních údajů</h2>
      </SectionHeading>
      <SectionContent>
        <form>
          <Input name="jmeno" text="Křestní jméno" defaultValue={user.jmeno} />
          <Input name="prijmeni" text="Přijmení" defaultValue={user.prijmeni} />
          <Input name="email" text="Email" defaultValue={user.email} />
          <Input name="ulice" text="Ulice" defaultValue={user.adresa?.ulice} />
          <Input name="mesto" text="Město" defaultValue={user.adresa?.mesto} />
          <Input name="psc" text="PSČ" defaultValue={user.adresa?.psc} />
          <Input name="kraj" text="Kraj" defaultValue={user.adresa?.kraj} />
          <Input
            name="oblast"
            text="Oblast"
            defaultValue={user.adresa?.oblast}
          />
        </form>
      </SectionContent>
    </Section>
  );
};

UserInfo.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default UserInfo;

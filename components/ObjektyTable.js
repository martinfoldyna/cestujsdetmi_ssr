import { translateTermValue } from "../helpers/translators";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ObjektyTable = ({ objektyTypy }) => {
  // Skip theese terms while looping through object

  const skipDataTerms = [
    "_id",
    "id",
    "__v",
    "createdAt",
    "rocni_poplatek",
    "objekty_typy_id",
    "created_by",
    "updatedAt",
    "updated_by",
    "registrace_zapisu",
    "fotografie_objektu",
  ];

  const generateTable = () => {
    let dataKeys = [];
    if (objektyTypy) {
      let dataKeysUnsorted = Object.keys(objektyTypy);
      dataKeys[0] = dataKeysUnsorted.find((key) => key === "standard");
      dataKeys[1] = dataKeysUnsorted.find((key) => key === "optimal");
      dataKeys[2] = dataKeysUnsorted.find((key) => key === "premium");
      dataKeys[3] = dataKeysUnsorted.find((key) => key === "premium_gold");

      // Generate table rows, first create row, then loop through data keys and determine if name is true or false
      return Object.keys(objektyTypy[dataKeys[0]].objekty_typy_podminky).map(
        (termItem, index) =>
          skipDataTerms.indexOf(termItem) < 0 && (
            <tr key={index}>
              <th>{translateTermValue(termItem)}</th>
              {dataKeys.map((key, index) => {
                return (
                  <td key={index}>
                    <div className="d-flex align-items-center justify-content-center">
                      {typeof objektyTypy[key].objekty_typy_podminky[
                        termItem
                      ] === "boolean" ? (
                        objektyTypy[key].objekty_typy_podminky[termItem] ? (
                          <FaCheck />
                        ) : (
                          ""
                        )
                      ) : (
                        objektyTypy[key].objekty_typy_podminky[termItem]
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          )
      );
    }
  };

  return objektyTypy ? (
    <div className="table-wrapper">
      <table className="plan-table">
        <thead>
          <tr>
            <th>Porovnání plánů</th>
            <th className="text-white bg-light-blue-2">
              Standard
              <br />
              {objektyTypy.standard.cena}&nbsp;Kč
            </th>
            <th className="text-white bg-blue">
              Optimal
              <br />
              {objektyTypy.optimal.cena}&nbsp;Kč
            </th>
            <th className="text-white bg-red">
              Premium
              <br />
              {objektyTypy.premium.cena}&nbsp;Kč
            </th>
            <th className="text-white bg-green">
              Premium Gold <br />
              {objektyTypy.premium_gold.cena}&nbsp;Kč
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Registrace zápisu</th>
            <td>
              {objektyTypy.standard.objekty_typy_podminky.registrace_zapisu}
            </td>
            <td>
              {objektyTypy.optimal.objekty_typy_podminky.registrace_zapisu}
            </td>
            <td>
              {objektyTypy.premium.objekty_typy_podminky.registrace_zapisu}
            </td>
            <td>
              {objektyTypy.premium_gold.objekty_typy_podminky.registrace_zapisu}
            </td>
          </tr>
          <tr>
            <th>Fotografie objektu</th>
            <td>
              {objektyTypy.standard.objekty_typy_podminky.fotografie_objektu}
            </td>
            <td>
              {objektyTypy.optimal.objekty_typy_podminky.fotografie_objektu}
            </td>
            <td>
              {objektyTypy.premium.objekty_typy_podminky.fotografie_objektu}
            </td>
            <td>
              {
                objektyTypy.premium_gold.objekty_typy_podminky
                  .fotografie_objektu
              }
            </td>
          </tr>
          {generateTable()}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <Link href={`objekty/objednat/standard`}>
                <button className="btn bg-light-blue-2 text-white">
                  Objednat
                </button>
              </Link>
            </td>
            <td>
              <Link href={`objekty/objednat/optimal`}>
                <button className="btn bg-blue text-white">Objednat</button>
              </Link>
            </td>
            <td>
              <Link href={`objekty/objednat/premium`}>
                <button className="btn bg-red text-white">Objednat</button>
              </Link>
            </td>
            <td>
              <Link href={`objekty/objednat/premium_gold`}>
                <button className="btn bg-green text-white">Objednat</button>
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  ) : (
    "Načítám data"
  );
};

ObjektyTable.propTypes = {
  objektyTypy: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  objekty: state.objekty,
});

export default ObjektyTable;

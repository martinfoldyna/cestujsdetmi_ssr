import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaTag } from "react-icons/fa";
import { connect } from "react-redux";
import Link from "next/link";
import { fetchQuery } from "../../helpers/fetch";

const LastMinuteSmall = ({ background }) => {
  const [lastMinute, setLastMinute] = useState(null);
  const [selectedLM, setSelectedLM] = useState(0);

  const getLastMinute = async () => {
    const fetchedLastMinute = await fetchQuery(
      `objekt-infos-minified?_sort=druh_zapisu_value:DESC,createdAt:DESC&last_minute_popis_null=false&druh_zapisu=04_premium_gold`
    );
    setLastMinute(fetchedLastMinute);
    console.log(Math.floor(Math.random() * fetchedLastMinute?.length));
    console.log("length", fetchedLastMinute?.length);
    setSelectedLM(() => Math.floor(Math.random() * fetchedLastMinute?.length));
  };

  useEffect(() => {
    getLastMinute();
  }, []);

  return (
    <div>
      {lastMinute && lastMinute.length > 0 && (
        <div
          className={`${
            background ? `bg-${background} border-grey` : "bg-grey"
          } last-minute-small mb-1`}
        >
          <Link
            href={`/tipy-na-ubytovani/detail/${lastMinute[selectedLM].hodnota}`}
          >
            <>
              <div className="d-flex align-items-center small-card-heading">
                <FaTag className="icon text-red" />
                <h3>Last minute</h3>
              </div>
              <h3 className="card-heading m-0">
                {lastMinute[selectedLM].nazev}
              </h3>
              <p>{lastMinute[selectedLM].last_minute_popis}</p>
            </>
          </Link>
        </div>
      )}
    </div>
  );
};

LastMinuteSmall.propTypes = {
  lastMinute: PropTypes.array,
};

export default LastMinuteSmall;

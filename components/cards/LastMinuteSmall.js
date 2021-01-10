import { useEffect } from "react";
import PropTypes from "prop-types";
import { FaTag } from "react-icons/fa";
import { connect } from "react-redux";
import Link from "next/link";
import { getLastMinute } from "../../redux/actions/objekty";

const LastMinuteSmall = ({ lastMinute }) => {
  // useEffect(() => {
  //   getLastMinute();
  // }, []);

  return (
    <div>
      {lastMinute && lastMinute.length > 0 && (
        <div
          className={`${
            background ? `bg-${background} border-grey` : "bg-grey"
          } last-minute-small mb-1`}
        >
          <Link href={`/tipy-na-ubytovani/detail/${lastMinute[0].id}`}>
            <>
              <div className="d-flex align-items-center small-card-heading">
                <FaTag className="icon text-red" />
                <h4>Last minute</h4>
              </div>
              <h4 className="card-heading">{lastMinute[0].nazev}</h4>
              <p>{lastMinute[0].last_minute_popis}</p>
            </>
          </Link>
        </div>
      )}
    </div>
  );
};

LastMinuteSmall.propTypes = {
  lastMinute: PropTypes.object.isRequired,
};

export default LastMinuteSmall;

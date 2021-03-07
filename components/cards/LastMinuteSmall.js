import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaTag } from "react-icons/fa";
import { connect } from "react-redux";
import Link from "next/link";
import { fetchQuery } from "../../helpers/fetch";
import MyLink from "../../layouts/MyLink";
import { useRouter } from "next/router";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";

const LastMinuteSmall = ({ background }) => {
  const [lastMinute, setLastMinute] = useState(null);
  const [selectedLM, setSelectedLM] = useState(0);

  const router = useRouter();

  const getLastMinute = async () => {
    console.log(Math.floor(Math.random() * lastMinute?.length));
    console.log("length", lastMinute?.length);
    setSelectedLM(() => Math.floor(Math.random() * lastMinute?.length));
  };

  const fetchLastMinute = async () => {
    const fetchedLastMinute = await fetchQuery(
      `objekt-infos?_sort=druh_zapisu:DESC,createdAt:DESC&last_minute_popis_null=false&druh_zapisu=04_premium_gold`
    );
    setLastMinute(fetchedLastMinute);
  };

  useEffect(() => {
    if (!lastMinute) {
      fetchLastMinute();
    }
  }, []);

  useEffect(() => {
    if (lastMinute) {
      getLastMinute();
      if (router.query.hodnota === lastMinute[selectedLM].hodnota) {
        getLastMinute();
      }
    }
  }, [router]);

  return (
    <div>
      <div
        className={`${
          background ? `bg-${background} border-grey` : "bg-grey"
        } last-minute-small mb-1`}
      >
        <div className='d-flex align-items-center small-card-heading'>
          <FaTag className='icon text-red' />
          <h3>Last minute</h3>
        </div>
        {lastMinute && lastMinute.length > 0 ? (
          <>
            <MyLink
              href={`/ubytovani/detail/${lastMinute[selectedLM].hodnota}`}
            >
              <h3 className='card-heading m-0'>
                {lastMinute[selectedLM].nazev}
              </h3>
            </MyLink>
            <p>{lastMinute[selectedLM].last_minute_popis}</p>
          </>
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </div>
  );
};

LastMinuteSmall.propTypes = {
  lastMinute: PropTypes.array,
};

export default LastMinuteSmall;

import React from "react";
import { Link } from "react-router-dom";
import PageUnavailable from "../../commonComponent/PageUnavailable";

const DailyJournalButton = (props) => {
  return (
    <>
      {props.url ? (
        <Link
          to={`${props.url}`}
          state={props.user}
          className="allpatient_btn9color"
        >
          <button className={`dailyjournal_textimp shadow-sm ${props.background}`}>
            {props.name}
          </button>
        </Link>
      ) : (
        <div className="allpatient_btn9color">
          <button
            className={`dailyjournal_textimp shadow-sm ${props.background}`}
            data-bs-toggle={`${props.modal}`}
            data-bs-target={`#${props.Pageunavailable}`}
          >
            {props.name}
          </button>
        </div>
      )}

      <PageUnavailable />
    </>
  );
};

export default DailyJournalButton;

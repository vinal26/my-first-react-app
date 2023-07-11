import React from 'react';
import DailyJournalButton from "./DailyJournalButton";

const AllButton = ({ user }) => {
  return (
    <>
      <div className="daily_journal_divwid mt-4 patient_row1">
        <DailyJournalButton
          url={`/mypatientcareplan`}
          // url={``}
          name={`care plan`}
          user={user}
          modal={`modal`}
          Pageunavailable={`Pageunavailable`}
          background={`dailyjournal_textback0`}
          // background={`dailyjournal_textback1`}
        />
        <DailyJournalButton url={`/mypatientactiveprogram`}
          name={`Active Programs`}
          user={user}
          background={`dailyjournal_textback0`}
          // background={`dailyjournal_textback4`}
        />
        <DailyJournalButton url={`/dailyjournal`}
          name={`Daily Journal`}
          user={user}
          background={`dailyjournal_textback0`}
        />
        {/* <DailyJournalButton url={`/lifestyle`}
          name={`Lifestyle`}
          user={user}
          background={`dailyjournal_textback2`}
        /> */}
      {/* </div>
      <div className="daily_journal_divwid mt-3 patient_row1"> */}
        {/* <DailyJournalButton
          url={`/mypatientgroup`}
          //  url={``}
          name={`Groups`}
          user={user}
          modal={`modal`}
          Pageunavailable={`Pageunavailable`}
          background={`dailyjournal_textback5`} /> */}
        {/* <DailyJournalButton url={``}
          name={`File`}
          background={`dailyjournal_textback2`}
          modal={`modal`}
          Pageunavailable={`Pageunavailable`} /> */}
        <DailyJournalButton
          // url={`/usergoal`}
          name={`Labs`}
          // user={user}
          background={`dailyjournal_textback0`}
          modal={`modal`}
          Pageunavailable={`Pageunavailable`}
        />
        {/* <DailyJournalButton url={``}
          name={`more`}
          background={`dailyjournal_textback2`}
          modal={`modal`}
          Pageunavailable={`Pageunavailable`} /> */}
      </div>
    </>
  )
}

export default AllButton
import React from 'react'
import moment from 'moment';
export default function GiftDetails(props) {
  const { show, handleClose, gifts, selectedGift } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const gift = gifts.find(gift => gift.id == selectedGift);

  return (
    <  >
      {
        gift ?
          <div className={showHideClassName}>
            < p > {gift.item}</p >
            <p>{gift.description}</p>
            <p>Price: {gift.price}</p>
            <p>Location: {gift.locatiopn}</p>
            <p>Proposed Purchase Date: {moment(new Date(gift.proposed_purchase_date)).format("MM/DD/YYYY")}</p>
            {gift.actual_purchase_date ? <p>Purchased: Yes</p> : <p>Purchased: No</p>}
            <button className='update_button' onClick={handleClose}>Close</button>
          </div >
          : <></>
      }
    </ >
  )
}

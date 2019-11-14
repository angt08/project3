import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateGiftForm(props) {
  const { show, handleClose, giftFormData, currentGiftList, handleChange } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      < form className="modal-main" onSubmit={(e) => {
        e.preventDefault();
        props.createGift(currentGiftList.id, giftFormData);
      }}>

       <Link to='/'>
          <button className="back">X</button>
      </Link>

        <label htmlFor="item">Gift</label>
        <input
          type="text"
          name="item"
          id="item"
          value={giftFormData.item}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={giftFormData.description}
          onChange={handleChange}
        />
        <label htmlFor="image_link">Image</label>
        <input
          type="text"
          name="image_link"
          id="image_link"
          value={giftFormData.image_link}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          id="price"
          value={giftFormData.price}
          onChange={handleChange}
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={giftFormData.location}
          onChange={handleChange}
        />
        <label htmlFor="proposed_purchase_date">Proposed Purchase Date</label>
        <input
          type="date"
          name="proposed_purchase_date"
          id="proposed_purchase_date"
          value={giftFormData.proposed_purchase_date}
          onChange={handleChange}
        />
        <label htmlFor="actual_purchase_date">Actual Purchase Date</label>
        <input
          type="date"
          name="actual_purchase_date"
          id="actual_purchase_date"
          value={giftFormData.actual_purchase_date}
          onChange={handleChange}
        />
        <button className='gift_button' onClick={handleClose}>Add Gift</button>
      </form >
    </div >
  )
}
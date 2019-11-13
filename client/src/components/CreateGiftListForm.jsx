import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateGiftListForm(props) {
  console.log(props)
  return (
    <div>

      <form onSubmit={(e) => {
        e.preventDefault();
        props.createGiftList(props.currentUser.id, props.giftListFormData);
      }}>
        <Link to='/'>
          <button className="back">X</button>
        </Link>
        
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={props.giftListFormData.title}
          onChange={props.handleChange}
        />

        {/* <br /> */}
        <label htmlFor="description">description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={props.giftListFormData.description}
          onChange={props.handleChange}
        />
        {/* <br /> */}
        <label htmlFor="image_link">image_link</label>
        <input
          type="text"
          name="image_link"
          id="image_link"
          value={props.giftListFormData.image_link}
          onChange={props.handleChange}
        />
        {/* <br /> */}
        <label htmlFor="due_date">due_date</label>
        <input
          type="date"
          name="due_date"
          id="due_date"
          value={props.giftListFormData.due_date}
          onChange={props.handleChange}
        />
        {/* <br /> */}
        <button className='submit'>Submit</button>

      </form>
    </div>
  )
}

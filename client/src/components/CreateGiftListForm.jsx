import React from 'react'

export default function CreateGiftListForm(props) {
  console.log(props)
  return (
    <div className="background">

      <form onSubmit={(e) => {
        e.preventDefault();
        props.createGiftList(props.currentUser.id, props.giftListFormData);
      }}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={props.giftListFormData.title}
          onChange={props.handleChange}
        />

        {/* <br /> */}
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={props.giftListFormData.description}
          onChange={props.handleChange}
        />
        {/* <br /> */}
        <label htmlFor="image_link">Image_Link</label>
        <input
          type="text"
          name="image_link"
          id="image_link"
          value={props.giftListFormData.image_link}
          onChange={props.handleChange}
        />
        {/* <br /> */}
        <label htmlFor="due_date">Due_Date</label>
        <input
          type="date"
          name="due_date"
          id="due_date"
          value={props.giftListFormData.due_date}
          onChange={props.handleChange}
        />
        {/* <br /> */}
        <button className="submit">Submit</button>

      </form>
    </div>
  )
}

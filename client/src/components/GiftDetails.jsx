import React from 'react'

export default function GiftDetails(props) {
  return (
    <div>
      <form onSubmit={props.handleChange}>
        
        <Link to='/giftlist'>
          <button>Create</button>
        </Link>

        <Link>
      <button>Delete</button>
        </Link>
        
          <input name="item" placeholder="Gift Item" onChange={props.handleChange} value={props.formData.item} />

          <input name="description" placeholder="Description" onChange={props.handleChange} value={props.formData.description} />
    
          <input name="image_link" placeholder="Image URL " onChange={props.handleChange} value={props.formData.image_link} />
    
          <input name="price" placeholder="Price" onChange={props.handleChange} value={props.formData.price} />
    
          <input name="location" placeholder="Location" onChange={props.handleChange} value={props.formData.location} />
    
          <input name="proposed_purchased_date" placeholder="" onChange={props.handleChange} value={props.formData.proposed_purchased_date} />
    
          <input name="actual_purchased_date" placeholder="Fun Fact" onChange={props.handleChange} value={props.formData.actual_purchased_date} />
    
          <input type="submit" value="Add Gift" />

        </form>
    </div>
  )
}

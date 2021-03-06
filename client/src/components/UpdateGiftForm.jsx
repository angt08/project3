import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UpdateGiftForm extends Component {
  state = {
    item: "",
    description: "",
    image_link: "",
    price: "",
    location: "",
    proposed_purchase_date: "",
    actual_purchase_date: ""
  }

  setFormData = (id) => {
    if (this.props.gifts.length) {
      const {
        item,
        description,
        image_link,
        price,
        location,
        proposed_purchase_date,
        actual_purchase_date,
        ...otherData
      } = this.props.gifts.find(gift => {
        return gift.id === id
      })
      this.setState({
        item,
        description,
        image_link,
        price,
        location,
        proposed_purchase_date,
        actual_purchase_date,
      })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedGift !== this.props.selectedGift) {
      if (this.props.selectedGift > 0)
        this.setFormData(this.props.selectedGift);
    }
  }
  render() {

    const { item,
      description,
      image_link,
      price,
      location,
      proposed_purchase_date,
      actual_purchase_date } = this.state;
    const { show, handleClose, giftFormData } = this.props;
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        < form className="modal-main" onSubmit={(e) => {
          e.preventDefault();
          this.props.updateGift(this.props.selectedGift, this.state);
        }}>
          <button type="button" id="cancel" onClick={handleClose} className="back">X</button>
          <label htmlFor="item">Gift</label>
          <input
            type="text"
            name="item"
            id="item"
            value={item}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="image_link">Image</label>
          <input
            type="text"
            name="image_link"
            id="image_link"
            value={image_link}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={this.handleChange}
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={this.handleChange}
          />
          <label htmlFor="proposed_purchase_date">ProposedPurchase Date</label>
          <input
            type="date"
            name="proposed_purchase_date"
            id="proposed_purchase_date"
            value={proposed_purchase_date}
            onChange={this.handleChange}
          />
          <label htmlFor="actual_purchase_date">Actual Purchase Date</label>
          <input
            type="date"
            name="actual_purchase_date"
            id="actual_purchase_date"
            value={actual_purchase_date}
            onChange={this.handleChange}
          />
          <button className='update_button' onClick={handleClose}>Update Gift</button>


        </form >
      </div >
    )
  }

}

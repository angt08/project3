import React from 'react'

export default class UpdateGiftForm extends React.Component {
  state = {
    item: '',
    description: '',
    image_link: '',
    price: '',
    location: '',
    proposed_purchased_date: '',
    actucal_purchased_date: ''
  }
  componentDidMount() {
    this.setFormData()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.gift !==
      this.state.gift) {
      this.setFormData()
    }
  }
  setFormData = () => {
    if (this.props.gift.length) {
      console.log(this.props.gift)
      const newGift = this.props.gift.find(gift => {
        return gift.id === parseInt(this.props.id)
      })
      const {
        item,
        description,
        image_link,
        price,
        location,
        proposed_purchased_date,
        actucal_purchased_date,
      } = newGift
      this.setState({
        item,
        description,
        image_link,
        price,
        location,
        proposed_purchased_date,
        actucal_purchased_date
      })
    }
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.handleUpdate(this.props.id, this.state)
        }} >

        

          <input name="item" placeholder="Gift Item" onChange={this.handleChange} value={this.state.formData.item} />

          <input name="description" placeholder="Description" onChange={this.handleChange} value={this.state.formData.description} />

          <input name="image_link" placeholder="Image URL " onChange={this.handleChange} value={this.state.formData.image_link} />

          <input name="price" placeholder="Price" onChange={this.handleChange} value={this.state.formData.price} />

          <input name="location" placeholder="Location" onChange={this.handleChange} value={this.state.formData.location} />

          <input name="proposed_purchased_date" placeholder="" onChange={this.handleChange} value={this.state.formData.proposed_purchased_date} />

          <input name="actual_purchased_date" placeholder="Fun Fact" onChange={this.handleChange} value={this.state.formData.actual_purchased_date} />

          <input type="submit" value="Add Gift" />

          <Link>
            <button>Edit</button>
          </Link>

        </form>
      </div>
    )
  }
}

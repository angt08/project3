import React, { Component } from 'react'


export default function UpdateGiftListForm() {
  return (
    <div>
     
    </div>
  )

export default class UpdateGiftListForm extends Component {
  state = {
    title: "",
    image_link: "",
    description: "",
    due_date: ""
  }

  setFormData = () => {
    if (this.props.giftLists.length) {
      const {
        title,
        image_link,
        description,
        due_date,
        ...otherData
      } = this.props.giftLists.find(giftList => {
        return giftList.id === parseInt(this.props.giftListId)
      })
      this.setState({
        title,
        image_link,
        description,
        due_date,
      })
    }
  }

  componentDidMount() {
    this.setFormData();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.giftLists !== this.props.giftLists) {
      this.setFormData();
    }
  }

  render() {
    const { title, image_link, description, due_date } = this.state;

    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.updateGiftList(this.props.giftListId, this.state);
        }}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="image_link">image link</label>
          <input
            type="text"
            name="image_link"
            id="image_link"
            value={image_link}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="due_date">fun fact</label>
          <input
            type="text"
            name="due_date"
            id="due_date"
            value={due_date}
            onChange={this.handleChange}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    )
  }

}

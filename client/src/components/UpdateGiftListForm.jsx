import React, { Component } from 'react'
import { Link } from 'react-router-dom';

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
    //console.log(this.state);
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

<Link to='/'>
          <button className="back">X</button>
        </Link>

          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="image_link">Image Link</label>
          <input
            type="text"
            name="image_link"
            id="image_link"
            value={image_link}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            name="due_date"
            id="due_date"
            value={due_date}
            onChange={this.handleChange}
          />
          <br />
          <button className='submit'>Submit</button>

          
        </form>
      </div>
    )
  }

}

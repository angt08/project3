import React from 'react'
import CreateGiftForm from './CreateGiftForm';
import { getGiftsByGiftList, postGift } from '../services/api-helper';
import { Link, Route, withRouter } from 'react-router-dom';


class GiftListDetails extends React.Component {
  state = {
    gifts: [],
    giftFormData: {
      item: "",
      description: "",
      image_link: "",
      price: "",
      location: "",
      proposed_purchase_date: "",
      actual_purchase_date: ""
    },
    ben: ""
  }
  async componentDidMount() {
    await this.getGifts();
  }
  getGifts = async () => {
    if (this.props.currentGiftList) {
      const gifts = await getGiftsByGiftList(this.props.currentGiftList.id);
      this.setState({ gifts })
    }
    else {
      this.setState({ gifts: [] })
    }
    console.log(this.state.gifts);
  }
  ///////Handle Change /////////
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      giftFormData: {
        ...prevState.giftFormData,
        [name]: value
      }
    }))
  }
  // /// Create Gift /////////////
  createGift = async () => {
    const newGift = await postGift(this.props.currentGiftList.id, this.state.giftListFormData);
    this.setState(prevState => ({
      giftLists: [...prevState.giftLists, newGift]
    }))
    this.props.history.push('./')
  }

  render() {
    const { currentGiftList } = this.props;
    const { gifts } = this.state;

    return (
      <div className="main">
        {currentGiftList ?
          <div id="gift-list-details">
            <h1>{currentGiftList.title}</h1>
            <div id="giftlist">
              <img src={currentGiftList.image_link} alt="giftlistimage" />
              <div>
                <p>{currentGiftList.description}</p>
                <h4>Due Date: {currentGiftList.due_date}</h4>

                <Link to='/create_gift'>
                  <button>Add Gift</button>
                </Link>
                <Route path='/create_gift' render={() => (
                  <CreateGiftForm
                    createGift={this.createGift}
                    handleChange={this.handleChange}
                    giftFormData={this.state.giftFormData}
                  />
                )} />
                {/* <Link to={`${this.props.match.url}/create_gift`}>
                  <button onClick={() => (console.log(`url=${this.props.match.url}, path=${this.props.match.path}`))} >Add Gift</button>
                </Link>
                <Route path={`${this.props.match.path}/create_gift`} render={() => (
                  <CreateGiftForm
                    createGift={this.createGift}
                    handleChange={this.handleChange}
                    giftFormData={this.state.giftFormData}
                  />
                )} /> */}
                <Link to={`/update_giftList/${currentGiftList.id}`}><button>Update a Giftlist</button></Link>
                <button
                  onClick={() => {
                    this.props.deleteGiftList(currentGiftList.id)
                  }}>
                  Delete Gift List
                  </button>
              </div>
            </div>
            <div id="gifts">
              {
                gifts.map(gift => (
                  <div className="gift">
                    <h2>{gift.item}</h2>
                    <img className="gift-image" src={gift.image_link} alt='noimage' />
                    <p>{gift.description}</p>
                    <p>Price: {gift.price}</p>
                    <p>Location: {gift.locatiopn}</p>
                    <p>Proposed Purchase Date:{gift.proposed_purchase_date}</p>
                    {gift.actual_purchase_date ? <p>Purchased: Yes</p> : <p>Purchased: No</p>}
                    <Link >
                      <button>Edit</button>
                    </Link>
                    <Link>
                      <button>Delete</button>
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
          : <></>}
      </div>
    )
  }
} export default withRouter(GiftListDetails);
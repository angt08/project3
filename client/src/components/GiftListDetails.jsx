import React from 'react'
import CreateGiftForm from './CreateGiftForm';
import UpdateGiftForm from './UpdateGiftForm';
import { getGiftsByGiftList, postGift, putGift } from '../services/api-helper';
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
    show: false,
    showUpdate: false
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  showModalUpdate = (gift) => {

    this.setState({ showUpdate: true });
  };

  hideModalUpdate = () => {
    this.setState({ showUpdate: false });
  };
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
    const newGift = await postGift(this.props.currentGiftList.id, this.state.giftFormData);
    this.setState(prevState => ({
      gifts: [...prevState.gifts, newGift]
    }))
  }
  // /// Update Gift /////////////
  updateGift = async (id, data) => {
    const newGift = await putGift(id, data);
    this.setState(prevState => ({
      gifts: [...prevState.gifts, newGift]
    }))
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
                <CreateGiftForm
                  show={this.state.show}
                  handleClose={this.hideModal}
                  createGift={this.createGift}
                  handleChange={this.handleChange}
                  giftFormData={this.state.giftFormData}
                  currentGiftList={currentGiftList}
                />
                <button type="button" onClick={this.showModal}>Add Gift</button>
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
                    <button type="button" onClick={this.showModalUpdate(gift)}>Update Gift</button>
                    <UpdateGiftForm
                      gifts={gifts}
                      giftId={gift.id}
                      show={this.state.showUpdate}
                      handleClose={this.hideModalUpdate}
                      updateGift={this.updateGift}
                      handleChange={this.handleChange}
                      giftFormData={this.state.giftFormData}
                    />
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
import React from 'react'
import CreateGiftForm from './CreateGiftForm';
import UpdateGiftForm from './UpdateGiftForm';
import { getGiftsByGiftList, postGift, putGift, deleteGift } from '../services/api-helper';
import { Link, Route, withRouter } from 'react-router-dom';
import giftIcon from '../gift.png';
import editIcon from '../edit.png';
import deleteIcon from '../delete.png';
import moment from 'moment'

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
  showModalUpdate = () => {

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
      gifts: prevState.gifts.map(gift =>
        gift.id === parseInt(id) ? newGift : gift)
    }))
  }
  deleteGiftL = async (id) => {
    await deleteGift(id);
    this.setState(prevState => ({
      gifts: prevState.gifts.filter(gift => {
        return gift.id !== id
      })
    }))
  }

  render() {
    const { currentGiftList } = this.props;
    const { gifts } = this.state;

    return (
      <div className="main">
        {currentGiftList ?
          <div id="gift-list-details">
            <div id="giftlist">
              <h2>{currentGiftList.title}</h2>
              <img className="giftlist-image" src={currentGiftList.image_link} alt="giftlistimage" />
              <div>
                <p>{currentGiftList.description}</p>

                <h4>Due Date: {moment(new Date(currentGiftList.due_date)).format("MM/DD/YYYY")}</h4>
                <CreateGiftForm
                  show={this.state.show}
                  handleClose={this.hideModal}
                  createGift={this.createGift}
                  handleChange={this.handleChange}
                  giftFormData={this.state.giftFormData}
                  currentGiftList={currentGiftList}
                />
                <img className="action-image" src={giftIcon} alt="add" onClick={this.showModal} />
                {/* <button type="button" onClick={this.showModal}>Add Gift</button> */}
                <Link to={`/update_giftList/${currentGiftList.id}`}>
                  {/* <button>Update a Giftlist</button> */}
                  <img className="action-image" src={editIcon} alt="edit" />
                </Link>
                <img className="action-image" src={deleteIcon} alt="delete" onClick={() => {
                  this.props.deleteGiftList(currentGiftList.id)
                }} />
                {/* <button
                  onClick={() => {
                    this.props.deleteGiftList(currentGiftList.id)
                  }}>
                  Delete Gift List
                  </button> */}
              </div>
            </div>
            <div id="gifts">
              {
                gifts.map(gift => (
                  <div className="gift">
                    <a href="#" class="tooltip">
                      <img className="gift-image" src={gift.image_link} alt='noimage' />
                      <h2>{gift.item}</h2>
                      <span>
                        <p>{gift.description}</p>
                        <p>Price: {gift.price}</p>
                        <p>Location: {gift.locatiopn}</p>
                        <p>Proposed Purchase Date: {moment(new Date(gift.proposed_purchase_date)).format("MM/DD/YYYY")}</p>
                        {gift.actual_purchase_date ? <p>Purchased: Yes</p> : <p>Purchased: No</p>}
                      </span>
                    </a>
                    <div>
                      <button type="button" onClick={this.showModalUpdate}>Update Gift</button>
                      <UpdateGiftForm
                        gifts={gifts}
                        giftId={gift.id}
                        show={this.state.showUpdate}
                        handleClose={this.hideModalUpdate}
                        updateGift={this.updateGift}
                        giftFormData={this.state.giftFormData}
                      />
                      <button
                        onClick={() => { this.deleteGiftL(gift.id) }}>Delete Gift
                    </button>
                    </div>
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
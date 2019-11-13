import React from 'react'
import { getGiftsByGiftList } from '../services/api-helper';
import { Link } from 'react-router-dom';

export default class GiftListDetails extends React.Component {
  state = {
    gifts: []
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

  render() {
    const { currentGiftList } = this.props;
    const { gifts } = this.state;

    return (
      <div>
        {currentGiftList ?
          <div id="gift-list-details">
            <h1>{currentGiftList.title}</h1>
            <div id="giftlist">
              <img src={currentGiftList.image_link} alt="giftlistimage" />
              <div>
                <p>{currentGiftList.description}</p>
                <h4>Due Date: {currentGiftList.due_date}</h4>
                
                <Link >
                  <button>Add Gift</button>
                </Link>

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
}
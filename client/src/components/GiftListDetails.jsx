import React from 'react'

export default function GiftListDetails(props) {
  return (
    <div>
      {props.currentGiftList ? <p>{props.currentGiftList.title}</p> : <></>}
    </div>
  )
}

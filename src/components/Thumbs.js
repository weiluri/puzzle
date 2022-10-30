import React from 'react';

const Thumbs = ({images, onClick}) => {

  return (
    <div className="thumbs">
      {images && images.map((item, index) => (<img key={index} src={item} onClick={onClick} className="thumb" />))}
    </div>
  )
}

export default Thumbs
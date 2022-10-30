import {useState} from 'react'
import Stage from './Stage'
import Thumbs from './Thumbs'

const Layout = () => {

  const images = [
    'pexels-james-wheeler-417074.jpg',
    'pexels-james-wheeler-1534057.jpg',
    'pexels-zoe-pappas-1006965.jpg',
    'pexels-pixabay-164336.jpg',
  ]

  const [currImage, setCurrImage] = useState(images[0])

  const thumbClicked = (e) => {
    setCurrImage(e.target.src)
  }

  return (
    <div className="stage-container">
      <Stage src={currImage} />
      {<Thumbs images={images} onClick={thumbClicked}/>}
    </div>
  )
}

export default Layout

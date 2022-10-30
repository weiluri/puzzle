import { useRef, useEffect, useState } from 'react'

const Stage = (props) => {

  const img = useRef(null)
  const canvas = useRef()
  const canvas2 = useRef() //for the cliped parts

  const [startCoordinates, setStartCoordinates] = useState([])
  const [ctx, setCtx] = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)


  useEffect(() => {
    setCtx(canvas.current.getContext('2d'))    
}, [])

useEffect(() => {  
  setImgLoaded(false)
},[props.src])

useEffect(() => {  
  if(ctx && imgLoaded){
    ctx.drawImage(img.current, 0, 0)
  }
}, [ctx, img, imgLoaded])

  // initial position and mouse points
  let pos = {}
  let points = []

  // new position from mouse event
  function setPos(e) {
    pos.x = e.clientX
    pos.y = e.clientY
  }

  function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return
    
    ctx.beginPath()
    
    ctx.lineWidth = 1
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#c0392b'
    
    ctx.moveTo(pos.x, pos.y)
    setPos(e)
    ctx.lineTo(pos.x, pos.y)
    points.push([pos.x, pos.y])

    ctx.stroke()

  }

  function saveStartPosition(e){
    setStartCoordinates([e.clientX, e.clientY]) // save the initial coordinates to close with after mouseup
    setPos(e)
    points.push([pos.x, pos.y])
  }
  

  function closeShape() {   
    
    ctx.moveTo(pos.x, pos.y) 
    ctx.lineTo(startCoordinates[0], startCoordinates[1]) 
    ctx.stroke()

    points.push([startCoordinates[0], startCoordinates[1]])

    const ctx2 = canvas.current.getContext('2d')

    ctx2.save();
    ctx2.beginPath();
    ctx2.moveTo(points[0][0], points[0][1])
    for(let i=1; i<points.length; i++){
      ctx2.lineTo(points[i][0], points[i][1])
    }

    ctx2.closePath()

    ctx2.lineWidth=3;
    ctx2.stroke()
    
    ctx2.clip();
    ctx2.drawImage(document.getElementById("testid"),400,90);
    //ctx.drawImage(img.current,90,90);
    ctx2.restore();
    
    ctx.fillStyle = "grey";
    ctx.fill()

  }

  return (
    <div className="pic-container">
      <canvas ref={canvas} width={640} height={425} onMouseUp={closeShape} onMouseDown={saveStartPosition} onMouseMove={draw} />
      <p>Second canvas for the puzzle cliped parts</p>
      <canvas ref={canvas2} width={640} height={225} style={{border: '1px solid'}} />
      <img ref={img} id="testid" width={640} height={425} src={props.src} onLoad={() => setImgLoaded(true)} style={{ display: 'none' }} />
    </div>
  )
}

export default Stage
